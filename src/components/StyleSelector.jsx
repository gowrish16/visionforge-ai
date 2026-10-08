import React from 'react';
import { Palette, Check } from 'lucide-react';

const STYLES = [
  { id: 'Photorealistic', label: 'Photorealistic', icon: '📷', desc: 'Detailed 8K camera photography' },
  { id: 'Cinematic', label: 'Cinematic', icon: '🎬', desc: 'Dramatic lighting & film stills' },
  { id: 'Fantasy', label: 'Fantasy', icon: '🐉', desc: 'Mystical worlds & epic magic' },
  { id: 'Sci-Fi', label: 'Sci-Fi', icon: '🚀', desc: 'Futuristic & cyberpunk themes' },
  { id: 'Digital Art', label: 'Digital Art', icon: '🎨', desc: 'Concept art & illustrations' },
  { id: 'Anime', label: 'Anime', icon: '✨', desc: 'Japanese animation aesthetics' },
  { id: 'Product Photography', label: 'Product Photography', icon: '📦', desc: 'Clean commercial showcase' },
  { id: 'None', label: 'No Style (Raw)', icon: '⚪', desc: 'Pure unguided user prompt' },
];

export default function StyleSelector({ selectedStyle, setSelectedStyle }) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl mb-6">
      <label className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-purple-400" />
        Artistic Style Preset <span className="text-xs font-normal text-slate-400">(Optional helper)</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(isSelected ? 'None' : style.id)}
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <span className="text-lg">{style.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold truncate">{style.label}</p>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{style.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
