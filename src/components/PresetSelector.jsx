import React from 'react';
import { Palette, Check } from 'lucide-react';

const PRESETS = [
  { id: 'Cinematic', label: 'Cinematic', icon: '🎬', desc: 'Dramatic studio lighting & movie stills' },
  { id: 'Photorealistic', label: 'Photorealistic', icon: '📷', desc: 'Ultra-detailed 8K camera photography' },
  { id: 'Digital Art', label: 'Digital Art', icon: '🎨', desc: 'Vibrant modern concept art & illustrations' },
  { id: 'Fantasy', label: 'Fantasy', icon: '🐉', desc: 'Mystical worlds, magic & epic landscapes' },
  { id: 'Sci-Fi', label: 'Sci-Fi', icon: '🚀', desc: 'Futuristic, cyberpunk & space themes' },
  { id: 'Anime', label: 'Anime', icon: '✨', desc: 'Japanese animation & manga aesthetics' },
  { id: '3D Render', label: '3D Render', icon: '💎', desc: 'Octane render, Raytracing & CG models' },
  { id: 'Product Photography', label: 'Product Photography', icon: '📦', desc: 'Clean commercial studio showcase' },
  { id: 'Watercolor', label: 'Watercolor', icon: '🖌️', desc: 'Soft painted textures & artistic wash' },
  { id: 'Oil Painting', label: 'Oil Painting', icon: '🖼️', desc: 'Rich impasto strokes & classical art' },
  { id: 'Architecture', label: 'Architecture', icon: '🏛️', desc: 'Modern structural design & interiors' },
  { id: 'Minimalist', label: 'Minimalist', icon: '⚪', desc: 'Clean vector shapes & subtle composition' },
];

export default function PresetSelector({ selectedPreset, setSelectedPreset }) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl mb-6">
      <label className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-purple-400" />
        Artistic Style Preset <span className="text-xs font-normal text-slate-400">(Optional helper)</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {PRESETS.map((preset) => {
          const isSelected = selectedPreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(isSelected ? 'None' : preset.id)}
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <span className="text-lg">{preset.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold truncate">{preset.label}</p>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{preset.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
