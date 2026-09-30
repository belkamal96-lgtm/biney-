import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { LoveLetterSection } from './components/LoveLetterSection';
import { TenThingsSection } from './components/TenThingsSection';
import { MemoryGallerySection } from './components/MemoryGallerySection';
import { WhyIChooseYouSection } from './components/WhyIChooseYouSection';
import { LoveQuizSection } from './components/LoveQuizSection';
import { PromisesSection } from './components/PromisesSection';
import { SecretEnvelopeSection } from './components/SecretEnvelopeSection';
import { FinalScreenSection } from './components/FinalScreenSection';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { BackToTop } from './components/BackToTop';
import { APKDownloadModal } from './components/APKDownloadModal';
import { ROMANTIC_DATA } from './data/romanticContent';
import { Heart, Sparkles, X, Smartphone } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState<boolean>(false);
  const [showAPKModal, setShowAPKModal] = useState<boolean>(false);

  const handleEnter = () => {
    setHasEntered(true);
    setShowWelcomeToast(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      setShowWelcomeToast(false);
    }, 6000);
  };

  const handleRestart = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    const el = document.getElementById('surprise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F6] text-[#2D1822] selection:bg-[#E88CA6]/30 selection:text-[#5B1028]">
      {/* Floating Rose Petals and Hearts across site */}
      <FloatingParticles />

      {/* Floating Romantic Audio Player */}
      <AudioPlayer />

      {/* Back To Top Floating Action */}
      <BackToTop />

      {/* APK / App Installation Modal */}
      <APKDownloadModal
        isOpen={showAPKModal}
        onClose={() => setShowAPKModal(false)}
      />

      {!hasEntered ? (
        /* 1. THE MAGICAL WELCOME SCREEN */
        <WelcomeScreen 
          onEnter={handleEnter}
          onOpenAPKModal={() => setShowAPKModal(true)} 
        />
      ) : (
        /* THE MAIN ROMANTIC LOVE EXPERIENCE */
        <div className="animate-in fade-in duration-700">
          {/* Top Bar Navigation */}
          <Navbar 
            onOpenSurprise={handleOpenSurprise} 
            onOpenAPKModal={() => setShowAPKModal(true)}
          />

          {/* Welcome Toast Notification */}
          {showWelcomeToast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-auto max-w-sm sm:max-w-md px-4 py-3 bg-white/95 backdrop-blur-md border border-[#F3CBD5] rounded-full shadow-romantic flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
              <div className="w-8 h-8 rounded-full bg-[#FFF0F4] border border-[#FADCE4] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#8B1E3F] fill-[#8B1E3F]" />
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-[#541026] flex-1">
                {ROMANTIC_DATA.welcome.toastWelcome}
              </p>
              <button
                onClick={() => setShowWelcomeToast(false)}
                className="text-gray-400 hover:text-gray-700 p-1 text-xs"
                aria-label="Dismiss welcome message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Main Content Sections */}
          <main>
            {/* 2. MY LOVE LETTER */}
            <LoveLetterSection />

            {/* 3. 10 THINGS I LOVE ABOUT YOU */}
            <TenThingsSection />

            {/* 4. OUR MEMORY GALLERY */}
            <MemoryGallerySection />

            {/* 5. WHY I KEEP CHOOSING YOU */}
            <WhyIChooseYouSection />

            {/* 6. OUR LITTLE LOVE QUIZ */}
            <LoveQuizSection />

            {/* 7. MY PROMISES TO YOU */}
            <PromisesSection />

            {/* 8. THE SECRET ENVELOPE SURPRISE */}
            <SecretEnvelopeSection />

            {/* 9. THE FINAL ROMANTIC SCREEN */}
            <FinalScreenSection onRestart={handleRestart} />
          </main>
        </div>
      )}
    </div>
  );
}
