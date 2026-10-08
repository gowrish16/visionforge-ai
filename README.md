# 🎨 VisionForge AI — Generative AI Image Studio

**VisionForge AI** is a full-stack Generative AI text-to-image application built with **React 18, Vite, Tailwind CSS, Express**, and **Cloudflare Workers AI**. It enables users to describe any natural-language visual prompt and synthesizes high-resolution artwork using **`@cf/black-forest-labs/flux-1-schnell`**.

Designed as a modern college Generative AI project, VisionForge AI features zero-stale-state prompt binding, server-side credential security, dynamic metadata tracking, and hardware-independent execution.

---

## 🌟 Key Features

- **Cloudflare Workers AI Integration**: Routes text-to-image requests to Cloudflare's edge GPU network using the REST API endpoint `@cf/black-forest-labs/flux-1-schnell`.
- **FLUX.1-schnell AI Model**: Powered by a 12-billion parameter rectified flow transformer model producing sharp visual compositions.
- **Modular Backend Provider Adapters**: Express proxy (`server/index.js`) features modular adapters (`server/providers/cloudflare.js` as primary and `server/providers/huggingfaceZeroGpu.js` as reference/fallback).
- **Secure Server Credentials**: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` remain strictly server-side in `server/.env`.
- **Zero Watermark Guarantee**: Streams clean binary image payloads directly without artificial overlays or logos.
- **Prompt Adherence Engine**: Eliminates hardcoded dictionary substitutions or stale metadata bugs. Every request is tagged with a unique ID (`vf_${timestamp}_${seed}`).
- **Hardware Independent (AMD / Intel / NVIDIA)**: Offloads neural inference to cloud GPUs, ensuring 100% smooth execution on AMD Radeon graphics under Windows 11.
- **8 Artistic Style Presets**: Photorealistic, Cinematic, Fantasy, Sci-Fi, Digital Art, Anime, Product Photography, and None.
- **4 Aspect Ratios**: 1:1 (Square), 16:9 (Landscape), 4:5 (Portrait), 9:16 (Tall).
- **Interactive Result Viewer**: Full-screen modal lightbox, PNG download, prompt copy button, regenerate action, and clear generation.

---

## 🏗️ Execution Architecture

```
React Frontend (Vite on Port 5173)
        │
        │ POST /api/generate
        ▼
Express Backend Proxy (Port 3001)  <--- Reads credentials from server/.env
        │
        │ Provider Adapter: server/providers/cloudflare.js
        ▼
Cloudflare Workers AI REST API
        │
        │ Model: @cf/black-forest-labs/flux-1-schnell
        ▼
Raw Image Payload (image/png) returned to Client
```

---

## 🔒 Security Architecture

1. **Credential Isolation**: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are stored ONLY in `server/.env`.
2. **Zero Client Exposure**: Secrets are never exposed in `VITE_` variables, React source code, browser DevTools, or console logs.
3. **Git Safety**: `server/.env` is strictly excluded by `.gitignore`. `server/.env.example` provides a safe template with placeholders.

---

## ⚙️ Free Quotas & Capacity Documentation

> [!NOTE]
> Cloudflare Workers AI offers an official free allowance of **10,000 Neurons per day** (~200–300 image generations per day). Zero credit card or payment setup is required. If the daily Neuron quota is exhausted or if Cloudflare experiences peak capacity demand, the backend proxy catches status 429/503 and presents a clear notification to the user.

---

## 🛠️ Installation & Local Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)
- A Cloudflare account (Account ID & API Token from `https://dash.cloudflare.com/profile/api-tokens`)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
cd d:\visionforge_ai

# Install Frontend Dependencies
npm install

# Install Backend Proxy Dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

Create `server/.env`:
```env
PORT=3001
CLOUDFLARE_ACCOUNT_ID=your_actual_cloudflare_account_id_here
CLOUDFLARE_API_TOKEN=your_actual_cloudflare_api_token_here
HF_TOKEN=your_huggingface_token_here
```

*(Refer to `server/.env.example` and `.env.example` for templates).*

---

## 🚀 Running the Project

### Step 1: Start Backend Proxy Server
```bash
cd server
node index.js
```
*Proxy will start on `http://127.0.0.1:3001`.*

### Step 2: Start Frontend Application (In a new terminal)
```bash
npm run dev
```
*Application opens at `http://localhost:5173`.*

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
VisionForge-AI/
├── server/
│   ├── index.js               # Express proxy server
│   ├── providers/
│   │   ├── cloudflare.js      # Primary Cloudflare Workers AI adapter
│   │   └── huggingfaceZeroGpu.js # Reference/fallback HF ZeroGPU adapter
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Server credentials - GIT IGNORED
│   ├── .env.example           # Safe environment template
│   └── test_hf_pipeline.js    # Automated prompt verification suite
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Navbar with [Create] and [About]
│   │   ├── Hero.jsx           # Hero banner & feature badges
│   │   ├── PromptEditor.jsx   # Prompt textarea & test chips
│   │   ├── StyleSelector.jsx  # Style presets
│   │   ├── SettingsPanel.jsx  # Aspect ratio and noise seed controls
│   │   └── ResultDisplay.jsx  # Image viewer & dynamic metadata card
│   ├── pages/
│   │   ├── CreatePage.jsx     # Image Generation workspace
│   │   └── AboutPage.jsx      # College Technical Overview page
│   ├── services/
│   │   └── imageService.js    # Backend API client proxy connector
│   ├── App.jsx
│   └── main.jsx
├── .env.example               # Root safe template
├── .gitignore                 # Excludes .env and node_modules
├── README.md                  # Project overview & guide
└── PROJECT_DOCUMENTATION.md   # Comprehensive College Project Documentation
```

---

## 👤 License & Credits

- Course: Generative AI College Assignment
- Model: `@cf/black-forest-labs/flux-1-schnell` via Cloudflare Workers AI
- License: MIT License
