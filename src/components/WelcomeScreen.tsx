import React, { useState } from 'react';
import { Heart, Sparkles, Send, Smartphone } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

interface WelcomeScreenProps {
  onEnter: () => void;
  onOpenAPKModal?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, onOpenAPKModal }) => {
  const [isBlooming, setIsBlooming] = useState<boolean>(false);

  const handleOpen = () => {
    setIsBlooming(true);
    // Play blooming effect and sound before triggering full view reveal
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#240612] via-[#380A1D] to-[#1A030C] text-white px-4 py-12 select-none">
      {/* Top right quick App install trigger */}
      {onOpenAPKModal && (
        <button
          onClick={onOpenAPKModal}
          className="absolute top-5 right-5 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#FFCCD5] transition-all"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Get App / APK</span>
        </button>
      )}

      {/* Dreamy radial glow backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(232, 140, 166, 0.35) 0%, rgba(183, 110, 121, 0.15) 45%, transparent 75%)'
        }}
      />

      {/* Floating subtle ambient orbs */}
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-[#E88CA6]/15 blur-3xl animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-[#B76E79]/20 blur-3xl animate-float-gentle pointer-events-none" />

      {/* Center content container */}
      <div className={`relative z-20 max-w-2xl mx-auto text-center flex flex-col items-center transition-all duration-1000 ${
        isBlooming ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100'
      }`}>
        {/* Glowing Heart Icon / Emblem */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9EAF] to-[#E88CA6] rounded-full blur-xl opacity-40 animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8B1E3F] to-[#541026] border border-[#E8B4B8]/40 flex items-center justify-center shadow-gold-glow">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFB6C1] fill-[#FFB6C1] animate-pulse" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#FFD700] animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Greeting Heading */}
        <p className="font-script text-3xl sm:text-4xl text-[#FFB6C1] tracking-wide mb-2">
          Dearest Darling
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance leading-tight drop-shadow-md">
          {ROMANTIC_DATA.welcome.greeting}
        </h1>

        {/* Subtitles */}
        <div className="space-y-3 mb-10 max-w-lg">
          <p className="font-cormorant italic text-xl sm:text-2xl text-[#FCE4EC] font-light">
            "{ROMANTIC_DATA.welcome.subtext1}"
          </p>
          <p className="text-sm sm:text-base text-[#E2CCD4] font-normal leading-relaxed">
            {ROMANTIC_DATA.welcome.subtext2}
          </p>
        </div>

        {/* Glowing Button */}
        <button
          onClick={handleOpen}
          disabled={isBlooming}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#D65D7A] via-[#8B1E3F] to-[#C95370] rounded-full shadow-glow hover:shadow-romantic-lg transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 border border-[#FFCCD5]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF9EAF]/50 cursor-pointer"
        >
          <span className="tracking-wider uppercase text-xs sm:text-sm font-bold">
            {ROMANTIC_DATA.welcome.cta}
          </span>
          <Send className="w-4 h-4 text-[#FFE5EC] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          
          {/* Subtle button ring glow */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FFE4E1] opacity-30 group-hover:opacity-60 blur-xs transition-opacity -z-10" />
        </button>

        {/* Quiet footer reassurance */}
        <p className="mt-8 text-xs text-[#C59AA7] tracking-wider uppercase font-medium">
          A heartfelt digital treasure made just for Binita
        </p>
      </div>

      {/* Heart Blooming overlay animation on click */}
      {isBlooming && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#FFF9F6]/40 backdrop-blur-md animate-in fade-in duration-1000">
          <div className="relative">
            <Heart className="w-32 h-32 sm:w-48 sm:h-48 text-[#D65D7A] fill-[#D65D7A] animate-ping" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-script text-2xl text-white">Binita ♡</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
