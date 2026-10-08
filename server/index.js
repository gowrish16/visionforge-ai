import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { generateWithCloudflareWorkersAI } from './providers/cloudflare.js';
import { generateWithHuggingFaceZeroGPU } from './providers/huggingfaceZeroGpu.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const cfAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const cfApiToken = (process.env.CLOUDFLARE_API_TOKEN || '').trim();
  const hfToken = (process.env.HF_TOKEN || '').trim();

  const cfConfigured = Boolean(cfAccountId && cfApiToken && !cfAccountId.includes('your_') && !cfApiToken.includes('your_'));
  const hfConfigured = Boolean(hfToken && !hfToken.includes('your_'));

  res.json({
    status: 'ok',
    service: 'VisionForge AI Backend Proxy',
    activeProvider: cfConfigured ? 'Cloudflare Workers AI' : (hfConfigured ? 'Hugging Face ZeroGPU' : 'None Configured'),
    model: cfConfigured ? '@cf/black-forest-labs/flux-1-schnell' : 'black-forest-labs/FLUX.1-schnell',
    cloudflareConfigured: cfConfigured,
    hfTokenConfigured: hfConfigured
  });
});

// Image Generation Endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, steps = 4, provider = 'cloudflare' } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'A valid text prompt description is required.' });
    }

    let result;
    const cfAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
    const cfApiToken = (process.env.CLOUDFLARE_API_TOKEN || '').trim();
    const cfConfigured = Boolean(cfAccountId && cfApiToken && !cfAccountId.includes('your_') && !cfApiToken.includes('your_'));

    if (provider === 'cloudflare' || cfConfigured) {
      result = await generateWithCloudflareWorkersAI({ prompt, steps });
    } else {
      result = await generateWithHuggingFaceZeroGPU({ prompt, steps });
    }

    const { buffer, contentType } = result;

    // Return raw unmanipulated image stream with strict non-cache headers
    res.setHeader('Content-Type', contentType || 'image/png');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.send(buffer);

  } catch (err) {
    console.error('[Server Proxy] Generation Error:', err.message);

    const statusCode = err.statusCode || 500;
    const userMessage = err.message || 'Image generation failed. Please try again.';

    return res.status(statusCode).json({
      error: userMessage,
      statusCode: statusCode,
      details: err.rawDetails || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`VisionForge AI Server Proxy running on http://127.0.0.1:${PORT}`);
});
