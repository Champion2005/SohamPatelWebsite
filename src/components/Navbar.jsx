import React, { useState } from 'react';
import { Menu, X, ChevronRight, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon, PhoneCallIcon } from './SocialIcons';

export const Navbar = ({ activeSection, setActiveSection, onDonateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'media', label: 'Media' },
    { id: 'ward9', label: 'Ward 9' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Ensure instant reliable scroll to top of page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleDonateClick = () => {
    handleNavClick('donate');
    if (onDonateClick) onDonateClick();
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg border-b transition-all duration-300" 
      style={{ 
        backgroundColor: '#0A3E88',
        borderColor: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          
          {/* =================================================================
             LEFT SIDE: Brand "SOHAM PATEL"
             ================================================================= */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
            <span className="font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#FF0000] transition-colors uppercase">
              SOHAM PATEL
            </span>
          </div>

          {/* =================================================================
             CENTER: Nav Buttons (Home, About, Media, Ward 9, Contact)
             ================================================================= */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-base font-bold transition-all duration-200 cursor-pointer relative group uppercase tracking-wider ${
                    isActive 
                      ? 'text-white bg-white/15' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                >
                  {link.label}
                  {/* Active indicator bar in Red (#FF0000) */}
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-[#FF0000]' : 'w-0 group-hover:w-4 bg-white/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================================
             RIGHT SIDE: Donate Button & Social Icons (Instagram & Facebook)
             ================================================================= */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Prominent Donate Button */}
            <button
              onClick={handleDonateClick}
              className="px-4.5 py-2 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Donate</span>
            </button>

            <div className="h-6 w-px bg-white/20 mx-0.5" />
            <a 
              href="https://www.instagram.com/Vote.4Soham/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Instagram (@Vote.4Soham)" 
              aria-label="Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 text-white hover:bg-[#FF0000] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <InstagramIcon className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://www.facebook.com/Vote4Soham" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Facebook (Vote4Soham)" 
              aria-label="Facebook"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 text-white hover:bg-[#FF0000] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FacebookIcon className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* =================================================================
             MOBILE / TABLET HAMBURGER BUTTON
             ================================================================= */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleDonateClick}
              className="px-3 py-1.5 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Donate</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/15 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* =================================================================
         MOBILE & TABLET NAVIGATION DRAWER
         ================================================================= */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden border-t px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all animate-in slide-in-from-top duration-300 text-white"
          style={{ 
            backgroundColor: '#062654',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }}
        >
          {/* Nav Links in Drawer */}
          <div className="flex flex-col space-y-1.5 py-2 border-b border-white/15">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-base font-bold uppercase tracking-wider transition-all hover:text-white hover:bg-white/15 cursor-pointer"
                style={{
                  color: activeSection === link.id ? '#FFFFFF' : '#CBD5E1',
                  backgroundColor: activeSection === link.id ? 'rgba(255, 0, 0, 0.25)' : 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#FF0000]" />
              </button>
            ))}

            {/* Mobile Donate Link */}
            <button
              onClick={handleDonateClick}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Make a Campaign Contribution</span>
            </button>

            {/* Mobile Social Links: Instagram & Facebook */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">Follow Soham:</span>
              <a 
                href="https://www.instagram.com/Vote.4Soham/" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Instagram (@Vote.4Soham)" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 text-white hover:bg-[#FF0000] transition-colors"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://www.facebook.com/Vote4Soham" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Facebook (Vote4Soham)" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 text-white hover:bg-[#FF0000] transition-colors"
              >
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
