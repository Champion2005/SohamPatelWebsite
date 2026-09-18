import React from 'react';
import { Image as ImageIcon, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { InstagramReelsSection } from './InstagramReelsSection';

// Import Campaign Photos
import eventPhoto1 from '../assets/soham_community_event_1786409209158.jpg';
import eventPhoto2 from '../assets/soham_park_walkthrough_1786654746277.jpg';
import eventPhoto3 from '../assets/soham_town_hall_1786654769835.jpg';
import eventPhoto4 from '../assets/soham_patel_portrait_1786409194842.jpg';

export const MediaSection = () => {
  useScrollReveal();

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
          Highlights from recent neighborhood town halls, community events, and reels from Soham Patel’s campaign across Windsor Ward 9.
        </p>
      </div>

      {/* =================================================================
         1. FEATURED CAMPAIGN REELS (Vertical aspect ratio Instagram Reels)
         ================================================================= */}
      <div className="w-full">
        <InstagramReelsSection />
      </div>

      {/* =================================================================
         2. COMMUNITY EVENTS & PHOTO GALLERY (Hidden for now until real images are ready)
         ================================================================= */}
      {/* 
      <div className="space-y-6 pt-8 border-t border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000]">
          <ImageIcon className="w-4 h-4" />
          <span>Community Events & Photo Gallery</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[260px]">
          {photoBlocks.map((block) => (
            <div 
              key={block.id}
              className={`rounded-3xl bg-[#062654] border border-slate-200/80 shadow-md overflow-hidden relative group flex flex-col justify-end ${block.gridSpan}`}
            >
              <img 
                src={block.image} 
                alt={block.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062654] via-[#062654]/40 to-transparent pointer-events-none" />
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
      */}

    </section>
  );
};
