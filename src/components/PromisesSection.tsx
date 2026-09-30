import React, { useState } from 'react';
import { Heart, Sparkles, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

export const PromisesSection: React.FC = () => {
  const promises = ROMANTIC_DATA.promises.items;
  const [activeStep, setActiveStep] = useState<number>(promises.length - 1); // by default show all or interactive

  return (
    <section id="promises" className="py-24 sm:py-32 px-4 relative bg-[#22040F] text-white overflow-hidden">
      {/* Tiny glowing stars in background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-[10%] w-1.5 h-1.5 bg-[#FFDFE6] rounded-full animate-ping" />
        <div className="absolute top-24 right-[15%] w-1 h-1 bg-[#FFD700] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-[5%] w-1 h-1 bg-[#FFF] rounded-full animate-ping" />
        <div className="absolute bottom-20 right-[12%] w-1.5 h-1.5 bg-[#FFDFE6] rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-[20%] w-1 h-1 bg-[#FFD700] rounded-full animate-ping" />
        <div className="absolute top-1/3 right-[30%] w-1 h-1 bg-[#FFF] rounded-full animate-pulse" />
      </div>

      {/* Cinematic ambient rose-gold radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 25%, rgba(183, 110, 121, 0.22) 0%, rgba(34, 4, 15, 0.95) 75%)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Rose-Gold Heart */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-[#B76E79]/30 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8B1E3F] to-[#B76E79] border-2 border-[#E8B4B8]/60 flex items-center justify-center shadow-gold-glow">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD1DC] fill-[#FFD1DC] animate-pulse" />
            </div>
            <Star className="absolute -bottom-1 -right-1 w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
          </div>

          <p className="font-script text-2xl sm:text-3xl text-[#E8B4B8] mb-2 tracking-wide">
            Forever & Always
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            {ROMANTIC_DATA.promises.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#D4A5B3] font-normal leading-relaxed">
            {ROMANTIC_DATA.promises.subtitle}
          </p>
        </div>

        {/* Promises List Cards */}
        <div className="space-y-4 mb-16">
          {promises.map((promise, index) => {
            return (
              <div
                key={index}
                className="group relative bg-[#2E0817]/90 hover:bg-[#3B0C1E] border border-[#5A1930] hover:border-[#B76E79] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg flex items-start gap-4"
              >
                {/* Index badge */}
                <div className="w-8 h-8 rounded-full bg-[#4A0E23] border border-[#7C2744] flex items-center justify-center shrink-0 text-xs font-mono font-bold text-[#E8B4B8] group-hover:bg-[#B76E79] group-hover:text-white transition-colors">
                  0{index + 1}
                </div>

                <div className="flex-1">
                  <p className="font-serif text-base sm:text-lg text-[#FDE8EE] group-hover:text-white leading-relaxed transition-colors">
                    {promise}
                  </p>
                </div>

                <ShieldCheck className="w-5 h-5 text-[#B76E79] opacity-70 group-hover:opacity-100 group-hover:text-[#FFCCD5] transition-all shrink-0 mt-0.5" />
              </div>
            );
          })}
        </div>

        {/* End Quote Card */}
        <div className="relative rounded-3xl p-8 sm:p-10 border border-[#E8B4B8]/30 bg-gradient-to-r from-[#2F0918] via-[#3E0D22] to-[#2F0918] text-center shadow-gold-glow">
          <Sparkles className="w-6 h-6 text-[#FFD700] mx-auto mb-4" />
          <p className="font-serif italic text-lg sm:text-2xl text-[#FFE6ED] leading-relaxed max-w-2xl mx-auto">
            "{ROMANTIC_DATA.promises.conclusion}"
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E8B4B8]">
            <Heart className="w-3.5 h-3.5 fill-[#E8B4B8]" />
            <span>Dedicated with eternal devotion to Binita</span>
            <Heart className="w-3.5 h-3.5 fill-[#E8B4B8]" />
          </div>
        </div>
      </div>
    </section>
  );
};
