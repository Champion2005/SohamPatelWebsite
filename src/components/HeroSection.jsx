import React from 'react';
import { ArrowRight } from 'lucide-react';
import sohamHeadshot from '../assets/soham_headshot.png';

export const HeroSection = ({ onLawnSignClick, onVolunteerClick }) => {
  return (
    <section 
      id="hero" 
      className="flex-1 flex flex-col justify-between w-full h-full relative overflow-hidden text-left py-4 sm:py-6 lg:py-8"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between relative z-10">
        
        {/* =================================================================
           TOP FLEX CONTAINER: Text Stack & Action Buttons (Fills upper flex space)
           ================================================================= */}
        <div className="w-full lg:max-w-3xl xl:max-w-4xl space-y-4 sm:space-y-6 pt-1 sm:pt-4">
          
          {/* Location Subtitle */}
          <div className="animate-slide-up-fade">
            <span className="text-xs sm:text-base md:text-lg font-bold tracking-widest text-slate-800 block">
              Windsor, Ontario
            </span>
          </div>

          {/* Text Stack Block */}
          <div className="space-y-2 sm:space-y-4 w-full">
            
            {/* SOHAM PATEL (Bold, Prominent, Fills Mobile Width) */}
            <div className="animate-slide-up-fade animate-delay-100 w-full">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-[#062E2B] leading-[0.92] drop-shadow-sm w-full">
                Soham Patel
              </h1>
            </div>

            {/* FOR CITY COUNCIL + IN WARD 9 */}
            <div className="animate-slide-up-fade animate-delay-200 space-y-1 sm:space-y-2 pt-1 sm:pt-2">
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-widest text-[#059669] block">
                FOR CITY COUNCIL
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight text-[#062E2B] leading-none">
                IN WARD 9
              </h2>
            </div>

          </div>

          {/* Action Buttons (Fills space nicely) */}
          <div className="animate-slide-up-fade animate-delay-300 pt-3 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-5 w-full sm:w-auto">
            
            {/* Button 1: Request a Lawn Sign */}
            <button
              onClick={onLawnSignClick || (() => alert('Lawn Sign Request Modal / Form'))}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-extrabold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3 group text-white w-full sm:w-auto"
              style={{
                backgroundColor: 'var(--theme-btn-lawn-bg)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-btn-lawn-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-btn-lawn-bg)'}
            >
              <span>Request a Lawn Sign</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>

            {/* Button 2: Volunteer */}
            <button
              onClick={onVolunteerClick || (() => alert('Volunteer Sign-up Modal / Form'))}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-extrabold text-sm sm:text-base tracking-wider transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3 group text-white w-full sm:w-auto"
              style={{
                backgroundColor: 'var(--theme-btn-volunteer-bg)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-btn-volunteer-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-btn-volunteer-bg)'}
            >
              <span>Volunteer</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>

          </div>

        </div>

        {/* =================================================================
           BOTTOM FLEX SECTION: Candidate Image (Fills lower flex section on mobile)
           ================================================================= */}
        <div 
          className="w-full flex-1 flex items-end justify-center lg:justify-end lg:absolute lg:bottom-0 lg:right-6 xl:right-12 z-0 pointer-events-none transition-all mt-4 lg:mt-0"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 18%, black 45%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 18%, black 45%)'
          }}
        >
          <img 
            src={sohamHeadshot} 
            alt="Soham Patel Candidate Headshot" 
            className="w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:w-[560px] xl:w-[660px] h-auto max-h-[48vh] sm:max-h-[52vh] lg:max-h-[90vh] object-contain object-bottom drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};
