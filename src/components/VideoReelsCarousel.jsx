import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';

import eventPhoto1 from '../assets/soham_community_event_1786409209158.jpg';
import eventPhoto2 from '../assets/soham_park_walkthrough_1786654746277.jpg';
import eventPhoto3 from '../assets/soham_town_hall_1786654769835.jpg';
import eventPhoto4 from '../assets/soham_patel_portrait_1786409194842.jpg';

export const VideoReelsCarousel = ({ 
  title = "Campaign Reels & Video Highlights", 
  subtitle = "Watch recent updates, neighborhood tours, and town hall discussions with Soham Patel." 
}) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);

  const baseVideoReels = [
    {
      id: "reel1",
      title: "Soham Patel's Vision for Windsor Ward 9",
      category: "Campaign Vision",
      duration: "2:45",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto3,
      description: "Soham outlines key priorities for safer streets, modern storm drainage resilience, and transparent leadership at City Hall."
    },
    {
      id: "reel2",
      title: "Neighborhood Infrastructure & Flood Mitigation",
      category: "Town Hall Reel",
      duration: "3:12",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto2,
      description: "Discussion with Ward 9 homeowners on stormwater subsidy expansion and local road resurfacing plans."
    },
    {
      id: "reel3",
      title: "Revitalizing Ward 9 Parks & Youth Spaces",
      category: "Community Walk",
      duration: "1:58",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto1,
      description: "Touring local park amenities and discussing playground upgrades with active families in South Windsor."
    },
    {
      id: "reel4",
      title: "Door-to-Door Resident Conversations",
      category: "Listening Tour",
      duration: "2:15",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto4,
      description: "Connecting with residents across Ward 9 neighborhoods to hear firsthand priorities for City Council."
    }
  ];

  // Tripled list for infinite looping marquee
  const loopedReels = [...baseVideoReels, ...baseVideoReels, ...baseVideoReels];

  // Continuous infinite smooth scrolling ticker
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let isInteracting = false;
    const speed = 0.75; // Pixels per frame for smooth continuous scroll

    const step = () => {
      if (!isPaused && !activeVideo && el && !isInteracting) {
        el.scrollLeft += speed;

        // Halfway point of the duplicated content: seamless infinite loop
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
  }, [isPaused, activeVideo]);

  const scrollManual = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#FF0000] pl-4 sm:pl-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000]">
            <Video className="w-4 h-4" />
            <span>Campaign Reels</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0A3E88]">
            {title}
          </h2>
          <p className="text-slate-600 font-medium text-xs sm:text-sm max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Side-to-Side Manual Scroll Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => scrollManual('left')}
            className="w-11 h-11 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            aria-label="Scroll reels left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollManual('right')}
            className="w-11 h-11 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            aria-label="Scroll reels right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Continuous Infinite Looping Reels Track */}
      <div 
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar select-none cursor-grab active:cursor-grabbing"
      >
        {loopedReels.map((reel, idx) => (
          <div
            key={`${reel.id}-${idx}`}
            className="w-[290px] sm:w-[340px] md:w-[360px] shrink-0 rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between group relative"
          >
            {/* Reel Video Display / Thumbnail */}
            <div className="relative aspect-[16/10] w-full bg-[#062654] overflow-hidden">
              {activeVideo === `${reel.id}-${idx}` ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1`}
                  title={reel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img 
                    src={reel.thumbnail} 
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062654] via-[#062654]/30 to-transparent" />

                  {/* Play Button Overlay in Red */}
                  <button
                    onClick={() => setActiveVideo(`${reel.id}-${idx}`)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer z-10"
                    aria-label={`Play ${reel.title}`}
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-bold tracking-wider">
                    {reel.duration}
                  </span>

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#0A3E88] text-[10px] font-black tracking-wider uppercase shadow-md">
                    {reel.category}
                  </span>
                </>
              )}
            </div>

            {/* Reel Description */}
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-[#0A3E88] uppercase leading-snug group-hover:text-[#FF0000] transition-colors">
                  {reel.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {reel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-black uppercase text-[#FF0000]">
                <span>Watch Reel</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
