import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PlatformSection } from './components/PlatformSection';
import { MediaSection } from './components/MediaSection';
import { Ward9MapSection } from './components/Ward9MapSection';
import { LawnSignModal } from './components/LawnSignModal';
import { VolunteerModal } from './components/VolunteerModal';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './components/SocialIcons';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  // State-based Page Navigation: 'home' | 'about' | 'media' | 'ward9'
  const [activeSection, setActiveSection] = useState('home');
  const [isLawnSignOpen, setIsLawnSignOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  useScrollReveal(activeSection);

  const handleNavigate = (pageId, targetElementId = null) => {
    setActiveSection(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
    <div className="min-h-screen flex flex-col font-sans text-[var(--theme-text-primary)] bg-[var(--theme-bg-page)] selection:bg-[var(--theme-btn-lawn-bg)] selection:text-white overflow-x-hidden w-full">
      
      {/* =================================================================
         TOP STICKY NAVBAR (Appears across all pages)
         ================================================================= */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={(id) => handleNavigate(id)} 
      />

      {/* =================================================================
         PAGE CONTENT VIEWS (State-Based Navigation)
         ================================================================= */}
      <main className="flex-1 w-full overflow-x-hidden">
        
        {/* 1. HOME PAGE VIEW: Hero Section + Platform Section Directly Underneath */}
        {activeSection === 'home' && (
          <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-24">
            {/* Hero Banner (Soft Light Navy-Tinted Canvas) */}
            <div 
              className="h-[calc(100dvh-5rem)] min-h-[580px] flex flex-col justify-between overflow-hidden w-full" 
              style={{ backgroundColor: 'var(--theme-bg-hero)' }}
            >
              <HeroSection 
                onLawnSignClick={() => setIsLawnSignOpen(true)}
                onVolunteerClick={() => setIsVolunteerOpen(true)}
              />
            </div>

            {/* Platform Priorities directly underneath Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <PlatformSection 
                onLawnSignClick={() => setIsLawnSignOpen(true)}
                onVolunteerClick={() => setIsVolunteerOpen(true)}
              />
            </div>
          </div>
        )}

        {/* 2. ABOUT SOHAM PAGE VIEW */}
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

        {/* Call to Action Banner (Shown on About, Media, and Ward 9 pages) */}
        {activeSection !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 w-full">
            <section className="rounded-3xl bg-gradient-to-br from-[#0B1B3D] via-[#06122B] to-[#0A192F] text-white p-8 sm:p-12 lg:p-16 border border-red-900/30 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 reveal-zoom card-hover-lift">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-red-main)] block">
                  Join The Movement
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  Ready to Shape the Future of Ward 9?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Every conversation, lawn sign, and volunteer hour brings positive change to our neighborhood. Get involved today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setIsLawnSignOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[var(--theme-red-main)] hover:bg-[var(--theme-red-hover)] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Request a Lawn Sign
                </button>
                <button
                  onClick={() => setIsVolunteerOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[var(--theme-navy-light)] hover:bg-[#2A3E66] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all border border-slate-700 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Volunteer
                </button>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* =================================================================
         SITE FOOTER
         ================================================================= */}
      <footer className="bg-[#06122B] text-slate-400 text-xs border-t border-slate-800/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            {/* Logo Text */}
            <div 
              className="cursor-pointer text-left group"
              onClick={() => handleNavigate('home')}
            >
              <span className="font-extrabold text-white text-xl block group-hover:text-[var(--theme-red-main)] transition-colors">
                Soham Patel
              </span>
              <span className="text-xs text-slate-400 block">Windsor City Council &bull; Ward 9 Candidate</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
              <button 
                onClick={() => handleNavigate('about')} 
                className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'about' ? 'text-red-400' : ''}`}
              >
                About Soham
              </button>
              <button 
                onClick={() => handleNavigate('media')} 
                className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'media' ? 'text-red-400' : ''}`}
              >
                Media
              </button>
              <button 
                onClick={() => handleNavigate('ward9')} 
                className={`hover:text-white transition-colors cursor-pointer ${activeSection === 'ward9' ? 'text-red-400' : ''}`}
              >
                Ward 9 Map
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[var(--theme-red-main)] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[var(--theme-red-main)] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[var(--theme-red-main)] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>
              Authorized by the Official Campaign to Elect Soham Patel for Windsor City Council Ward 9.
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
