import React from 'react';
import { Sparkles, Info, Cpu, CheckCircle2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-rose-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                VisionForge <span className="gradient-text">AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">AI-Powered Text-to-Image Studio</p>
          </div>
        </div>

        {/* Center Navigation Links: [✦ Create] [ⓘ About] */}
        <nav className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Create
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Info className="w-4 h-4" />
            About
          </button>
        </nav>

        {/* Engine Status Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 font-medium">Pollinations FLUX.1 Engine</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            Client API Active
          </span>
        </div>

      </div>
    </header>
  );
}
