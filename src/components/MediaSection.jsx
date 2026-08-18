import React, { useState, useRef } from 'react';
import { Play, Image as ImageIcon, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Import Campaign Photos
import eventPhoto1 from '../assets/soham_community_event_1786409209158.jpg';
import eventPhoto2 from '../assets/soham_park_walkthrough_1786654746277.jpg';
import eventPhoto3 from '../assets/soham_town_hall_1786654769835.jpg';
import eventPhoto4 from '../assets/soham_patel_portrait_1786409194842.jpg';

export const MediaSection = () => {
  useScrollReveal();

  const [activeVideo, setActiveVideo] = useState(null);
  const videoScrollRef = useRef(null);

  const videos = [
    {
      id: "video1",
      title: "Soham Patel's Vision for Windsor Ward 9",
      category: "Campaign Vision",
      duration: "2:45",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto3,
      description: "Soham outlines key priorities for safer streets, modern storm drainage resilience, and transparent leadership at Windsor City Hall."
    },
    {
      id: "video2",
      title: "Neighborhood Infrastructure & Flood Mitigation",
      category: "Town Hall Highlight",
      duration: "3:12",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto2,
      description: "Discussion with Ward 9 homeowners on stormwater subsidy expansion and local road resurfacing plans."
    },
    {
      id: "video3",
      title: "Revitalizing Ward 9 Parks & Youth Spaces",
      category: "Community Walkthrough",
      duration: "1:58",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto1,
      description: "Touring local park amenities and discussing playground upgrades with active families in South Windsor."
    },
    {
      id: "video4",
      title: "Door-to-Door Resident Conversations",
      category: "Listening Tour",
      duration: "2:15",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto4,
      description: "Connecting with residents across Ward 9 neighborhoods to hear firsthand priorities for City Council."
    }
  ];

  const scrollVideos = (direction) => {
    if (videoScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      videoScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Organic Bento Grid Photo Blocks (Dates removed as requested)
  const photoBlocks = [
    {
      id: 1,
      title: "Ward 9 Resident Town Hall",
      location: "South Windsor Community Center",
      image: eventPhoto3,
      caption: "Answering resident questions and discussing local budget accountability ahead of City Council votes.",
      gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2", // 2x2 Feature Hero Block
      isHero: true
    },
    {
      id: 2,
      title: "Door-to-Door Listening Tour",
      location: "East Windsor Residential",
      image: eventPhoto4,
      caption: "Hearing directly from local homeowners about traffic calming.",
      gridSpan: "col-span-1 row-span-2", // 1x2 Tall Block
      isTall: true
    },
    {
      id: 3,
      title: "Neighborhood Coffee Meet",
      location: "Walker Road Area",
      image: eventPhoto1,
      caption: "Connecting with long-time Ward 9 seniors and families.",
      gridSpan: "col-span-1 row-span-1" // 1x1 Square Block
    },
    {
      id: 4,
      title: "Jackson Park Walkthrough",
      location: "Jackson Park Corridor",
      image: eventPhoto2,
      caption: "Discussing park amenities and accessible green space.",
      gridSpan: "col-span-1 row-span-1" // 1x1 Square Block
    },
    {
      id: 5,
      title: "Parks & Greenways Discussion",
      location: "South Windsor Greenways",
      image: eventPhoto2,
      caption: "Expanding tree canopy and year-round youth sports programming.",
      gridSpan: "col-span-1 sm:col-span-2 row-span-1" // 2x1 Wide Banner Block
    },
    {
      id: 6,
      title: "Active Families & Youth Engagement",
      location: "Roseland Area",
      image: eventPhoto1,
      caption: "Proactive community-focused neighborhood initiatives.",
      gridSpan: "col-span-1 sm:col-span-2 row-span-1" // 2x1 Wide Banner Block
    }
  ];

  return (
    <section id="media" className="scroll-mt-24 w-full space-y-12">
      
      {/* =================================================================
         SECTION HEADER & INTRO
         ================================================================= */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 space-y-2">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Community & Media
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed pt-1">
          Highlights from recent neighborhood town halls, community events, and video reels from Soham Patel’s campaign across Windsor Ward 9.
        </p>
      </div>

      {/* =================================================================
         1. FEATURED CAMPAIGN VIDEOS & REELS (Side-to-Side Scrolling Controls)
         ================================================================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000]">
            <Video className="w-4 h-4" />
            <span>Featured Videos & Reels</span>
          </div>

          {/* Side to Side Scroll Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scrollVideos('left')}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollVideos('right')}
              className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0A3E88] text-[#0A3E88] hover:bg-[#0A3E88] hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Cards Scroll Container */}
        <div 
          ref={videoScrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {videos.map((video) => (
            <div 
              key={video.id}
              className="w-[300px] sm:w-[360px] lg:w-[380px] shrink-0 snap-start rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between card-hover-lift group"
            >
              {/* Video Thumbnail Container */}
              <div className="relative aspect-video w-full bg-[#062654] overflow-hidden">
                {activeVideo === video.id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062654]/90 via-[#062654]/20 to-transparent" />

                    {/* Play Button Overlay (Red) */}
                    <button
                      onClick={() => setActiveVideo(video.id)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 cursor-pointer"
                      aria-label={`Play ${video.title}`}
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>

                    {/* Duration Badge */}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-bold tracking-wider">
                      {video.duration}
                    </span>

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#0A3E88] text-[11px] font-black tracking-wider uppercase shadow-sm">
                      {video.category}
                    </span>
                  </>
                )}
              </div>

              {/* Video Details */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-[#0A3E88] uppercase leading-snug group-hover:text-[#FF0000] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* =================================================================
         2. ORGANIC BENTO MASONRY PHOTO GRID (Date badges removed)
         ================================================================= */}
      <div className="space-y-6 pt-8 border-t border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000]">
          <ImageIcon className="w-4 h-4" />
          <span>Community Events & Photo Gallery</span>
        </div>

        {/* Organic Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[260px]">
          {photoBlocks.map((block) => (
            <div 
              key={block.id}
              className={`rounded-3xl bg-[#062654] border border-slate-200/80 shadow-md overflow-hidden relative group card-hover-lift flex flex-col justify-end ${block.gridSpan}`}
            >
              {/* Background Image */}
              <img 
                src={block.image} 
                alt={block.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#062654] via-[#062654]/40 to-transparent pointer-events-none" />

              {/* Content Overlay at Bottom */}
              <div className="relative z-10 p-5 sm:p-6 space-y-2 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FF0000]" />
                  <span className="truncate">{block.location}</span>
                </div>

                <h3 className={`font-black uppercase leading-snug tracking-tight text-white ${
                  block.isHero ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg'
                }`}>
                  {block.title}
                </h3>

                <p className={`text-slate-300 leading-relaxed line-clamp-2 ${
                  block.isHero ? 'text-xs sm:text-sm' : 'text-xs'
                }`}>
                  {block.caption}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
