import React, { useState } from 'react';
import Hero from '../components/Hero';
import PromptEditor from '../components/PromptEditor';
import StyleSelector from '../components/StyleSelector';
import SettingsPanel from '../components/SettingsPanel';
import ResultDisplay from '../components/ResultDisplay';
import { generateTextToImage } from '../services/imageService';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CreatePage({ showToast }) {
  // Active Form Controls
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [seed, setSeed] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');

  // Generation & Result State
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeResult, setActiveResult] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showToast('Please enter a prompt description to generate an image.', 'error');
      return;
    }

    setIsGenerating(true);
    setActiveResult(null);

    // Scroll smoothly to display area
    window.scrollTo({ top: 380, behavior: 'smooth' });

    try {
      const resultData = await generateTextToImage({
        prompt: prompt.trim(),
        style: selectedStyle,
        aspectRatio: aspectRatio,
        seed: seed,
        negativePrompt: negativePrompt
      });

      setActiveResult(resultData);
      showToast('AI Image generated successfully!', 'success');
    } catch (err) {
      console.error('Generation failure:', err);
      showToast(err.message || 'Image generation failed. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Hero />

      <div className="max-w-5xl mx-auto px-4 mt-2">
        {/* Prompt Editor */}
        <PromptEditor
          prompt={prompt}
          setPrompt={setPrompt}
          onClear={() => setPrompt('')}
        />

        {/* Style Selector */}
        <StyleSelector
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />

        {/* Image Settings Panel */}
        <SettingsPanel
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          seed={seed}
          setSeed={setSeed}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
        />

        {/* Prominent Generate Button */}
        <div className="mb-10 text-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-extrabold text-base transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto ${
              isGenerating || !prompt.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating ? 'Generating Image...' : 'Generate Image'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active Result View */}
        <ResultDisplay
          isGenerating={isGenerating}
          result={activeResult}
          onGenerateAgain={handleGenerate}
          onCopyPrompt={() => showToast('Prompt copied to clipboard!', 'info')}
          onClearResult={() => {
            setActiveResult(null);
            showToast('Result cleared. Ready for new prompt.', 'info');
          }}
        />
      </div>
    </div>
  );
}
