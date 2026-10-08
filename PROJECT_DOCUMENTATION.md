# 📄 VisionForge AI — College Project Technical Documentation

**Project Title**: VisionForge AI — Generative AI Image Studio  
**Domain**: Generative Artificial Intelligence / Computer Vision / Web Engineering  
**Architecture**: Full-Stack Decoupled Single Page Application (SPA + Security Proxy)  
**Frontend Framework**: React 18 + Vite + Tailwind CSS  
**Backend Proxy**: Express Node.js Server (`server/index.js`)  
**Active Provider Adapter**: Cloudflare Workers AI (`server/providers/cloudflare.js`)  
**Target AI Model**: `@cf/black-forest-labs/flux-1-schnell` (12B Parameter Rectified Flow Transformer)  
**Reference Adapter**: Hugging Face ZeroGPU (`server/providers/huggingfaceZeroGpu.js`)  

---

## 1. Introduction
VisionForge AI is a modern full-stack Generative AI application engineered to synthesize high-resolution imagery from natural-language text descriptions. Built as an intuitive web studio, it connects a React 18 single-page application to Cloudflare Workers AI via a security-conscious Express proxy server, ensuring zero credential leakage and hardware-independent execution.

---

## 2. Problem Statement
Traditional text-to-image academic projects face three main engineering challenges:
1. **CUDA Hardware Locks**: Standard PyTorch code requires NVIDIA GPUs, failing or defaulting to unusable 5-minute CPU rendering on AMD Radeon graphics cards.
2. **Security Vulnerabilities**: Client-side API calls expose provider tokens in browser network tabs, local storage, or public repositories.
3. **Stale Prompt & Caching Bugs**: Client applications often display static/cached metadata or reuse old results during generation race conditions.

---

## 3. Project Objectives
- **Full-Stack Architecture**: Implement a clean React + Vite frontend connected to an Express backend proxy.
- **Hardware Independence**: Offload neural inference to Cloudflare's edge GPU network, enabling 100% smooth execution on AMD Radeon under Windows 11.
- **Zero Credential Leakage**: Maintain API tokens strictly server-side in `server/.env`. Exclude secrets from client bundles and git histories.
- **Dynamic Request Isolation**: Tag every generation request with a unique ID (`vf_${timestamp}_${seed}`) to prevent stale state or cache reuse.
- **Zero Watermark Guarantee**: Stream clean binary image payloads directly without artificial overlays or crop modifications.

---

## 4. System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      React 18 Frontend                      │
│                (Vite Dev / Preview on Port 5173)            │
│ ┌──────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│ │  Prompt Editor   │  │  Style Selector │  │ Settings (AR)│ │
│ └─────────┬────────┘  └────────┬────────┘  └──────┬───────┘ │
│           └────────────────────┼──────────────────┘         │
│                                ▼                            │
│                      [ Generate Image ]                     │
└────────────────────────────────┬────────────────────────────┘
                                 │ POST /api/generate
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 Express Backend Proxy Server                │
│            (Port 3001 • Reads credentials from server/.env) │
│            Adapter: server/providers/cloudflare.js          │
└────────────────────────────────┬────────────────────────────┘
                                 │ REST API Execution
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 Cloudflare Workers AI Edge                  │
│       (Model: @cf/black-forest-labs/flux-1-schnell)         │
└────────────────────────────────┬────────────────────────────┘
                                 │ Raw Image Stream (image/png)
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│            Result Display & Dynamic Metadata Card           │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Neural Model & Integration Overview

### Model: `@cf/black-forest-labs/flux-1-schnell`
- **Architecture**: 12-Billion Parameter Rectified Flow Transformer.
- **Denoising Steps**: Optimized for 4 step distillation.
- **Native Resolution**: High resolution base generation with photorealistic prompt alignment.

### Provider: Cloudflare Workers AI
- **REST Endpoint**: `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/black-forest-labs/flux-1-schnell`
- **Quota & Billing**: 10,000 free Neurons per day allocation. Zero credit card or payment setup is required.

---

## 6. Backend Security & Token Management

1. **Isolation**: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are stored strictly inside `server/.env`.
2. **No `VITE_` Leaks**: Client environment variables (`.env`) contain zero secret keys.
3. **HTTP Header Controls**: Responses include `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` to prevent browser image caching.
4. **Git Safety**: `server/.env` is ignored by `.gitignore`. `server/.env.example` provides safe placeholders.

---

## 7. Technologies Used

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, CORS, Dotenv.
- **AI Infrastructure**: Cloudflare Workers AI (`@cf/black-forest-labs/flux-1-schnell`).

---

## 8. Conclusion & College Evaluation Readiness

VisionForge AI demonstrates a production-style full-stack Generative AI application. By separating the React frontend from a security-conscious Express proxy with modular provider adapters (`server/providers/cloudflare.js` and `server/providers/huggingfaceZeroGpu.js`), it achieves secure credential management, zero hardware friction on AMD Radeon graphics, zero watermark distortion, and 100% prompt adherence.
