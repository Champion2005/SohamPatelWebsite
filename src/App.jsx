import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PlatformSection } from './components/PlatformSection';
import { Ward9MapSection } from './components/Ward9MapSection';
import { LawnSignModal } from './components/LawnSignModal';
import { VolunteerModal } from './components/VolunteerModal';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './components/SocialIcons';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  const [activeSection, setActiveSection] = useState('hero');
  const [isLawnSignOpen, setIsLawnSignOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-[var(--theme-text-primary)] bg-[var(--theme-bg-page)] selection:bg-[var(--theme-btn-lawn-bg)] selection:text-white overflow-x-hidden w-full">
      
      {/* =================================================================
         HERO + NAVBAR WRAPPER (Exact 100dvh Screen Height)
         ================================================================= */}
      <div 
        className="h-[100dvh] h-screen max-h-[100dvh] flex flex-col justify-between overflow-hidden w-full" 
        style={{ backgroundColor: '#D2E3DB' }}
      >
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        <HeroSection 
          onLawnSignClick={() => setIsLawnSignOpen(true)}
          onVolunteerClick={() => setIsVolunteerOpen(true)}
        />
      </div>

      {/* =================================================================
         MAIN CONTENT SECTIONS (Order: About Soham -> Platform -> Ward 9)
         ================================================================= */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-28 sm:space-y-36 w-full overflow-x-hidden">
        
        {/* Section 1: About Soham (Meet Soham Patel) */}
        <AboutSection />

        {/* Section 2: Platform */}
        <PlatformSection 
          onLawnSignClick={() => setIsLawnSignOpen(true)}
          onVolunteerClick={() => setIsVolunteerOpen(true)}
        />

        {/* Section 3: Ward 9 Interactive Map & Address Search */}
        <Ward9MapSection 
          onLawnSignClick={() => setIsLawnSignOpen(true)}
          onVolunteerClick={() => setIsVolunteerOpen(true)}
        />

        {/* Call to Action Banner before Footer (With Scroll Reveal & Hover Lift) */}
        <section className="rounded-3xl bg-gradient-to-br from-[#062E2B] via-[#0F172A] to-[#090D16] text-white p-8 sm:p-12 lg:p-16 border border-emerald-800/40 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 reveal-zoom card-hover-lift">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669] block">
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
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Request a Lawn Sign
            </button>
            <button
              onClick={() => setIsVolunteerOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all border border-slate-700 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Volunteer
            </button>
          </div>
        </section>

      </main>

      {/* =================================================================
         SITE FOOTER
         ================================================================= */}
      <footer className="bg-[#090D16] text-slate-400 text-xs border-t border-slate-800/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            {/* Logo Badge & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#059669] text-white font-bold flex items-center justify-center text-base">
                SP
              </div>
              <div className="text-left">
                <span className="font-extrabold text-white text-base block">Soham Patel</span>
                <span className="text-xs text-slate-400">Windsor City Council &bull; Ward 9 Candidate</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
              <button 
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                About Soham
              </button>
              <button 
                onClick={() => {
                  document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Platform
              </button>
              <button 
                onClick={() => {
                  document.getElementById('ward9')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-white transition-colors cursor-pointer"
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
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#059669] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#059669] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#059669] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
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
