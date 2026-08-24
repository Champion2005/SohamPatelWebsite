import React from 'react';
import { ArrowRight } from 'lucide-react';
import sohamUniform from '../assets/soham_hero_img.png';

export const HeroSection = ({ onLawnSignClick, onVolunteerClick, onDonateClick }) => {
  return (
    <section 
      id="hero" 
      className="flex-1 flex flex-col justify-between w-full h-full relative overflow-hidden text-left py-4 sm:py-6 lg:py-8"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between relative z-10">
        
        {/* =================================================================
           TOP FLEX CONTAINER: Text Stack & Action Buttons
           ================================================================= */}
        <div className="w-full md:w-[52%] lg:w-[55%] xl:w-[58%] max-w-full space-y-3 sm:space-y-4 lg:space-y-6 pt-1 sm:pt-3 lg:pt-4 z-10 relative">
          
          {/* Text Stack Block */}
          <div className="space-y-1 sm:space-y-2.5 w-full">
            
            {/* Main Name Header "SOHAM PATEL" */}
            <h1 className="font-black uppercase tracking-tight text-slate-900 text-5xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] drop-shadow-sm">
              <span className="text-[#0A3E88] sm:inline">SOHAM </span>
              <span className="text-[#FF0000] sm:inline">PATEL</span>
            </h1>

            {/* Subtitle Line "FOR WARD 9" */}
            <div className="pt-1 sm:pt-1.5">
              <span className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-black uppercase tracking-tight text-[#0A3E88] block">
                FOR WARD <span className="text-[#FF0000]">9</span>
              </span>
            </div>

            {/* City Tagline "WINDSOR, ONTARIO" */}
            <div>
              <span className="text-xs sm:text-base md:text-base lg:text-xl font-black uppercase tracking-widest text-slate-600 block pt-0.5">
                Windsor, Ontario
              </span>
            </div>

            {/* Campaign Slogan "YOUR WARD. YOUR VOICE. YOUR CHOICE" */}
            <div className="pt-1">
              <span className="text-base sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight text-[#FF0000] block leading-tight">
                YOUR WARD. YOUR VOICE. YOUR CHOICE
              </span>
            </div>

          </div>

          {/* Action Buttons Stack (Exact CTA layout & styling) */}
          <div className="animate-slide-up-fade animate-delay-300 pt-2 sm:pt-4 flex flex-col gap-2.5 w-full sm:w-80 md:w-[340px] lg:w-[380px]">
            
            {/* Top Row: Request Lawn Sign & Volunteer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              <button
                onClick={onLawnSignClick}
                className="w-full px-3.5 py-3 rounded-full bg-white text-[#0A3E88] hover:bg-slate-100 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center border border-slate-200/80"
              >
                Request Lawn Sign
              </button>
              <button
                onClick={onVolunteerClick}
                className="w-full px-3.5 py-3 rounded-full bg-[#062654] border border-blue-400/40 text-white hover:bg-blue-900 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Volunteer
              </button>
            </div>

            {/* Bottom Row: Donate Button */}
            <button
              onClick={onDonateClick}
              className="w-full px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Donate
            </button>

          </div>

        </div>

        {/* Candidate Image */}
        <div 
          className="w-full flex-1 flex items-end justify-center md:justify-end md:absolute md:-bottom-6 lg:-bottom-8 xl:-bottom-10 md:-right-8 lg:-right-12 xl:-right-16 2xl:-right-24 md:h-[118%] lg:h-[122%] xl:h-[125%] z-0 pointer-events-none transition-all mt-3 md:mt-0"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.03) 4%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.82) 28%, black 42%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.03) 4%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.82) 28%, black 42%)'
          }}
        >
          <img 
            src={sohamUniform} 
            alt="Soham Patel Candidate Headshot" 
            className="w-auto h-full max-h-[50vh] sm:max-h-[56vh] md:max-h-full md:h-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};
