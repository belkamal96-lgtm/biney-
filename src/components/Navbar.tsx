import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenSurprise: () => void;
  onOpenAPKModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSurprise, onOpenAPKModal }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Letter", href: "#love-letter" },
    { label: "10 Things", href: "#ten-things" },
    { label: "Our Memories", href: "#memory-gallery" },
    { label: "Why You", href: "#why-choose-you" },
    { label: "Love Quiz", href: "#love-quiz" },
    { label: "Promises", href: "#promises" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FFF9F6]/90 backdrop-blur-md border-b border-[#F3D7DE] py-3 shadow-sm' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Brand wordmark in characterful display face */}
        <a 
          href="#" 
          className="group flex items-center gap-2 text-[#5B1028] transition-colors focus:outline-none"
        >
          <Heart className="w-5 h-5 text-[#8B1E3F] fill-[#8B1E3F]/20 group-hover:fill-[#8B1E3F] group-hover:scale-110 transition-all duration-300" />
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#5B1028]">
            For Binita <span className="font-script text-2xl text-[#8B1E3F] font-normal">♡</span>
          </span>
        </a>

        {/* Zone 2: Clean unboxed text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#7A4B5A]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#8B1E3F] transition-colors relative py-1 focus:outline-none hover:underline underline-offset-4 decoration-[#E88CA6]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAPKModal}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-[#8B1E3F] bg-[#FFF0F4] hover:bg-[#FFE5EC] border border-[#F3CAD6] rounded-full hover:shadow-xs transition-all whitespace-nowrap focus:outline-none cursor-pointer"
            title="Download APK / Install App on Phone"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#8B1E3F]" />
            <span className="hidden sm:inline">Get App / APK</span>
            <span className="sm:hidden">App</span>
          </button>

          <button
            onClick={onOpenSurprise}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#8B1E3F] to-[#B76E79] rounded-full hover:shadow-romantic hover:scale-102 active:scale-98 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E3F] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise 💌</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5B1028] hover:bg-[#FCEBED] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F6]/98 border-b border-[#F3D7DE] px-5 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-sm font-medium py-2 px-3 text-[#5B1028] hover:bg-[#FCEBED] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#F5DFE5] mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAPKModal();
                }}
                className="w-full text-left text-sm font-semibold py-2 px-3 text-[#8B1E3F] hover:bg-[#FCEBED] rounded-lg transition-colors flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Download APK / Install on Phone</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

