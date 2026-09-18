import React, { useEffect } from 'react';

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

    const timer1 = setTimeout(processEmbeds, 250);
    const timer2 = setTimeout(processEmbeds, 1000);
    const timer3 = setTimeout(processEmbeds, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full">
      {/* 2 Vertical Reels with identical width & height without captions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto justify-items-center items-start">
        
        {/* Reel 1 */}
        <div className="w-full max-w-[400px] flex justify-center">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/Dc4sngSD1BY/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              boxShadow: '0 10px 25px -5px rgba(10, 62, 136, 0.08), 0 8px 10px -6px rgba(10, 62, 136, 0.04)',
              margin: '0 auto',
              maxWidth: '420px',
              minWidth: '320px',
              padding: 0,
              width: '100%'
            }}
          >
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <a
                href="https://www.instagram.com/reel/Dc4sngSD1BY/?utm_source=ig_embed&amp;utm_campaign=loading"
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
                  View Reel on Instagram
                </div>
              </a>
            </div>
          </blockquote>
        </div>

        {/* Reel 2 */}
        <div className="w-full max-w-[400px] flex justify-center">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/reel/DdZbkXWgWNt/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              boxShadow: '0 10px 25px -5px rgba(10, 62, 136, 0.08), 0 8px 10px -6px rgba(10, 62, 136, 0.04)',
              margin: '0 auto',
              maxWidth: '420px',
              minWidth: '320px',
              padding: 0,
              width: '100%'
            }}
          >
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <a
                href="https://www.instagram.com/reel/DdZbkXWgWNt/?utm_source=ig_embed&amp;utm_campaign=loading"
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
                  View Reel on Instagram
                </div>
              </a>
            </div>
          </blockquote>
        </div>

      </div>
    </div>
  );
};
