import React, { useRef, useState } from 'react';
import { Heart, Sparkles, RefreshCw, Feather } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

export const LoveLetterSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const handleReadAgain = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);
    }
  };

  return (
    <section id="love-letter" className="py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFE4EC]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto">
        {/* Subtle section kicker */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <Feather className="w-3.5 h-3.5" />
            <span>A Personal Letter From My Heart</span>
            <span aria-hidden="true">·</span>
            <span>Only For Binita</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] text-balance">
            {ROMANTIC_DATA.loveLetter.heading}
          </h2>
        </div>

        {/* Parchment/Cream Paper Card with Rose Gold Border & Subtle Texture */}
        <div
          ref={cardRef}
          className={`relative bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-7 sm:p-12 md:p-14 border border-[#F0D6DE] shadow-romantic-lg transition-all duration-700 ${
            isHighlighted ? 'ring-4 ring-[#E88CA6]/50 shadow-glow scale-[1.01]' : ''
          }`}
          style={{
            backgroundImage: `radial-gradient(#F9ECEF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        >
          {/* Top Rose-Gold Decorative Flourish & Wax Stamp */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#F2DEE4]">
            <div className="flex items-center gap-2 text-[#8B1E3F]">
              <Heart className="w-5 h-5 fill-[#8B1E3F]" />
              <span className="font-script text-2xl text-[#8B1E3F]">My Dearest Binita</span>
            </div>
            
            {/* Wax seal emblem */}
            <div className="w-12 h-12 rounded-full bg-[#8B1E3F] text-[#FFF0F3] border-2 border-[#E8B4B8] shadow-sm flex items-center justify-center font-display font-bold text-sm tracking-wider">
              B ♡
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-5 text-[#3A1E27] font-serif text-base sm:text-lg leading-relaxed tracking-normal">
            <p className="font-script text-3xl sm:text-4xl text-[#8B1E3F] mb-4">
              {ROMANTIC_DATA.loveLetter.paragraphs[0]}
            </p>

            {ROMANTIC_DATA.loveLetter.paragraphs.slice(1).map((para, idx) => (
              <p key={idx} className="text-[#3A1E27] first-letter:text-xl">
                {para}
              </p>
            ))}
          </div>

          {/* Signoff / Closing */}
          <div className="mt-10 pt-6 border-t border-[#F2DEE4] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-cormorant italic text-lg text-[#7C3A4D]">
                {ROMANTIC_DATA.loveLetter.closing}
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#8B1E3F] mt-1">
                {ROMANTIC_DATA.loveLetter.signature}
              </p>
            </div>

            {/* Read Letter Again Button */}
            <button
              onClick={handleReadAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#8B1E3F] bg-[#FFF2F5] hover:bg-[#FFE6EC] border border-[#F3CBD5] rounded-full transition-colors self-start sm:self-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E3F]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ROMANTIC_DATA.loveLetter.reReadButton}</span>
            </button>
          </div>

          {/* Corner flourish ornament */}
          <div className="absolute bottom-3 right-3 text-[#E8B4B8]/40 pointer-events-none select-none">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};
