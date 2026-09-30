import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, X, ChevronLeft, ChevronRight, Edit3, Check, RotateCcw, Maximize2 } from 'lucide-react';
import { ROMANTIC_DATA, MemoryItem } from '../data/romanticContent';

const STORAGE_KEY = 'binita_love_gallery_photos';

export const MemoryGallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return ROMANTIC_DATA.gallery.defaultPhotos;
  });

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editedCaption, setEditedCaption] = useState<string>('');
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // Storage quota or disabled
    }
  }, [photos]);

  const handleTriggerUpload = (id: string) => {
    setUploadTargetId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        setPhotos((prev) =>
          prev.map((item) =>
            item.id === uploadTargetId ? { ...item, url: base64Url } : item
          )
        );
        setUploadTargetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        const newPhoto: MemoryItem = {
          id: `custom-${Date.now()}`,
          url: base64Url,
          caption: "A new cherished memory with Binita ❤️",
          note: "Added with love",
        };
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEditCaption = (photo: MemoryItem) => {
    setEditingPhotoId(photo.id);
    setEditedCaption(photo.caption);
  };

  const handleSaveCaption = (id: string) => {
    setPhotos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, caption: editedCaption.trim() || item.caption } : item
      )
    );
    setEditingPhotoId(null);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset gallery photos and captions to default romantic placeholders?")) {
      setPhotos(ROMANTIC_DATA.gallery.defaultPhotos);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  const featuredPhoto = photos.find((p) => p.isFeatured) || photos[0];
  const gridPhotos = photos.filter((p) => p.id !== featuredPhoto?.id);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, photos.length]);

  return (
    <section id="memory-gallery" className="py-20 sm:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <span>Special Keepsakes</span>
            <span aria-hidden="true">·</span>
            <span>Cherished Snapshots</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] mb-3 text-balance">
            {ROMANTIC_DATA.gallery.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#7C4857] font-normal leading-relaxed">
            {ROMANTIC_DATA.gallery.subtitle}
          </p>

          {/* Quick Boyfriend action bar to upload real photos easily */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#8B1E3F] bg-[#FFF2F5] hover:bg-[#FFE8EF] border border-[#F3CAD6] rounded-full cursor-pointer transition-colors shadow-xs">
              <Camera className="w-3.5 h-3.5" />
              <span>+ Add a Real Photo of Us</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAddNewPhoto}
                className="hidden"
              />
            </label>

            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[#996574] hover:text-[#8B1E3F] transition-colors focus:outline-none"
              title="Reset gallery photos to original"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Photos</span>
            </button>
          </div>
        </div>

        {/* Featured Photo Showcase */}
        {featuredPhoto && (
          <div className="mb-10">
            <div className="relative group bg-white rounded-3xl p-3 sm:p-5 border border-[#F2D7DF] shadow-romantic overflow-hidden">
              <div 
                className="relative aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden cursor-pointer bg-[#FBEFF2]"
                onClick={() => setActivePhotoIndex(photos.findIndex((p) => p.id === featuredPhoto.id))}
              >
                <img
                  src={featuredPhoto.url}
                  alt={featuredPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFD1DC] mb-1">
                    Featured Moment
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm mb-2">
                    {featuredPhoto.caption}
                  </h3>
                  {featuredPhoto.note && (
                    <p className="font-cormorant italic text-sm sm:text-base text-[#FCE4EC]">
                      {featuredPhoto.note}
                    </p>
                  )}
                </div>

                {/* Fullscreen icon indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Photo Action Footer */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#7A4B5A]">
                <button
                  onClick={() => handleTriggerUpload(featuredPhoto.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF2F5] hover:bg-[#FFE6ED] text-[#8B1E3F] rounded-lg transition-colors font-medium border border-[#F3CBD5]"
                >
                  <Upload className="w-3 h-3" />
                  <span>Replace With Real Photo</span>
                </button>

                <button
                  onClick={() => handleStartEditCaption(featuredPhoto)}
                  className="inline-flex items-center gap-1 text-[#8B1E3F] hover:underline"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Caption</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridPhotos.map((photo) => {
            const originalIndex = photos.findIndex((p) => p.id === photo.id);
            const isEditing = editingPhotoId === photo.id;

            return (
              <div
                key={photo.id}
                className="group relative bg-white rounded-2xl p-3 border border-[#F2D7DF] shadow-sm hover:shadow-romantic transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer bg-[#FBEFF2] mb-3"
                    onClick={() => setActivePhotoIndex(originalIndex)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 rounded-full bg-white/90 text-[#8B1E3F] shadow-sm">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  {isEditing ? (
                    <div className="space-y-2 mb-2">
                      <input
                        type="text"
                        value={editedCaption}
                        onChange={(e) => setEditedCaption(e.target.value)}
                        className="w-full text-xs p-2 border border-[#E88CA6] rounded-md focus:outline-none"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleSaveCaption(photo.id)}
                          className="px-2 py-1 bg-[#8B1E3F] text-white text-[11px] rounded"
                        >
                          <Check className="w-3 h-3 inline mr-1" /> Save
                        </button>
                        <button
                          onClick={() => setEditingPhotoId(null)}
                          className="px-2 py-1 text-gray-500 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="font-serif italic text-sm text-[#4A1B28] font-medium leading-snug">
                        "{photo.caption}"
                      </p>
                      {photo.note && (
                        <p className="text-[11px] text-[#A66F80] mt-1 truncate">
                          {photo.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Controls */}
                <div className="mt-3 pt-2 border-t border-[#F8E5EB] flex items-center justify-between text-[11px] text-[#805060]">
                  <button
                    onClick={() => handleTriggerUpload(photo.id)}
                    className="hover:text-[#8B1E3F] inline-flex items-center gap-1 font-medium transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload photo</span>
                  </button>
                  <button
                    onClick={() => handleStartEditCaption(photo)}
                    className="hover:text-[#8B1E3F] inline-flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Caption</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden file input for card photo replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Photo viewer container */}
          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            
            <div className="mt-4 text-center text-white max-w-xl">
              <p className="font-serif italic text-lg sm:text-xl text-[#FFCCD5]">
                "{photos[activePhotoIndex].caption}"
              </p>
              {photos[activePhotoIndex].note && (
                <p className="text-xs text-white/70 mt-1">
                  {photos[activePhotoIndex].note}
                </p>
              )}
              <span className="text-[11px] text-white/40 mt-2 block font-mono">
                {activePhotoIndex + 1} of {photos.length}
              </span>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
