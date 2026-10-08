import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${
        isError
          ? 'bg-rose-950/90 border-rose-800 text-rose-200'
          : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
      }`}>
        {isError ? (
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        )}
        <span className="text-xs font-semibold">{message}</span>
        <button onClick={onClose} className="p-1 hover:bg-slate-800/50 rounded-lg transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
