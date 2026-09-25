import React from 'react';
import { Bot, Mic, Sparkles } from 'lucide-react';

interface FloatingAIButtonProps {
  onOpen: () => void;
  onOpenVoice?: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ 
  onOpen,
  onOpenVoice
}) => {
  const handleClick = () => {
    // Open the unified assistant modal
    onOpen();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 drop-shadow-2xl">
      <button
        onClick={handleClick}
        className="px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono flex items-center gap-2.5 shadow-2xl border border-slate-700 transition-all hover:scale-105 active:scale-95 group ring-1 ring-emerald-500/20"
        title="Ask Sandeep AI & Voice Assistant (Chat & Spoken Audio)"
        aria-label="Ask AI and Voice Assistant"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center border border-emerald-500/40 group-hover:bg-emerald-600/50 transition-colors">
          <Bot className="w-4 h-4" />
        </div>
        <span className="font-sans text-sm font-semibold tracking-wide">Ask AI & Voice</span>
        <div className="flex items-center gap-1 bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-600/50 text-emerald-300 text-[11px] font-mono">
          <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Live</span>
        </div>
      </button>
    </div>
  );
};
