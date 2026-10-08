import React, { useState } from 'react';
import { Sliders, ShieldAlert } from 'lucide-react';

const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 Square', dims: '1024 x 1024', icon: '⏹️' },
  { id: '16:9', label: '16:9 Landscape', dims: '1280 x 720', icon: '🖼️' },
  { id: '4:5', label: '4:5 Portrait', dims: '800 x 1000', icon: '📷' },
  { id: '9:16', label: '9:16 Tall', dims: '720 x 1280', icon: '📱' },
];

export default function SettingsPanel({
  aspectRatio,
  setAspectRatio,
  seed,
  setSeed,
  negativePrompt,
  setNegativePrompt
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          Image Generation Settings
        </label>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
      </div>

      {/* Aspect Ratio Selector */}
      <div className="mb-2">
        <span className="text-xs font-semibold text-slate-300 block mb-2">Aspect Ratio</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ASPECT_RATIOS.map((ratio) => {
            const active = aspectRatio === ratio.id;
            return (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  active
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="text-sm mb-1">{ratio.icon}</span>
                <span className="text-xs font-bold">{ratio.id}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">{ratio.dims}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Options: Seed & Negative Prompt */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-4">
          {/* Seed Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                Noise Seed
                <span className="text-slate-500 text-[10px]">(For reproducible generation)</span>
              </label>
              {seed !== '' && (
                <button
                  onClick={() => setSeed('')}
                  className="text-[10px] text-cyan-400 hover:underline"
                >
                  Reset to Random
                </button>
              )}
            </div>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : '')}
              placeholder="Leave blank for random noise seed..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Negative Prompt */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Negative Prompt
              <span className="text-slate-500 text-[10px]">(Specify elements to exclude)</span>
            </label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="e.g. blurry, low quality, distorted, overexposed..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
