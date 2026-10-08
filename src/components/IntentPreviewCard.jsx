import React from 'react';
import { Brain, CheckCircle2, Tag, Wand2, ShieldAlert } from 'lucide-react';

export default function IntentPreviewCard({ intent, enhancedPrompt, negativePrompt }) {
  if (!intent) return null;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 bg-cyan-950/20 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-3 border-b border-cyan-900/50 pb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
          <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
          AI Intent Understanding & Semantic Extraction
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
          High Adherence Engine Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 text-[10px] font-bold block mb-0.5">TARGET SUBJECT</span>
          <span className="text-white font-extrabold capitalize text-sm flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {intent.subject}
          </span>
        </div>

        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 text-[10px] font-bold block mb-0.5">PURPOSE / MODE</span>
          <span className="text-purple-300 font-bold">{intent.purpose}</span>
        </div>

        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 text-[10px] font-bold block mb-0.5">ARTISTIC STYLE</span>
          <span className="text-cyan-300 font-bold">{intent.style}</span>
        </div>

        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 text-[10px] font-bold block mb-0.5">OFFER / BADGE</span>
          <span className="text-amber-400 font-extrabold flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {intent.offer_text || 'Standard Composition'}
          </span>
        </div>
      </div>

      {/* Enhanced Diffusion Prompt Preview */}
      <div className="space-y-2 text-xs">
        <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-bold flex items-center gap-1 mb-1 text-[11px]">
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            Enhanced Diffusion Prompt (Subject Dominant):
          </span>
          <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
            "{enhancedPrompt}"
          </p>
        </div>

        {negativePrompt && (
          <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-bold flex items-center gap-1 mb-0.5 text-[10px]">
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              Auto Negative Prompt (Prevents Unrelated Objects):
            </span>
            <p className="text-slate-400 font-mono text-[10px] truncate">
              {negativePrompt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
