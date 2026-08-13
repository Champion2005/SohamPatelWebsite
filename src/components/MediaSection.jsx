import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Import Campaign Photos
import eventPhoto1 from '../assets/soham_community_event_1786409209158.jpg';
import eventPhoto2 from '../assets/soham_park_walkthrough_1786654746277.jpg';
import eventPhoto3 from '../assets/soham_town_hall_1786654769835.jpg';
import eventPhoto4 from '../assets/soham_patel_portrait_1786409194842.jpg';

export const MediaSection = () => {
  useScrollReveal();

  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: "video1",
      title: "Soham Patel's Vision for Windsor Ward 9",
      category: "Campaign Vision",
      duration: "2:45",
      date: "August 2026",
      youtubeId: "dQw4w9WgXcQ", // Placeholder video ID
      thumbnail: eventPhoto3,
      description: "Soham outlines key priorities for safer streets, modern storm drainage resilience, and transparent leadership at Windsor City Hall."
    },
    {
      id: "video2",
      title: "Neighborhood Infrastructure & Flood Mitigation",
      category: "Town Hall Highlight",
      duration: "3:12",
      date: "July 2026",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto2,
      description: "Discussion with Ward 9 homeowners on stormwater subsidy expansion and local road resurfacing plans."
    },
    {
      id: "video3",
      title: "Revitalizing Ward 9 Parks & Youth Spaces",
      category: "Community Walkthrough",
      duration: "1:58",
      date: "June 2026",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: eventPhoto1,
      description: "Touring local park amenities and discussing playground upgrades with active families in South Windsor."
    }
  ];

  const photos = [
    {
      id: 1,
      title: "Community Meet & Greet",
      location: "South Windsor Neighborhood",
      date: "August 2026",
      image: eventPhoto1,
      caption: "Connecting with long-time Ward 9 residents to discuss neighborhood safety and city services."
    },
    {
      id: 2,
      title: "Park Walkthrough & Family Discussion",
      location: "Jackson Park Corridor",
      date: "July 2026",
      image: eventPhoto2,
      caption: "Listening to parents and seniors regarding accessible walkways and playground improvements."
    },
    {
      id: 3,
      title: "Ward 9 Resident Town Hall",
      location: "Community Center",
      date: "July 2026",
      image: eventPhoto3,
      caption: "Answering resident questions and discussing local budget accountability ahead of City Council decisions."
    },
    {
      id: 4,
      title: "Door-to-Door Listening Tour",
      location: "East Windsor Residential",
      date: "June 2026",
      image: eventPhoto4,
      caption: "Hearing directly from local homeowners about traffic calming and basement flood prevention."
    }
  ];

  return (
    <section id="media" className="scroll-mt-24 w-full space-y-12">
      
      {/* =================================================================
         SECTION HEADER & INTRO
         ================================================================= */}
      <div className="border-l-4 border-[#059669] pl-4 sm:pl-6 space-y-2 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0F172A]">
          Community & Media
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed pt-1">
          Highlights from recent neighborhood town halls, community events, and video updates from Soham Patel’s campaign across Windsor Ward 9.
        </p>
      </div>

      {/* =================================================================
         1. FEATURED CAMPAIGN VIDEOS & REELS
         ================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#059669] reveal-up">
          <Video className="w-4 h-4" />
          <span>Featured Videos & Reels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between reveal-zoom card-hover-lift group"
            >
              {/* Video Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setActiveVideo(video.id)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#059669] hover:bg-[#047857] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 cursor-pointer"
                      aria-label={`Play ${video.title}`}
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>

                    {/* Duration Badge */}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-bold tracking-wider">
                      {video.duration}
                    </span>

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0F172A] text-[11px] font-extrabold tracking-wider uppercase shadow-sm">
                      {video.category}
                    </span>
                  </>
                )}
              </div>

              {/* Video Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#059669]" />
                    <span>{video.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#059669] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* =================================================================
         2. COMMUNITY EVENTS PHOTO GALLERY
         ================================================================= */}
      <div className="space-y-6 pt-6 border-t border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#059669] reveal-up">
          <ImageIcon className="w-4 h-4" />
          <span>Community Events & Action</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col reveal-zoom card-hover-lift group"
            >
              {/* Image Box */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                {/* Location Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
              </div>

              {/* Photo Caption Box */}
              <div className="p-4 space-y-1.5 flex-1 bg-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                  {photo.date}
                </span>
                <h4 className="text-sm font-bold text-[#0F172A] leading-snug">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                  {photo.caption}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
