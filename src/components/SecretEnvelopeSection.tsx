import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Send, Smile } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

export const SecretEnvelopeSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [kissSent, setKissSent] = useState<boolean>(false);
  const [flyingKisses, setFlyingKisses] = useState<{ id: number; left: number; top: number }[]>([]);

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 900);
  };

  const handleSendKiss = () => {
    setKissSent(true);

    // Create 5 flying hearts / kisses across screen
    const newKisses = Array.from({ length: 7 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 20,
    }));
    setFlyingKisses((prev) => [...prev, ...newKisses]);

    setTimeout(() => {
      setFlyingKisses([]);
    }, 2500);
  };

  return (
    <section id="surprise" className="py-24 sm:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#FFF9F6] via-[#FFF0F4] to-[#FFF9F6]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FFE0EA]/45 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Flying kisses animation container */}
      {flyingKisses.map((kiss) => (
        <div
          key={kiss.id}
          className="fixed z-50 pointer-events-none animate-ping text-3xl sm:text-5xl"
          style={{
            left: `${kiss.left}%`,
            top: `${kiss.top}%`,
            transition: 'all 2s ease-out'
          }}
        >
          😘
        </div>
      ))}

      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Secret Love Envelope</span>
            <span aria-hidden="true">·</span>
            <span>Just For You</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] mb-3 text-balance">
            {ROMANTIC_DATA.envelope.heading}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#7C4857] font-medium">
            "{ROMANTIC_DATA.envelope.invitation}"
          </p>
        </div>

        {/* Envelope Interactive Component */}
        {!isOpen ? (
          <div className="flex flex-col items-center">
            {/* Sealed Luxury Envelope Visual */}
            <div 
              onClick={handleOpenEnvelope}
              className={`relative cursor-pointer group transition-all duration-700 w-full max-w-md ${
                isOpening ? 'scale-105 rotate-1 blur-xs' : 'hover:scale-102'
              }`}
            >
              {/* Outer Envelope Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#E88CA6] to-[#B76E79] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />

              {/* Envelope Body */}
              <div className="relative bg-[#FFFBF8] rounded-3xl p-8 sm:p-12 border-2 border-[#E8B4B8] shadow-romantic-lg flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                {/* Envelope Flap Fold Visual */}
                <div 
                  className="absolute top-0 left-0 right-0 h-28 bg-[#FFF2F5] border-b border-[#E8B4B8] transition-transform origin-top duration-700 flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)'
                  }}
                />

                {/* Golden Heart Wax Seal */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#9B2346] via-[#B76E79] to-[#D65D7A] border-3 border-[#FFF] shadow-gold-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                </div>

                <p className="relative z-10 font-script text-2xl text-[#8B1E3F] mt-4">
                  For Binita's Eyes Only
                </p>
              </div>
            </div>

            {/* Glowing CTA Button */}
            <button
              onClick={handleOpenEnvelope}
              disabled={isOpening}
              className="mt-8 group inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#8B1E3F] via-[#A83256] to-[#B76E79] rounded-full shadow-glow hover:shadow-romantic-lg transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 border border-[#FFCCD5]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF9EAF]/50 cursor-pointer"
            >
              <span className="font-bold tracking-wider uppercase text-xs sm:text-sm">
                {ROMANTIC_DATA.envelope.openButton}
              </span>
              <Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ) : (
          /* Opened Letter Surprise Reveal */
          <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 border border-[#E8B4B8] shadow-romantic-lg animate-in zoom-in-95 duration-700 relative text-left">
            {/* Top Wax Header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#F4E1E7]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B76E79]">
                  Unfolded Secret
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#8B1E3F]">
                  {ROMANTIC_DATA.envelope.letterTitle}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FFF0F4] border border-[#FADCE4] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#8B1E3F] fill-[#8B1E3F]" />
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-5 text-[#3A1B24] font-serif text-base sm:text-lg leading-relaxed">
              {ROMANTIC_DATA.envelope.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Declaration */}
            <div className="mt-10 pt-6 border-t border-[#F4E1E7] text-center">
              <p className="font-display font-black text-2xl sm:text-4xl text-[#8B1E3F] tracking-wide mb-6">
                {ROMANTIC_DATA.envelope.declaration}
              </p>

              {/* Send You A Kiss Action */}
              <div className="flex flex-col items-center">
                <button
                  onClick={handleSendKiss}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#D65D7A] to-[#8B1E3F] rounded-full shadow-romantic hover:shadow-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Smile className="w-4 h-4" />
                  <span className="font-bold">{ROMANTIC_DATA.envelope.kissButton}</span>
                </button>

                {kissSent && (
                  <p className="mt-4 font-display font-semibold text-lg sm:text-xl text-[#8B1E3F] animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {ROMANTIC_DATA.envelope.kissResponse}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
