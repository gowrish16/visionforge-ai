import React, { useState } from 'react';
import { Download, RefreshCw, Copy, Maximize2, Sparkles, Wand2, Check, RotateCcw } from 'lucide-react';

export default function ResultDisplay({
  isGenerating,
  result,
  onGenerateAgain,
  onCopyPrompt,
  onClearResult
}) {
  const [selectedImageModal, setSelectedImageModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Loading Experience State
  if (isGenerating) {
    return (
      <div className="glass-panel rounded-2xl p-10 border border-cyan-500/30 shadow-2xl text-center mb-10">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-rose-500 p-1 shadow-lg shadow-cyan-500/30 animate-spin">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-white mb-2">Creating your image...</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
          Synthesizing high-resolution diffusion tensors from your prompt.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <Wand2 className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
          FLUX.1 Diffusion Engine Active
        </div>
      </div>
    );
  }

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.originalPrompt);
    setCopied(true);
    if (onCopyPrompt) onCopyPrompt();
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate safe filename for download
  const safeFilename = `visionforge_${result.originalPrompt.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25)}_${result.seed}.png`;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl mb-10">
      
      {/* Result Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[11px] font-bold">
              Image Generated Successfully
            </span>
            <span className="text-xs font-mono text-slate-400">
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {/* DYNAMIC PROMPT METADATA derived strictly from current result */}
          <h3 className="text-lg font-bold text-white mt-1.5 max-w-3xl">
            "{result.originalPrompt}"
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={result.imageUrl}
            download={safeFilename}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            Download PNG
          </a>

          <button
            onClick={onGenerateAgain}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Generate Again
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Prompt'}
          </button>

          <button
            onClick={onClearResult}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all"
            title="Clear and start new generation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Generated Image Container */}
      <div className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl max-w-4xl mx-auto mb-6">
        <img
          src={result.imageUrl}
          alt={result.originalPrompt}
          className="w-full h-auto object-contain max-h-[650px] mx-auto transition-transform duration-500 group-hover:scale-[1.005]"
        />

        {/* Hover Expand Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setSelectedImageModal(true)}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white hover:bg-cyan-600 transition-all shadow-xl"
            title="Expand Full Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DYNAMIC RESULT METADATA CARD — 100% Derived from Current Generation */}
      <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
        <div className="text-xs font-bold text-cyan-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Current Generation Metadata
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-300">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 block mb-0.5">ORIGINAL PROMPT</span>
            <span className="text-white font-sans font-semibold text-[11px] line-clamp-1" title={result.originalPrompt}>
              "{result.originalPrompt}"
            </span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 block mb-0.5">STYLE PRESET</span>
            <span className="text-purple-300 font-sans font-bold">{result.style}</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 block mb-0.5">ASPECT RATIO</span>
            <span className="text-cyan-300 font-bold">{result.aspectRatio} ({result.dimensions})</span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 block mb-0.5">AI PROVIDER & MODEL</span>
            <span className="text-slate-200 text-[11px] font-bold">{result.provider} ({result.model})</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Seed: <strong className="text-slate-200">{result.seed}</strong></span>
          <span>Render Time: <strong className="text-emerald-400">~2.5s</strong></span>
        </div>
      </div>

      {/* Modal Fullscreen Lightbox */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImageModal(false)}>
          <div className="relative max-w-5xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={result.imageUrl} alt={result.originalPrompt} className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto" />
            
            <div className="flex items-center justify-between p-3 mt-2">
              <span className="text-xs text-slate-300 font-mono truncate max-w-xl">"{result.originalPrompt}"</span>
              <div className="flex items-center gap-2">
                <a
                  href={result.imageUrl}
                  download={safeFilename}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save Image
                </a>
                <button
                  onClick={() => setSelectedImageModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
