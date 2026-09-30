import React, { useState } from 'react';
import { Heart, Sparkles, Shuffle, Grid, CheckCircle2 } from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

export const WhyIChooseYouSection: React.FC = () => {
  const reasons = ROMANTIC_DATA.whyIChooseYou.reasons;
  
  // Track visited order to prevent endless immediate repeats
  const [visitedIndices, setVisitedIndices] = useState<number[]>([0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);

  const handleNextReason = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let nextIndex: number;
    // Find unvisited indices
    const unvisited = reasons
      .map((_, idx) => idx)
      .filter((idx) => !visitedIndices.includes(idx));

    if (unvisited.length > 0) {
      // Pick random from unvisited
      nextIndex = unvisited[Math.floor(Math.random() * unvisited.length)];
      setVisitedIndices((prev) => [...prev, nextIndex]);
    } else {
      // All have been viewed at least once! Pick another that's not current
      const others = reasons.map((_, idx) => idx).filter((idx) => idx !== currentIndex);
      nextIndex = others[Math.floor(Math.random() * others.length)];
      setVisitedIndices([nextIndex]); // Reset cycle
    }

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 280);
  };

  return (
    <section id="why-choose-you" className="py-20 sm:py-28 px-4 relative bg-gradient-to-b from-[#FFF9F6] via-[#FFF2F5] to-[#FFF9F6] overflow-hidden">
      {/* Background soft ambient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#FFE0E9]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#B76E79]" />
            <span>Forever Choosing You</span>
            <span aria-hidden="true">·</span>
            <span>Only Binita</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] mb-3 text-balance">
            {ROMANTIC_DATA.whyIChooseYou.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#7C4857] font-normal leading-relaxed">
            {ROMANTIC_DATA.whyIChooseYou.subtitle}
          </p>
        </div>

        {/* Central Interactive Heart Display */}
        <div className="relative flex flex-col items-center">
          {/* Glowing Center Heart */}
          <div className="relative mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#FF9EAF] to-[#E88CA6] rounded-full blur-2xl opacity-40 animate-pulse" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#8B1E3F] via-[#A83256] to-[#D65D7A] border-4 border-[#FFF0F4] shadow-glow flex flex-col items-center justify-center text-white select-none">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 fill-white text-white animate-pulse" />
              <span className="font-script text-xs sm:text-sm text-[#FFDDE4] -mt-1 font-semibold">
                Binita
              </span>
            </div>
            
            {/* Shimmer badge */}
            <div className="absolute -bottom-2 bg-white px-3 py-0.5 rounded-full border border-[#F3CBD5] shadow-xs text-[11px] font-semibold text-[#8B1E3F]">
              Reason {currentIndex + 1} of {reasons.length}
            </div>
          </div>

          {/* Reason Showcase Card */}
          <div className="w-full max-w-xl min-h-[160px] flex items-center justify-center">
            <div
              className={`w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#F1D5DD] shadow-romantic-lg text-center transition-all duration-300 transform ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-[#B76E79] mb-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">
                  A Promise In My Heart
                </span>
                <Sparkles className="w-4 h-4" />
              </div>

              <p className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-[#541026] leading-snug">
                "{reasons[currentIndex]}"
              </p>
            </div>
          </div>

          {/* Action Button: Give Me A Reason */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleNextReason}
              disabled={isAnimating}
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#8B1E3F] via-[#A62B50] to-[#B76E79] rounded-full shadow-glow hover:shadow-romantic-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-[#FFCCD5]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF9EAF]/50 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
              <span className="font-bold tracking-wide">
                {ROMANTIC_DATA.whyIChooseYou.cta}
              </span>
              <Shuffle className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="inline-flex items-center gap-1.5 text-xs text-[#8B1E3F] hover:text-[#541026] font-medium py-2 px-3 hover:bg-[#FFE8EF] rounded-lg transition-colors focus:outline-none"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{showAllGrid ? "Hide All Reasons" : "View All 10 Reasons"}</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center gap-1.5">
            {reasons.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  if (!visitedIndices.includes(idx)) {
                    setVisitedIndices([...visitedIndices, idx]);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-[#8B1E3F]'
                    : visitedIndices.includes(idx)
                    ? 'bg-[#E88CA6]'
                    : 'bg-[#F3CAD6]'
                }`}
                title={`Reason ${idx + 1}`}
                aria-label={`Jump to reason ${idx + 1}`}
              />
            ))}
          </div>

          {/* All 10 Reasons Expandable View */}
          {showAllGrid && (
            <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: document.getElementById('why-choose-you')?.offsetTop, behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                    idx === currentIndex
                      ? 'bg-white border-[#8B1E3F] shadow-romantic'
                      : 'bg-white/70 hover:bg-white border-[#F3D7DF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold text-[#B76E79]">
                      #{idx + 1}
                    </span>
                    {visitedIndices.includes(idx) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E3F]" />
                    )}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A1B28] font-medium">
                    "{reason}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
