import React, { useState } from 'react';
import { 
  Sparkles, Eye, Heart, Sun, Music2, Gem, Flame, Coffee, Star, Infinity as InfinityIcon, Check 
} from 'lucide-react';
import { ROMANTIC_DATA } from '../data/romanticContent';

export const TenThingsSection: React.FC = () => {
  const [lovedCards, setLovedCards] = useState<Record<string, boolean>>({});

  const toggleLoveCard = (num: string) => {
    setLovedCards((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#8B1E3F]" };
    switch (iconName) {
      case 'sparkles': return <Sparkles {...props} />;
      case 'eye': return <Eye {...props} />;
      case 'heart': return <Heart {...props} className="w-5 h-5 text-[#8B1E3F] fill-[#8B1E3F]/30" />;
      case 'sun': return <Sun {...props} />;
      case 'music': return <Music2 {...props} />;
      case 'gem': return <Gem {...props} />;
      case 'flame': return <Flame {...props} />;
      case 'coffee': return <Coffee {...props} />;
      case 'star': return <Star {...props} />;
      case 'infinity': return <InfinityIcon {...props} />;
      default: return <Heart {...props} />;
    }
  };

  return (
    <section id="ten-things" className="py-20 sm:py-28 px-4 relative bg-[#FFF7F9] border-y border-[#F7E1E7]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <span>Treasured Details</span>
            <span aria-hidden="true">·</span>
            <span>Every Reason To Love Binita</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] mb-3 text-balance">
            {ROMANTIC_DATA.tenThings.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#7C4857] font-normal leading-relaxed">
            {ROMANTIC_DATA.tenThings.subtitle}
          </p>
        </div>

        {/* Elegant Grid of 10 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROMANTIC_DATA.tenThings.items.map((item, index) => {
            const isLoved = !!lovedCards[item.number];
            return (
              <div
                key={item.number}
                className={`group relative bg-white/95 rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                  isLoved 
                    ? 'border-[#8B1E3F] shadow-glow bg-[#FFFDFC]' 
                    : 'border-[#F2D7DF] shadow-sm hover:shadow-romantic hover:border-[#E8A5B6]'
                } ${index === 9 ? 'sm:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto w-full' : ''}`}
              >
                <div>
                  {/* Top card row: Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#B76E79]/80">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FFF0F4] border border-[#FADCE4] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(item.icon)}
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-display text-lg font-bold text-[#541026] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Card Quote */}
                  <p className="font-serif italic text-sm sm:text-base text-[#4F2A36] leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Interactive heart bookmark */}
                <div className="pt-3 border-t border-[#F8E5EB] flex items-center justify-between">
                  <span className="text-[11px] text-[#A66F80]">
                    {isLoved ? "Loved by Binita ❤️" : "Tap to cherish"}
                  </span>
                  <button
                    onClick={() => toggleLoveCard(item.number)}
                    className={`p-1.5 rounded-full transition-all focus:outline-none ${
                      isLoved 
                        ? 'bg-[#8B1E3F] text-white scale-110' 
                        : 'text-[#C97A8E] hover:bg-[#FFF0F4] hover:text-[#8B1E3F]'
                    }`}
                    aria-label={`Mark ${item.title} as cherished`}
                  >
                    <Heart className={`w-4 h-4 ${isLoved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
