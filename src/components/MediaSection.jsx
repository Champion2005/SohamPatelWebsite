import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
// import { ImageCarousel } from './ImageCarousel';
import { InstagramReelsSection } from './InstagramReelsSection';

export const MediaSection = () => {
  useScrollReveal();

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
          Highlights from recent neighborhood town halls, community events, and social media posts & reels from Soham Patel’s campaign across Windsor Ward 9.
        </p>
      </div>

      {/* =================================================================
         1. CAMPAIGN PHOTO CAROUSEL (Prepared - Hidden for now as requested)
         ================================================================= */}
      {/* 
      <div className="w-full">
        <ImageCarousel />
      </div>
      */}

      {/* =================================================================
         2. FEATURED CAMPAIGN SOCIAL FEED & REELS (Bento Box Grid)
         ================================================================= */}
      <div className="w-full">
        <InstagramReelsSection />
      </div>

    </section>
  );
};
