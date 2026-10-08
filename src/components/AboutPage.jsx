import React from 'react';
import { Sparkles, Brain, Cpu, Layers, Wand2, ArrowRight, ShieldCheck, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-3">
          <Brain className="w-3.5 h-3.5" />
          Technical Overview & Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          How VisionForge <span className="gradient-text">AI Works</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          VisionForge AI is a state-of-the-art text-to-image generative engine that transforms natural language descriptions into high-resolution visual artwork using latent diffusion models.
        </p>
      </div>

      {/* Grid of Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Card 1: Generative AI */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">1. Generative Artificial Intelligence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generative AI refers to deep learning models trained on vast datasets of multi-modal information. Unlike traditional discriminative algorithms that only categorize inputs, generative models learn underlying probability distributions to synthesize entirely novel images from scratch based on user intent.
          </p>
        </div>

        {/* Card 2: Latent Diffusion Models */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-4">
            <Wand2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">2. Latent Diffusion Mechanism</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Diffusion models start with pure Gaussian noise $Z \sim \mathcal{N}(0, I)$ and iteratively remove noise over multiple timesteps. By conducting denoising in a low-dimensional latent space rather than pixel space, latent diffusion generates crisp, coherent high-resolution images while preserving memory efficiency.
          </p>
        </div>

        {/* Card 3: Text Conditioning */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">3. Cross-Attention & CLIP Conditioning</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            User prompts are tokenized and projected into semantic embedding space via Transformer text encoders (such as CLIP / OpenCLIP). Cross-attention layers within the U-Net neural architecture guide the denoising trajectory, matching generated visual features with prompt semantics.
          </p>
        </div>

        {/* Card 4: Hardware & PyTorch */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">4. Hardware Flexibility & PyTorch</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built using PyTorch tensors and modular API generator abstractions (`ImageGenerator`), VisionForge AI operates reliably on standard CPUs, AMD Radeon GPUs, and cloud API accelerators without enforcing NVIDIA CUDA hardware restrictions.
          </p>
        </div>

      </div>

      {/* System Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-10">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          End-to-End Execution Pipeline
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs font-mono text-slate-300">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-cyan-400 font-bold mb-1">1. User Prompt</div>
            <div className="text-[10px] text-slate-500">React Frontend UI</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-purple-400 font-bold mb-1">2. FastAPI Service</div>
            <div className="text-[10px] text-slate-500">Validation & Control</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-rose-400 font-bold mb-1">3. Diffusion Engine</div>
            <div className="text-[10px] text-slate-500">SDXL / PyTorch Engine</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl w-full sm:w-1/4">
            <div className="text-emerald-400 font-bold mb-1">4. Rendered Image</div>
            <div className="text-[10px] text-slate-500">Stored PNG & History</div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 font-medium">
        VisionForge AI — Generative AI Image Studio Project • Built for College Evaluation & Technical Demonstrations
      </div>
    </div>
  );
}
