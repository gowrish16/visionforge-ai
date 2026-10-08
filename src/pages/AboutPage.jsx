import React from 'react';
import { Sparkles, Brain, Cpu, Layers, Wand2, ArrowRight, Code2, AlertTriangle, Target, Lock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-3">
          <Brain className="w-3.5 h-3.5" />
          College Project Technical Overview
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          About VisionForge <span className="gradient-text">AI</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          VisionForge AI is a full-stack Generative AI application that transforms natural language text prompts into high-resolution visual artwork using state-of-the-art diffusion models (<code className="text-cyan-300">@cf/black-forest-labs/flux-1-schnell</code>) hosted on Cloudflare Workers AI.
        </p>
      </div>

      {/* Grid of Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Card 1: What is Generative AI */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">1. What is Generative AI?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generative AI refers to deep learning architectures trained on vast multi-modal datasets. Unlike discriminative models that classify inputs into pre-existing categories, generative models learn underlying feature distributions to synthesize entirely new images based on natural language prompts.
          </p>
        </div>

        {/* Card 2: FLUX.1 Rectified Flow Architecture */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-4">
            <Wand2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">2. FLUX.1 Denoising Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            VisionForge AI utilizes <code className="text-purple-300">@cf/black-forest-labs/flux-1-schnell</code>, a 12-billion parameter rectified flow transformer model hosted on Cloudflare Workers AI. It achieves photorealistic quality, prompt alignment, and sharp composition.
          </p>
        </div>

        {/* Card 3: Backend Security Proxy */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">3. Credential Security & Express Adapters</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To prevent API key leakage, the application uses a lightweight Express proxy (<code className="text-rose-300">server/index.js</code>) with modular adapters (<code className="text-rose-300">server/providers/cloudflare.js</code> and <code className="text-rose-300">huggingfaceZeroGpu.js</code>). API credentials remain strictly server-side in <code className="text-rose-300">server/.env</code>.
          </p>
        </div>

        {/* Card 4: Hardware Independence */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">4. Hardware Independence (AMD / Intel / NVIDIA)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            By offloading inference to Cloudflare Workers AI edge GPUs, local PyTorch/CUDA driver dependencies are eliminated. This enables 100% smooth execution on AMD Radeon, Intel, or NVIDIA hardware under Windows 11.
          </p>
        </div>

      </div>

      {/* System Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-10">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          Execution Pipeline Architecture
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs font-mono text-slate-300">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-cyan-400 font-bold mb-1">1. React SPA</div>
            <div className="text-[10px] text-slate-500">Vite Frontend (5173)</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-purple-400 font-bold mb-1">2. Express Proxy</div>
            <div className="text-[10px] text-slate-500">POST /api/generate (3001)</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-rose-400 font-bold mb-1">3. Cloudflare Workers AI</div>
            <div className="text-[10px] text-slate-500">REST API Edge Inference</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-emerald-400 font-bold mb-1">4. Rendered Image</div>
            <div className="text-[10px] text-slate-500">Clean Unwatermarked Binary</div>
          </div>
        </div>
      </div>

      {/* Limitations & Project Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2 mb-2">
            <Target className="w-4 h-4" />
            Project Objectives
          </h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>Demonstrate full-stack Generative AI text-to-image integration.</li>
            <li>Eliminate stale prompt bugs through dynamic request IDs.</li>
            <li>Protect provider access tokens server-side in <code className="text-slate-300">server/.env</code>.</li>
            <li>Provide clean responsive visual controls for college presentation.</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            Cloudflare Free Quotas & Capacity
          </h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>Governed by Cloudflare's official 10,000 free Neurons/day allocation (~200-300 images per day).</li>
            <li>Zero credit card or payment setup is required.</li>
            <li>No database or persistent storage is required by design.</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 font-medium">
        VisionForge AI — AI-Powered Text-to-Image Studio • College Generative AI Project
      </div>
    </div>
  );
}
