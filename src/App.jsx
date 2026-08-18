import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PlatformSection } from './components/PlatformSection';
import { VideoReelsCarousel } from './components/VideoReelsCarousel';
import { MediaSection } from './components/MediaSection';
import { Ward9MapSection } from './components/Ward9MapSection';
import { ContactSection } from './components/ContactSection';
import { LawnSignModal } from './components/LawnSignModal';
import { VolunteerModal } from './components/VolunteerModal';
import { InstagramIcon, FacebookIcon, TwitterIcon, PhoneCallIcon } from './components/SocialIcons';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // State-based Page Navigation: 'home' | 'about' | 'media' | 'ward9' | 'contact'
  const [activeSection, setActiveSection] = useState('home');
  const [isLawnSignOpen, setIsLawnSignOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  useScrollReveal(activeSection);

  const handleNavigate = (pageId, targetElementId = null) => {
    setActiveSection(pageId);
    
    // Instant reliable scroll to top of page on menu click
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (targetElementId) {
      setTimeout(() => {
        const elem = document.getElementById(targetElementId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#0A3E88] bg-[#F8FAFC] selection:bg-[#FF0000] selection:text-white overflow-x-hidden w-full">
      
      {/* =================================================================
         TOP STICKY NAVBAR (Solid Blue #0A3E88, White Text)
         ================================================================= */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={(id) => handleNavigate(id)} 
      />

      {/* =================================================================
         PAGE CONTENT VIEWS (State-Based Navigation)
         ================================================================= */}
      <main className="flex-1 w-full overflow-x-hidden">
        
        {/* 1. HOME PAGE VIEW: Hero -> Platform -> Video Reels Carousel -> Ward 9 Map */}
        {activeSection === 'home' && (
          <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-24">
            
            {/* Hero Banner */}
            <div 
              className="h-[calc(100dvh-5rem)] min-h-[580px] flex flex-col justify-between overflow-hidden w-full" 
              style={{ backgroundColor: '#EEF4FC' }}
            >
              <HeroSection 
                onLawnSignClick={() => setIsLawnSignOpen(true)}
                onVolunteerClick={() => setIsVolunteerOpen(true)}
              />
            </div>

            {/* Platform Priorities */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <PlatformSection 
                onLawnSignClick={() => setIsLawnSignOpen(true)}
                onVolunteerClick={() => setIsVolunteerOpen(true)}
              />
            </div>

            {/* Auto-Shuffling Video Reels Carousel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <VideoReelsCarousel />
            </div>

            {/* Interactive Ward 9 Map at Bottom of Home Page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Ward9MapSection 
                onLawnSignClick={() => setIsLawnSignOpen(true)}
                onVolunteerClick={() => setIsVolunteerOpen(true)}
              />
            </div>

          </div>
        )}

        {/* 2. ABOUT PAGE VIEW */}
        {activeSection === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <AboutSection 
              onNavigateToPlatform={() => handleNavigate('home', 'platform')}
            />
          </div>
        )}

        {/* 3. MEDIA & COMMUNITY PAGE VIEW */}
        {activeSection === 'media' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <MediaSection />
          </div>
        )}

        {/* 4. WARD 9 MAP PAGE VIEW */}
        {activeSection === 'ward9' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <Ward9MapSection 
              onLawnSignClick={() => setIsLawnSignOpen(true)}
              onVolunteerClick={() => setIsVolunteerOpen(true)}
            />
          </div>
        )}

        {/* 5. CONTACT PAGE VIEW */}
        {activeSection === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <ContactSection />
          </div>
        )}

        {/* Call to Action Banner (Shown on inner pages) */}
        {activeSection !== 'home' && activeSection !== 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 w-full">
            <section className="rounded-3xl bg-gradient-to-br from-[#0A3E88] via-[#062654] to-[#041B3D] text-white p-8 sm:p-12 lg:p-16 border border-blue-800/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 reveal-zoom">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF0000] bg-white px-3 py-1 rounded-full inline-block">
                  Join The Movement
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  Ready to Shape the Future of Ward 9?
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Every conversation, lawn sign, and volunteer hour brings positive change to our neighborhood. Get involved today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setIsLawnSignOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Request a Lawn Sign
                </button>
                <button
                  onClick={() => setIsVolunteerOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-[#0A3E88] hover:bg-slate-100 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Volunteer
                </button>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* =================================================================
         SITE FOOTER (Larger Soham Patel Branding & Exact Legal Disclosure)
         ================================================================= */}
      <footer className="bg-[#062654] text-slate-300 text-xs border-t border-blue-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-900/80">
            
            {/* Larger Brand Name */}
            <div 
              className="cursor-pointer text-center md:text-left group"
              onClick={() => handleNavigate('home')}
            >
              <span className="font-black text-white text-3xl sm:text-4xl uppercase tracking-wider block group-hover:text-[#FF0000] transition-colors">
                SOHAM PATEL
              </span>
              <span className="text-xs sm:text-sm text-blue-200 uppercase tracking-widest font-semibold block pt-1">
                Candidate for Windsor Ward 9 City Councillor
              </span>
            </div>

            {/* Quick Links (Names removed: Home, About, Media, Ward 9, Contact) */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
              <button 
                onClick={() => handleNavigate('home')} 
                className={`hover:text-[#FF0000] transition-colors cursor-pointer ${activeSection === 'home' ? 'text-[#FF0000]' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigate('about')} 
                className={`hover:text-[#FF0000] transition-colors cursor-pointer ${activeSection === 'about' ? 'text-[#FF0000]' : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigate('media')} 
                className={`hover:text-[#FF0000] transition-colors cursor-pointer ${activeSection === 'media' ? 'text-[#FF0000]' : ''}`}
              >
                Media
              </button>
              <button 
                onClick={() => handleNavigate('ward9')} 
                className={`hover:text-[#FF0000] transition-colors cursor-pointer ${activeSection === 'ward9' ? 'text-[#FF0000]' : ''}`}
              >
                Ward 9
              </button>
              <button 
                onClick={() => handleNavigate('contact')} 
                className={`hover:text-[#FF0000] transition-colors cursor-pointer ${activeSection === 'contact' ? 'text-[#FF0000]' : ''}`}
              >
                Contact
              </button>
            </div>

            {/* Social Icons (Phone, Twitter, Instagram, Facebook) */}
            <div className="flex items-center gap-2.5">
              <a 
                href="tel:5199909999" 
                title="Phone Call"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <PhoneCallIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Legal Disclosure & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs text-center sm:text-left">
            <p className="font-semibold text-slate-300">
              Authorized by Soham Patel, Candidate for Windsor Ward 9 City Councillor.
            </p>
            <p>
              &copy; 2026 Soham Patel. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* =================================================================
         MODAL POPUPS
         ================================================================= */}
      <LawnSignModal 
        isOpen={isLawnSignOpen}
        onClose={() => setIsLawnSignOpen(false)}
      />

      <VolunteerModal 
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />

    </div>
  );
}
