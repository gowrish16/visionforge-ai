import React from 'react';
import { Wand2, Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-6 pb-4 text-center">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-semibold mb-4">
          <Wand2 className="w-3.5 h-3.5" />
          Text-to-Image Generative AI Engine
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Create anything you <span className="gradient-text">can imagine.</span>
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          Type any natural-language prompt below to generate high-resolution visual artwork, photorealistic scenes, concept art, and digital illustrations powered by latent diffusion models.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Instant Generation
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Dynamic Metadata
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Pure Frontend Project
          </div>
        </div>
      </div>
    </div>
  );
}
