import React from 'react';
import { ArrowRight } from 'lucide-react';
import sohamUniform from '../assets/soham_uniform.png';

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
        <div className="w-full lg:max-w-3xl xl:max-w-4xl space-y-4 sm:space-y-6 pt-2 sm:pt-6">
          
          {/* Text Stack Block */}
          <div className="space-y-1 sm:space-y-3 w-full">
            
            {/* Main Name Header "SOHAM PATEL" */}
            <h1 className="font-black uppercase tracking-tight text-slate-900 text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.88] drop-shadow-sm">
              <span className="text-[#0A3E88] block sm:inline">SOHAM </span>
              <span className="text-[#FF0000] block sm:inline">PATEL</span>
            </h1>

            {/* Subtitle Line "FOR WARD 9" */}
            <div className="pt-1 sm:pt-2">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A3E88] block">
                FOR WARD <span className="text-[#FF0000]">9</span>
              </span>
            </div>

            {/* City Tagline "WINDSOR, ONTARIO" */}
            <div>
              <span className="text-sm sm:text-lg lg:text-xl font-black uppercase tracking-widest text-slate-600 block pt-0.5 sm:pt-1">
                Windsor, Ontario
              </span>
            </div>

          </div>

          {/* Action Buttons Stack (Exact CTA layout & styling) */}
          <div className="animate-slide-up-fade animate-delay-300 pt-3 sm:pt-6 flex flex-col gap-3 w-full sm:w-80 md:w-[380px]">
            
            {/* Top Row: Request Lawn Sign & Volunteer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <button
                onClick={onLawnSignClick}
                className="w-full px-4 py-3.5 rounded-full bg-white text-[#0A3E88] hover:bg-slate-100 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center border border-slate-200/80"
              >
                Request Lawn Sign
              </button>
              <button
                onClick={onVolunteerClick}
                className="w-full px-4 py-3.5 rounded-full bg-[#062654] border border-blue-400/40 text-white hover:bg-blue-900 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Volunteer
              </button>
            </div>

            {/* Bottom Row: Donate Button (Under Lawn Sign and Volunteer, same width) */}
            <button
              onClick={onDonateClick}
              className="w-full px-7 py-3.5 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Donate
            </button>

          </div>

        </div>

        {/* Candidate Image */}
        <div 
          className="w-full flex-1 flex items-end justify-center lg:justify-end lg:absolute lg:bottom-0 lg:right-6 xl:right-12 z-0 pointer-events-none transition-all mt-4 lg:mt-0"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 18%, black 45%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 18%, black 45%)'
          }}
        >
          <img 
            src={sohamUniform} 
            alt="Soham Patel Candidate Headshot" 
            className="w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:w-[560px] xl:w-[660px] h-auto max-h-[48vh] sm:max-h-[52vh] lg:max-h-[90vh] object-contain object-bottom drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};
