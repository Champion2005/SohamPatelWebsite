import React from 'react';
import { ArrowRight } from 'lucide-react';
import sohamHeadshot from '../assets/soham_headshot.png';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection = ({ onNavigateToPlatform }) => {
  useScrollReveal();

  return (
    <section id="about" className="scroll-mt-24 w-full max-w-5xl mx-auto space-y-8">
      
      {/* 1. Header: Meet Soham Patel */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Meet Soham Patel
        </h2>
      </div>

      {/* 2. Picture Directly Underneath Header */}
      <div className="w-full rounded-3xl bg-[#EEF4FC] border border-[#0A3E88]/15 shadow-lg overflow-hidden flex justify-center items-end p-6 sm:p-10 relative reveal-zoom card-hover-lift">
        {/* Soft Ambient Background Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3E88]/10 via-transparent to-transparent pointer-events-none" />

        <div 
          className="relative z-10 flex justify-center items-end"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%, black 35%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%, black 35%)'
          }}
        >
          <img 
            src={sohamHeadshot} 
            alt="Soham Patel Candidate Portrait" 
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto max-h-[360px] sm:max-h-[420px] object-contain object-bottom drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* 3. About Me Body Directly Underneath Picture */}
      <div className="w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed reveal-up card-hover-lift">
        <p>
          Soham Patel is a lifelong community champion and experienced project professional who believes Windsor’s Ward 9 deserves responsive, proactive, and accessible leadership at City Hall. Having worked closely with local neighborhood groups, small business owners, and active families across the ward, Soham understands the everyday priorities that make our neighborhoods safe, prosperous, and connected.
        </p>
        
        <p>
          With a solid background in collaborative problem-solving, municipal advocacy, and fiscal responsibility, Soham is focused on delivering tangible results: from fixing neighborhood roads and enhancing storm drainage resilience to investing in modern parks, youth recreation, and local traffic calming measures.
        </p>

        <p>
          Soham’s campaign is built on direct accountability and community engagement. He is committed to holding regular ward town halls, maintaining an open-door policy for all residents, and ensuring every municipal tax dollar is invested transparently to build a stronger future for Ward 9.
        </p>

        {/* 4. Link at the End of Body */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onNavigateToPlatform}
            className="text-sm sm:text-base font-black text-[#FF0000] hover:text-[#D90000] uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer group py-2 px-4 rounded-xl hover:bg-red-50"
          >
            <span>Click here for platform details</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

    </section>
  );
};
