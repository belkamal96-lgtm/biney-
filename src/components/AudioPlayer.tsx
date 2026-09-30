import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Settings, Upload } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string>('');
  const [activeSourceType, setActiveSourceType] = useState<'synth' | 'audio'>('synth');
  const [songName, setSongName] = useState<string>("Binita's Romantic Serenade");

  // Web Audio synth refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Romantic Pentatonic/Major Chord Progression frequencies (C major / A minor soft romantic lullaby)
  // Notes: C4, E4, G4, B4, C5, D5, E5, G5, A4, F4
  const romanticMelodyNotes = [
    261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63,
    220.00, 261.63, 329.63, 440.00, 392.00, 329.63, 261.63,
    349.23, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66,
    392.00, 493.88, 587.33, 493.88, 392.00, 329.63, 261.63
  ];

  const playNote = (freq: number, duration: number = 1.2) => {
    if (!audioCtxRef.current || !gainNodeRef.current || isMuted) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Soft warm sine mixed with a subtle harmonic triangle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Envelope: soft attack, long gentle decay like an electric piano / music box
      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.28, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext state handled gracefully
    }
  };

  const startSynthMelody = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gain = audioCtxRef.current.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
      gain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIdx = 0;
    isPlayingRef.current = true;

    const playNext = () => {
      if (!isPlayingRef.current) return;
      const freq = romanticMelodyNotes[noteIdx % romanticMelodyNotes.length];
      playNote(freq, 1.8);
      
      // Also occasionally play a soft bass foundation note
      if (noteIdx % 4 === 0) {
        playNote(freq / 2, 2.5);
      }

      noteIdx++;
      const nextDelay = noteIdx % 2 === 0 ? 550 : 700;
      synthTimerRef.current = window.setTimeout(playNext, nextDelay);
    };

    playNext();
  };

  const stopSynthMelody = () => {
    isPlayingRef.current = false;
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (activeSourceType === 'synth') {
        stopSynthMelody();
      } else if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (activeSourceType === 'synth') {
        startSynthMelody();
      } else if (audioElementRef.current) {
        audioElementRef.current.play().catch(() => {
          // If custom audio fails, seamlessly fall back to synth serenade
          setActiveSourceType('synth');
          startSynthMelody();
        });
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
    if (audioElementRef.current) {
      audioElementRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        newVol,
        audioCtxRef.current.currentTime
      );
    }
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVol;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setSongName(file.name.replace(/\.[^/.]+$/, ""));
      setActiveSourceType('audio');
      stopSynthMelody();
      setIsPlaying(false);
      setShowSettings(false);
    }
  };

  const handleUrlSubmit = (url: string) => {
    if (url.trim()) {
      setCustomAudioUrl(url.trim());
      setSongName("Special Melody for Binita");
      setActiveSourceType('audio');
      stopSynthMelody();
      setIsPlaying(false);
      setShowSettings(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Floating Audio Bar */}
      <div 
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 p-2 px-3.5 bg-white/90 backdrop-blur-md border border-[#F3D7DE] rounded-full shadow-romantic transition-all duration-300 hover:shadow-romantic-lg"
        role="region"
        aria-label="Romantic Music Player"
      >
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-[#8B1E3F] to-[#B76E79] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E3F]"
          title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
        </button>

        <div className="flex flex-col max-w-[140px] sm:max-w-[180px] overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B1E3F] truncate">
            <Music className={`w-3 h-3 text-[#B76E79] shrink-0 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span className="truncate">{songName}</span>
          </div>
          <span className="text-[10px] text-[#805060] font-normal truncate">
            {isPlaying ? 'Playing softly for Binita' : 'Click to play romantic music'}
          </span>
        </div>

        <button
          onClick={toggleMute}
          className="p-1.5 text-[#805060] hover:text-[#8B1E3F] transition-colors rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B1E3F]"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#C97A8E]" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-14 sm:w-16 accent-[#8B1E3F] h-1.5 bg-[#F8E5EB] rounded-lg cursor-pointer"
          title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          aria-label="Volume slider"
        />

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1.5 text-[#A06D7C] hover:text-[#8B1E3F] transition-colors rounded-full focus:outline-none"
          title="Change Music / Insert Song"
          aria-label="Music settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hidden Audio element for custom mp3 tracks */}
      {customAudioUrl && (
        <audio
          ref={audioElementRef}
          src={customAudioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Settings Modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-romantic-lg border border-[#F3D7DE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F7E7EC]">
              <h3 className="font-display font-semibold text-lg text-[#541026]">Romantic Music Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#704250] mt-3 mb-4 leading-relaxed">
              By default, a calming acoustic music-box serenade plays gently for Binita. You can also upload your special song or paste a link to an audio file.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveSourceType('synth');
                  setSongName("Binita's Romantic Serenade");
                  stopSynthMelody();
                  setIsPlaying(false);
                  setShowSettings(false);
                }}
                className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl text-left border flex items-center justify-between transition-colors ${
                  activeSourceType === 'synth' 
                    ? 'border-[#8B1E3F] bg-[#FDF0F3] text-[#8B1E3F]' 
                    : 'border-[#F1D6DF] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div>
                  <p className="font-semibold">Original Romantic Melody</p>
                  <p className="text-[11px] text-gray-500">Soothing music-box acoustic arpeggio</p>
                </div>
                {activeSourceType === 'synth' && <span className="text-xs font-bold">Active</span>}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl border border-dashed border-[#C97A8E] hover:bg-[#FDF6F8] text-[#8B1E3F] flex items-center justify-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload an MP3 Audio File</span>
              </button>

              <div className="pt-2">
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Or paste direct MP3 / Audio link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/our-song.mp3"
                    className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B1E3F]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUrlSubmit((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                      handleUrlSubmit(input);
                    }}
                    className="px-3 py-2 bg-[#8B1E3F] text-white text-xs font-medium rounded-lg hover:bg-[#701631] transition-colors"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-900"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
