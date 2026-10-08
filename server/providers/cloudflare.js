/**
 * Cloudflare Workers AI Provider Adapter
 * Model: `@cf/black-forest-labs/flux-1-schnell`
 * REST API Endpoint: https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-1-schnell
 * 
 * STRICT SCHEMA RULES for @cf/black-forest-labs/flux-1-schnell:
 * Supports ONLY:
 * - `prompt` (string, required)
 * - `steps` (integer, max 8)
 * 
 * Rejects width, height, seed, guidance, negative_prompt with HTTP 400.
 */
export async function generateWithCloudflareWorkersAI({ prompt, steps = 4 }) {
  const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const apiToken = (process.env.CLOUDFLARE_API_TOKEN || '').trim();

  if (!accountId || accountId.includes('your_cloudflare_account_id')) {
    throw new Error('Cloudflare Account ID is missing or not configured on server. Please set CLOUDFLARE_ACCOUNT_ID in server/.env.');
  }

  if (!apiToken || apiToken.includes('your_cloudflare_api_token')) {
    throw new Error('Cloudflare API Token is missing or not configured on server. Please set CLOUDFLARE_API_TOKEN in server/.env.');
  }

  const cleanPrompt = prompt ? prompt.trim() : '';
  if (!cleanPrompt) {
    throw new Error('A valid text prompt is required for image generation.');
  }

  const numSteps = Math.min(Math.max(Number(steps) || 4, 1), 8);
  const cfEndpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

  console.log(`[Cloudflare Adapter] Executing @cf/black-forest-labs/flux-1-schnell`);
  console.log(`[Cloudflare Adapter] Active Prompt: "${cleanPrompt.substring(0, 90)}..." | Steps: ${numSteps}`);

  // Send ONLY schema-compliant properties supported by @cf/black-forest-labs/flux-1-schnell
  const payload = {
    prompt: cleanPrompt,
    steps: numSteps
  };

  const response = await fetch(cfEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const status = response.status;
    let errMessageDetail = '';

    try {
      const errJson = await response.json();
      if (errJson && errJson.errors && errJson.errors.length > 0) {
        errMessageDetail = errJson.errors.map(e => e.message).join(' | ');
      } else {
        errMessageDetail = JSON.stringify(errJson);
      }
    } catch (_) {
      errMessageDetail = await response.text();
    }

    console.error(`[Cloudflare Adapter] HTTP ${status} error from Cloudflare API:`, errMessageDetail);

    let friendlyMessage = `Cloudflare Workers AI generation failed (HTTP ${status}).`;
    if (status === 401 || status === 403) {
      friendlyMessage = 'Cloudflare Workers AI authentication failed. Please verify CLOUDFLARE_API_TOKEN in server/.env.';
    } else if (status === 404) {
      friendlyMessage = 'Cloudflare Account ID or model endpoint not found. Please verify CLOUDFLARE_ACCOUNT_ID in server/.env.';
    } else if (status === 429) {
      friendlyMessage = 'Cloudflare Workers AI daily Neuron quota (10,000 Neurons/day) or rate limit reached. Please try again later.';
    } else if (status === 400) {
      friendlyMessage = `Cloudflare AI Schema Error (HTTP 400): ${errMessageDetail}`;
    } else if (status >= 500) {
      friendlyMessage = `Cloudflare Workers AI server error (${status}): ${errMessageDetail || 'Temporary capacity limit'}`;
    }

    const errObj = new Error(friendlyMessage);
    errObj.statusCode = status;
    errObj.rawDetails = errMessageDetail;
    throw errObj;
  }

  const contentTypeHeader = response.headers.get('content-type') || '';
  let buffer;
  let finalContentType = 'image/png';

  if (contentTypeHeader.includes('application/json')) {
    const jsonResult = await response.json();
    if (!jsonResult.success || !jsonResult.result || !jsonResult.result.image) {
      const msg = (jsonResult.errors && jsonResult.errors[0]?.message) || 'No base64 image data in response';
      throw new Error(`Cloudflare Workers AI returned success: false - ${msg}`);
    }
    const base64Data = jsonResult.result.image;
    buffer = Buffer.from(base64Data, 'base64');
  } else {
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    finalContentType = contentTypeHeader || 'image/png';
  }

  if (!buffer || buffer.byteLength < 500) {
    throw new Error('Cloudflare Workers AI returned an empty or corrupted image payload.');
  }

  console.log(`[Cloudflare Adapter] Synthesis successful! Image size: ${buffer.byteLength} bytes`);
  return { buffer, contentType: finalContentType };
}
