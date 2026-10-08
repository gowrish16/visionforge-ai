import React from 'react';
import { Sparkles, Trash2, Lightbulb } from 'lucide-react';

const EVALUATOR_PROMPTS = [
  { label: "🐶 generate the dogs", text: "generate the dogs" },
  { label: "🏙️ Futuristic City", text: "A cinematic photograph of a futuristic city at night." },
  { label: "🐕 Golden Retriever Beach", text: "A realistic golden retriever playing on a beach at sunset." },
  { label: "📱 Smartphone Ad Offer", text: "A premium smartphone advertisement with a 10% festival offer." },
  { label: "🏰 Fantasy Castle", text: "A fantasy castle floating above the clouds." }
];

export default function PromptEditor({ prompt, setPrompt, onClear }) {
  const charCount = prompt.length;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Prompt Description
        </label>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono ${charCount > 900 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            {charCount}/1000
          </span>

          {prompt && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-slate-800"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 1000))}
          placeholder="Describe the image you want to generate... (e.g. generate the dogs)"
          rows={4}
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm leading-relaxed transition-all resize-none font-medium"
        />
      </div>

      {/* Evaluator Test Case Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
          Click an example prompt to test:
        </div>

        <div className="flex flex-wrap gap-2">
          {EVALUATOR_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(item.text)}
              className="text-xs bg-slate-900/90 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/60 rounded-lg px-3 py-1.5 transition-all text-left font-semibold shadow-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
