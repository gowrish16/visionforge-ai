import { Client } from '@gradio/client';

/**
 * Hugging Face ZeroGPU Provider Adapter
 * Preserved intact as a reference / fallback adapter.
 */
export async function generateWithHuggingFaceZeroGPU({ prompt, width, height, seed, steps }) {
  const token = (process.env.HF_TOKEN || '').trim();
  if (!token || token === 'your_hf_token_here' || token === 'hf_your_token_here') {
    throw new Error('Hugging Face API token is missing or not configured on the server proxy. Please set HF_TOKEN in server/.env.');
  }

  const cleanPrompt = prompt.trim();
  const targetWidth = Math.min(Math.max(Number(width) || 1024, 256), 1440);
  const targetHeight = Math.min(Math.max(Number(height) || 1024, 256), 1440);
  const isSeedProvided = seed !== undefined && seed !== null && seed !== '' && !isNaN(Number(seed));
  const currentSeed = isSeedProvided ? Number(seed) : Math.floor(Math.random() * 2147483647);
  const numSteps = Math.min(Math.max(Number(steps) || 4, 1), 8);

  console.log(`[HF Adapter] Connecting to Space: black-forest-labs/FLUX.1-schnell...`);
  const gradioClient = await Client.connect('black-forest-labs/FLUX.1-schnell', { token });

  const predictionResult = await gradioClient.predict('/infer', {
    prompt: cleanPrompt,
    seed: currentSeed,
    randomize_seed: !isSeedProvided,
    width: targetWidth,
    height: targetHeight,
    num_inference_steps: numSteps
  });

  if (!predictionResult || !predictionResult.data || !predictionResult.data[0]) {
    throw new Error('Hugging Face ZeroGPU Space did not return an image object.');
  }

  const imageFileObj = predictionResult.data[0];
  const imageUrl = imageFileObj.url || imageFileObj.path;

  if (!imageUrl) {
    throw new Error('Generated image URL is missing from ZeroGPU response.');
  }

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download rendered image from ZeroGPU Space (HTTP ${imageResponse.status}).`);
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = imageResponse.headers.get('content-type') || 'image/webp';

  return { buffer, contentType };
}
