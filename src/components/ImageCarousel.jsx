import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import eventPhoto1 from '../assets/soham_community_event_1786409209158.jpg';
import eventPhoto2 from '../assets/soham_park_walkthrough_1786654746277.jpg';
import eventPhoto3 from '../assets/soham_town_hall_1786654769835.jpg';
import eventPhoto4 from '../assets/soham_patel_portrait_1786409194842.jpg';
import aboutPhoto from '../assets/soham_about_me.jpeg';
import platformSpaces from '../assets/platform_community_spaces.jpg';
import platformStreets from '../assets/platform_safe_streets.jpg';
import platformConcession from '../assets/platform_6th_concession.jpg';

export const ImageCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);

  const photos = [
    { id: "photo-1", image: eventPhoto3 },
    { id: "photo-2", image: eventPhoto4 },
    { id: "photo-3", image: eventPhoto2 },
    { id: "photo-4", image: eventPhoto1 },
    { id: "photo-5", image: aboutPhoto },
    { id: "photo-6", image: platformSpaces },
    { id: "photo-7", image: platformStreets },
    { id: "photo-8", image: platformConcession }
  ];

  // Tripled list for infinite looping marquee
  const loopedPhotos = [...photos, ...photos, ...photos];

  // Continuous infinite smooth scrolling ticker
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let isInteracting = false;
    const speed = 0.75; // Pixels per frame

    const step = () => {
      if (!isPaused && !selectedPhoto && el && !isInteracting) {
        el.scrollLeft += speed;

        // Halfway point of the duplicated content: seamless loop
        const maxLoopPoint = (el.scrollWidth - el.clientWidth) * 0.5;
        if (el.scrollLeft >= maxLoopPoint) {
          el.scrollLeft = 1;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, selectedPhoto]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const scrollManual = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full relative group/carousel">
      
      {/* Side-to-Side Manual Scroll Buttons (Floating) */}
      <div className="flex justify-end gap-2 mb-3">
        <button
          onClick={() => scrollManual('left')}
          className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollManual('right')}
          className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Track with Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-20 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />

        {/* Right Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 z-20 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />

        {/* Continuous Infinite Looping Photos Track (Images only - No text, no badges) */}
        <div 
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar select-none cursor-grab active:cursor-grabbing px-2"
        >
          {loopedPhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setSelectedPhoto(photo)}
              className="w-[280px] sm:w-[330px] md:w-[360px] aspect-[4/3] shrink-0 rounded-3xl bg-[#062654] border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer group"
            >
              <img 
                src={photo.image} 
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Pure Image Only) */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img 
                src={selectedPhoto.image} 
                alt=""
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
