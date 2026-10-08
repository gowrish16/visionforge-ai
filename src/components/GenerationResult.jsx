import React, { useState } from 'react';
import { Download, RefreshCw, Copy, Maximize2, Sparkles, Wand2, Check, Brain } from 'lucide-react';

export default function GenerationResult({
  isGenerating,
  resultRecord,
  onGenerateAgain,
  onUseAsInspiration,
  onCopyPrompt
}) {
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [copied, setCopied] = useState(false);

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
          Synthesizing high-adherence diffusion tensors from your enhanced subject prompt.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <Wand2 className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
          Generative AI Engine Active
        </div>
      </div>
    );
  }

  if (!resultRecord) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultRecord.prompt);
    setCopied(true);
    if (onCopyPrompt) onCopyPrompt();
    setTimeout(() => setCopied(false), 2000);
  };

  const images = resultRecord.images || [];
  const intent = resultRecord.intent || {};

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl mb-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[11px] font-bold">
              Generated Successfully
            </span>
            {intent.subject && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 text-[11px] font-bold capitalize">
                Subject: {intent.subject}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">
              {new Date(resultRecord.created_at).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-base font-bold text-white mt-1.5 max-w-3xl line-clamp-2">
            "{resultRecord.prompt}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onGenerateAgain}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate Again
          </button>

          <button
            onClick={() => onUseAsInspiration(resultRecord.prompt)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Use as Inspiration
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Prompt'}
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className={`grid gap-4 ${images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((imgUrl, idx) => (
          <div key={idx} className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            <img
              src={imgUrl}
              alt={`Generated artwork ${idx+1}`}
              className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedImageModal(imgUrl)}
                  className="p-2 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-cyan-600 transition-all shadow-lg"
                  title="Expand full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                  Seed: {resultRecord.seed + idx}
                </div>

                <a
                  href={imgUrl}
                  download={`visionforge_ai_${resultRecord.seed + idx}.png`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PNG
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* College Project Evaluation Metadata Panel */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 bg-slate-950/60 p-4 rounded-xl space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-cyan-300 mb-1">
          <Brain className="w-4 h-4 text-cyan-400" />
          Generative AI Pipeline Metadata (College Evaluation Details)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-300">
          <div>Detected Subject: <strong className="text-white capitalize">{intent.subject || 'Default'}</strong></div>
          <div>Mode: <strong className="text-purple-300">{intent.purpose || 'Scene'}</strong></div>
          <div>Style Preset: <strong className="text-cyan-300">{resultRecord.style_preset}</strong></div>
          <div>Model: <strong className="text-slate-200">{resultRecord.model}</strong></div>
        </div>

        {resultRecord.enhanced_prompt && (
          <div className="pt-2 border-t border-slate-800/60">
            <span className="text-slate-400 font-bold block mb-0.5">Enhanced Model Prompt:</span>
            <p className="text-slate-300 font-mono text-[11px] leading-snug">
              "{resultRecord.enhanced_prompt}"
            </p>
          </div>
        )}
      </div>

      {/* Modal Lightbox */}
      {selectedImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImageModal(null)}>
          <div className="relative max-w-5xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImageModal} alt="Expanded preview" className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto" />
            
            <div className="flex items-center justify-between p-3 mt-2">
              <span className="text-xs text-slate-300 font-mono truncate max-w-xl">"{resultRecord.prompt}"</span>
              <div className="flex items-center gap-2">
                <a
                  href={selectedImageModal}
                  download="visionforge_ai_expanded.png"
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save Image
                </a>
                <button
                  onClick={() => setSelectedImageModal(null)}
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
