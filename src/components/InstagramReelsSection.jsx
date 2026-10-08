import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { CAMPAIGN_SOCIAL_ITEMS } from '../data/socialMediaData';

// Individual embed card with snug fit (no forced min-height when loaded, padding restriction applied)
export const InstagramEmbedItem = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if iframe already exists and has finished rendering
    const checkIframe = () => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        setTimeout(() => setIsLoaded(true), 300);
        return true;
      }
      return false;
    };

    if (checkIframe()) return;

    // Observe DOM changes to catch when Instagram transforms the blockquote into an iframe
    const observer = new MutationObserver(() => {
      if (checkIframe()) {
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // Fallback safety timeout
    const timer = setTimeout(() => {
      setIsLoaded(true);
      observer.disconnect();
    }, 2800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [url]);

  return (
    <div 
      className={`w-full max-w-[340px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/90 bg-white relative flex flex-col items-center ${
        isLoaded ? 'h-auto p-1' : 'min-h-[500px] p-2'
      }`}
      style={{
        transform: 'translateZ(0)',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        isolation: 'isolate'
      }}
    >
      {/* 1. Loading Skeleton State (Only visible while loading) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-5 bg-gradient-to-b from-[#F8FAFC] via-[#EEF4FC]/80 to-[#F8FAFC] pointer-events-none select-none">
          {/* Top Header Placeholder */}
          <div className="w-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-xs animate-pulse">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 w-24 bg-slate-300/80 rounded-full animate-pulse" />
              <div className="h-2.5 w-16 bg-slate-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Center Animated Spinner */}
          <div className="flex flex-col items-center justify-center space-y-3 my-auto">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-3xl bg-white/95 border border-blue-100 shadow-md flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#0A3E88]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF0000]" />
              </span>
            </div>

            <div className="text-center space-y-1">
              <span className="text-sm font-black uppercase tracking-wider text-[#0A3E88] block">
                Loading Content
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Connecting to @vote.4soham...
              </span>
            </div>
          </div>

          {/* Bottom Shimmer Bar */}
          <div className="w-full space-y-2 pt-4 border-t border-slate-200/60">
            <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A3E88]/30 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Instagram</span>
              <span>@vote.4soham</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Instagram Embed Blockquote (Snug fit, no captions, no extra padding) */}
      <div 
        ref={containerRef}
        className={`w-full flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`${url}?utm_source=ig_embed&amp;utm_campaign=loading`}
          data-instgrm-version="14"
          style={{
            background: '#FFFFFF',
            border: 0,
            borderRadius: '16px',
            boxShadow: 'none',
            margin: '0 auto',
            maxWidth: '340px',
            minWidth: '280px',
            padding: 0,
            width: '100%'
          }}
        >
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <a
              href={`${url}?utm_source=ig_embed&amp;utm_campaign=loading`}
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '40px', marginRight: '14px', width: '40px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', marginBottom: '6px', width: '100px' }} />
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', width: '60px' }} />
                </div>
              </div>
              <div style={{ padding: '19% 0' }} />
              <div style={{ color: '#0A3E88', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontWeight: 600 }}>
                View on Instagram
              </div>
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

// Backward-compatible export
export const ReelEmbedItem = ({ reelUrl, title }) => (
  <InstagramEmbedItem url={reelUrl} title={title} />
);

export const InstagramReelsSection = () => {
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm && window.instgrm.Embeds) {
      processEmbeds();
    } else {
      let script = document.querySelector('script[src*="//www.instagram.com/embed.js"]');
      if (!script) {
        script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = processEmbeds;
        document.body.appendChild(script);
      }
    }

    const timer1 = setTimeout(processEmbeds, 200);
    const timer2 = setTimeout(processEmbeds, 800);
    const timer3 = setTimeout(processEmbeds, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Tightly packed Bento Grid (Masonry columns: 3 cols on desktop, 2 cols on tablet, 1 col on mobile) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3.5 sm:gap-4 lg:gap-4 max-w-6xl mx-auto [column-fill:_balance]">
        {CAMPAIGN_SOCIAL_ITEMS.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-3.5 sm:mb-4 lg:mb-4 flex justify-center">
            <InstagramEmbedItem url={item.url} />
          </div>
        ))}
      </div>
    </div>
  );
};
