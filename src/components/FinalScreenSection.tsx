import React from 'react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

interface FinalScreenSectionProps {
  onRestart: () => void;
}

export const FinalScreenSection: React.FC<FinalScreenSectionProps> = ({ onRestart }) => {
  return (
    <footer className="relative min-h-[80vh] sm:min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1C040E] via-[#2D0616] to-[#120209] text-white px-4 py-20 overflow-hidden text-center">
      {/* Cinematic ambient radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(232, 140, 166, 0.4) 0%, rgba(183, 110, 121, 0.1) 50%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Glowing Heart Emblem */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-[#E88CA6]/30 rounded-full blur-xl animate-pulse" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8B1E3F] to-[#B76E79] border border-[#FFCCD5]/50 flex items-center justify-center shadow-gold-glow">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFCCD5] fill-[#FFCCD5] animate-pulse" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#FFD700]" />
        </div>

        {/* 3 Iconic Lines */}
        <div className="space-y-2 mb-8">
          {ROMANTIC_DATA.closing.lines.map((line, idx) => (
            <h2
              key={idx}
              className={`font-display font-black tracking-wide text-white drop-shadow-md ${
                idx === 2 
                  ? 'text-3xl sm:text-4xl md:text-5xl text-[#FFCCD5] pt-1' 
                  : 'text-2xl sm:text-3xl md:text-4xl text-[#FCE4EC]'
              }`}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Appreciation Text */}
        <p className="font-serif italic text-base sm:text-xl text-[#FADCE4] max-w-lg mx-auto mb-8 leading-relaxed font-light">
          "{ROMANTIC_DATA.closing.subtext}"
        </p>

        {/* Signature */}
        <p className="font-script text-3xl sm:text-4xl text-[#FFB6C1] mb-12 tracking-wide">
          {ROMANTIC_DATA.closing.signature}
        </p>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D0616] bg-[#FFF2F5] hover:bg-white rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 border border-[#FFCCD5] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#8B1E3F] group-hover:-rotate-90 transition-transform duration-500" />
          <span>{ROMANTIC_DATA.closing.restartButton}</span>
        </button>

        {/* Quiet copyright */}
        <div className="mt-16 text-[11px] text-[#A67585] tracking-widest uppercase font-mono">
          Handcrafted with endless love for Binita
        </div>
      </div>
    </footer>
  );
};
