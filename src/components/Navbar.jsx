import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';

export const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About Soham' },
    { id: 'platform', label: 'Platform' },
    { id: 'ward9', label: 'Ward 9' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    // Smooth scroll to section if present
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 bg-transparent" 
      style={{ 
        borderColor: 'rgba(15, 23, 42, 0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          
          {/* =================================================================
             LEFT SIDE: Logo & Candidate Name Placeholder
             ================================================================= */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('hero')}>
            {/* Logo Badge Placeholder */}
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg tracking-wider shadow-sm transition-transform group-hover:scale-105 duration-200 border"
              style={{ 
                backgroundColor: 'var(--theme-logo-badge-bg)', 
                color: 'var(--theme-logo-badge-text)',
                borderColor: 'rgba(5, 150, 105, 0.3)'
              }}
            >
              SP
            </div>
          </div>

          {/* =================================================================
             CENTER: 3 Nav Buttons (Centered with the Screen Width)
             ================================================================= */}
          <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-lg text-base font-bold transition-all duration-200 cursor-pointer relative group ${
                    isActive 
                      ? 'text-[#0F172A] bg-[rgba(15,23,42,0.08)]' 
                      : 'text-[#1E293B] hover:text-[#000000] hover:bg-[rgba(15,23,42,0.08)]'
                  }`}
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                >
                  {link.label}
                  {/* Active indicator bar in subtle emerald green */}
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-[var(--theme-accent-green)]' : 'w-0 group-hover:w-4 bg-[#0F172A]/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================================
             RIGHT SIDE: Social Media Pill Container (Desktop lg+)
             ================================================================= */}
          <div className="hidden lg:flex items-center">
            <div 
              className="flex items-center gap-1.5 p-1 px-1.5 rounded-full border shadow-sm transition-all"
              style={{
                borderColor: 'var(--theme-social-pill-border)',
                backgroundColor: 'var(--theme-social-pill-bg)'
              }}
            >
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: 'var(--theme-social-icon-bg)',
                  color: 'var(--theme-social-icon-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-hover-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-hover-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-color)';
                }}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: 'var(--theme-social-icon-bg)',
                  color: 'var(--theme-social-icon-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-hover-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-hover-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-color)';
                }}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: 'var(--theme-social-icon-bg)',
                  color: 'var(--theme-social-icon-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-hover-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-hover-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-social-icon-bg)';
                  e.currentTarget.style.color = 'var(--theme-social-icon-color)';
                }}
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* =================================================================
             MOBILE / TABLET HAMBURGER BUTTON (Visible on < lg screens)
             ================================================================= */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#0F172A] hover:bg-[rgba(15,23,42,0.1)] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* =================================================================
         MOBILE & TABLET NAVIGATION DRAWER / DROPDOWN
         ================================================================= */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden border-t px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all animate-in slide-in-from-top duration-300 text-white"
          style={{ 
            backgroundColor: 'var(--theme-bg-mobile-drawer)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Nav Links in Drawer */}
          <div className="flex flex-col space-y-1.5 py-2 border-b border-[rgba(255,255,255,0.1)]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-all hover:text-white hover:bg-[rgba(255,255,255,0.1)]"
                style={{
                  color: activeSection === link.id ? '#FFFFFF' : '#E2E8F0',
                  backgroundColor: activeSection === link.id ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[var(--theme-accent-green)]" />
              </button>
            ))}
          </div>

          {/* Drawer Social Media Pill */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              Connect with Soham:
            </span>
            <div 
              className="flex items-center gap-2 p-1.5 px-2 rounded-full border shadow-sm"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-white hover:bg-[var(--theme-accent-green)]"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-white hover:bg-[var(--theme-accent-green)]"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-white hover:bg-[var(--theme-accent-green)]"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
};
