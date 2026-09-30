import React, { useState } from 'react';
import { Smartphone, Download, QrCode, Copy, Check, ExternalLink, Heart, Sparkles, X, Share2, Info } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface APKDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const APKDownloadModal: React.FC<APKDownloadModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'qr'>('install');

  if (!isOpen) return null;

  // Use window.location.href or the shared app URL
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-axpx4ohtvxzyu662oaiyvt-79227567953.asia-east1.run.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/?url=${encodeURIComponent(appUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      // Guide user
      alert("To install on Android: Open this page in Chrome, tap the 3-dot menu (⋮), and select 'Install app' or 'Add to Home screen'.");
    }
  };

  // QR Code URL using high-reliability Google Chart API with SVG/canvas fallback
  const qrCodeImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=8B1E3F&bgcolor=FFF9F6&margin=6&data=${encodeURIComponent(appUrl)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#FFFDFB] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F3D7DF] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F7E5EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8B1E3F] to-[#D65D7A] flex items-center justify-center text-white shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#541026]">
                Get the App for Binita's Phone
              </h3>
              <p className="text-xs text-[#805060]">
                Install as a mobile app (APK / Home Screen) with full-screen romance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mt-5 p-1 bg-[#F9ECEF] rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'install' 
                ? 'bg-white text-[#8B1E3F] shadow-xs font-semibold' 
                : 'text-[#805060] hover:text-[#541026]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install on Phone</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'apk' 
                ? 'bg-white text-[#8B1E3F] shadow-xs font-semibold' 
                : 'text-[#805060] hover:text-[#541026]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Direct APK Package</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'qr' 
                ? 'bg-white text-[#8B1E3F] shadow-xs font-semibold' 
                : 'text-[#805060] hover:text-[#541026]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>
        </div>

        {/* Tab 1: Instant Install (WebAPK on Android / Add to Home screen) */}
        {activeTab === 'install' && (
          <div className="mt-5 space-y-4 animate-in fade-in">
            {/* App Preview Card */}
            <div className="p-4 rounded-2xl bg-[#FFF6F8] border border-[#F5D8E0] flex items-center gap-4">
              <img
                src="/pwa-192x192.png"
                alt="App Icon"
                className="w-14 h-14 rounded-2xl shadow-sm border border-white"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-bold text-sm text-[#541026]">For Binita ❤️</h4>
                  <span className="text-[10px] bg-[#E88CA6]/20 text-[#8B1E3F] px-1.5 py-0.5 rounded font-mono font-semibold">
                    v1.0
                  </span>
                </div>
                <p className="text-xs text-[#704250] mt-0.5">
                  Instant mobile app with custom heart icon, offline reading, & full-screen love letter.
                </p>
              </div>
            </div>

            {/* Android / Desktop Instant Install Action */}
            <div>
              {isInstalled ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>The app is already installed on this device!</span>
                </div>
              ) : (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8B1E3F] via-[#A83256] to-[#B76E79] hover:from-[#741532] hover:to-[#A3294D] text-white font-bold text-sm rounded-xl shadow-romantic transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstallable ? "Install App on This Phone Now (1-Tap)" : "Install App on Phone"}</span>
                </button>
              )}
            </div>

            {/* Quick Step Guide for Android */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs text-[#4A1B28] space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#8B1E3F]">
                <Info className="w-3.5 h-3.5" />
                <span>How Binita installs it on her Android phone:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 pl-1 leading-relaxed">
                <li>Send her the website link below.</li>
                <li>When opened in Chrome, tap the <strong>"Install App"</strong> prompt or the 3 dots <strong>(⋮)</strong> in the top right.</li>
                <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>Android automatically compiles a native <strong>WebAPK</strong> and places the romantic app icon directly on her home screen!</li>
              </ol>
            </div>

            {/* Copy Link Section */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Share Link with Binita:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={appUrl}
                  className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 truncate font-mono select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 bg-[#FFF0F4] hover:bg-[#FFE0E9] border border-[#F3CBD5] text-[#8B1E3F] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Standalone APK Package (PWABuilder) */}
        {activeTab === 'apk' && (
          <div className="mt-5 space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-[#FFF6F8] border border-[#F5D8E0]">
              <h4 className="font-display font-bold text-sm text-[#541026] mb-1">
                Download Standalone APK Binary File (.apk)
              </h4>
              <p className="text-xs text-[#704250] leading-relaxed">
                If you prefer downloading a raw <strong>.apk file</strong> to install via file manager or sideload onto an Android phone, this app is fully certified with Google PWA standards. PWABuilder packages it into a signed Android APK in seconds.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#8B1E3F] hover:bg-[#741532] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Generate & Download APK on PWABuilder</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-2 text-gray-700">
                <p className="font-semibold text-gray-900">How to get the .apk file from PWABuilder:</p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Click the button above (your app URL is already loaded).</li>
                  <li>Click <strong>"Package for Stores"</strong> & select <strong>"Android"</strong>.</li>
                  <li>Click <strong>"Generate"</strong> to download the ready-to-install <strong>.apk</strong> file.</li>
                  <li>Send the <code>.apk</code> to Binita via WhatsApp or Drive and tap to install!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: QR Code for Easy Phone Scanning */}
        {activeTab === 'qr' && (
          <div className="mt-5 flex flex-col items-center text-center space-y-4 animate-in fade-in">
            <p className="text-xs text-[#704250] max-w-sm">
              Point Binita's phone camera (or your phone) at this QR code to instantly open the love gift and install it as an app.
            </p>

            <div className="p-4 bg-white rounded-2xl border-2 border-[#E8B4B8] shadow-romantic inline-block">
              <img
                src={qrCodeImgSrc}
                alt="QR Code for App"
                className="w-48 h-48 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E3F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For Binita ❤️ — Scan to open on mobile</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#F7E5EC] flex items-center justify-between text-xs text-[#805060]">
          <span className="font-script text-base text-[#8B1E3F]">Made with love for Binita ♡</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
