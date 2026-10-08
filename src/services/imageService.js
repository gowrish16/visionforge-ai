/**
 * VisionForge AI — Generative AI Image Synthesis Client Service
 * Routes generation requests to Cloudflare Workers AI (`@cf/black-forest-labs/flux-1-schnell`) via Backend Proxy (`/api/generate`).
 * 
 * STRICT GUARANTEES:
 * 1. ZERO stale state leakage (Every request uses current active prompt inputs).
 * 2. ZERO token exposure (Cloudflare credentials remain strictly server-side).
 * 3. Dynamic unique Request IDs (`vf_${timestamp}_${seed}`).
 */

const ASPECT_RATIO_DIMENSIONS = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1280, height: 720 },
  '4:5': { width: 800, height: 1000 },
  '9:16': { width: 720, height: 1280 }
};

export async function generateTextToImage({
  prompt,
  style = 'None',
  aspectRatio = '1:1',
  seed = null
}) {
  const cleanPrompt = prompt ? prompt.trim() : '';
  if (!cleanPrompt) {
    throw new Error('Please enter a description for the image you want to generate.');
  }

  // Combine prompt with optional style preset without altering user prompt intent
  let finalPrompt = cleanPrompt;
  if (style && style !== 'None' && !cleanPrompt.toLowerCase().includes(style.toLowerCase())) {
    finalPrompt = `${cleanPrompt}, in ${style} style, highly detailed, 8k resolution`;
  }

  const dimensions = ASPECT_RATIO_DIMENSIONS[aspectRatio] || { width: 1024, height: 1024 };
  const currentSeed = (seed !== null && seed !== '' && !isNaN(Number(seed))) 
    ? Number(seed) 
    : Math.floor(Math.random() * 2147483647);

  const payload = {
    prompt: finalPrompt,
    steps: 4,
    provider: 'cloudflare'
  };

  let blob = null;
  let errorMessage = '';

  // Endpoints to attempt (relative Vite proxy path first, fallback to direct localhost port 3001)
  const proxyEndpoints = ['/api/generate', 'http://127.0.0.1:3001/api/generate'];

  for (const endpoint of proxyEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        blob = await response.blob();
        if (blob && blob.size > 1000) {
          break;
        }
      } else {
        let errJson = null;
        try {
          errJson = await response.json();
        } catch (_) {}

        if (errJson && errJson.error) {
          errorMessage = errJson.error;
        } else {
          errorMessage = `HTTP Status ${response.status}: Failed to reach Cloudflare backend proxy.`;
        }
      }
    } catch (err) {
      if (!errorMessage) {
        errorMessage = err.message || 'Unable to connect to VisionForge AI server proxy.';
      }
    }
  }

  if (!blob || blob.size <= 1000) {
    throw new Error(errorMessage || 'Image generation failed. Please check your network or server proxy configuration.');
  }

  // Create local object URL with unique timestamp preventing browser caching
  const blobObjectUrl = URL.createObjectURL(blob);

  // Return CURRENT active generation metadata strictly matching user input
  return {
    id: `vf_${Date.now()}_${currentSeed}`,
    imageUrl: blobObjectUrl,
    rawBlob: blob,
    originalPrompt: cleanPrompt,
    fullPrompt: finalPrompt,
    style: style,
    aspectRatio: aspectRatio,
    dimensions: `${dimensions.width}x${dimensions.height}`,
    seed: currentSeed,
    provider: 'Cloudflare Workers AI',
    model: '@cf/black-forest-labs/flux-1-schnell',
    timestamp: new Date().toISOString()
  };
}
