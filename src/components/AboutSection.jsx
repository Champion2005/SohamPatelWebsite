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

      {/* 2. Picture Directly Underneath Header (Static presentation - no hover lift) */}
      <div className="w-full rounded-3xl bg-[#EEF4FC] border border-[#0A3E88]/15 shadow-lg overflow-hidden flex justify-center items-end p-6 sm:p-10 relative reveal-zoom">
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
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto max-h-[360px] sm:max-h-[420px] object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 3. About Me Body Directly Underneath Picture (Static text container - no hover lift) */}
      <div className="w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed reveal-up">
        <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-relaxed">
          I've never been the loudest person in the room. I've just been the one who shows up.
        </p>
        
        <p>
          As a real estate agent here in Windsor-Essex, I've helped families through one of the biggest decisions of their lives, buying or selling a home. As an Intelligence Officer with the Royal Canadian Naval Reserve, I've served in a role built on discipline, accountability, and putting the mission ahead of yourself.
        </p>

        <p>
          Real estate and the Reserves don't look connected at first. But they've taught me the same lesson. You earn trust by doing the work, not by talking about it.
        </p>

        <p>
          I grew up right here in Windsor, and that upbringing shaped how I see this city and what it needs.
        </p>

        <p>
          Real estate has put me in homes across Ward 9. I've sat at kitchen tables and listened to what people actually need. Safer streets. Better parks. Housing they can afford. A council that pays attention before problems get worse, not after. The Reserves taught me how to plan, follow through, and stay accountable even when it's hard.
        </p>

        <p>
          This goes back further than my career, too. I earned my degree in Mechanical Engineering at the University of Windsor, and that drive to contribute carried into advocacy. As the First Year Engineering Representative for the Engineering Society, I brought concerns and issues from first year students directly to faculty, student leaders, and the Dean of Engineering. Later, I represented the Faculty of Engineering at the University of Windsor Students' Alliance (UWSA), bringing forward the concerns, issues, and priorities of students, faculty, and staff to university leadership.
        </p>

        <p>
          That instinct to show up and speak up never left me. Today, I volunteer with a non-profit community organization that brings events, programs, and fundraisers to people across Windsor-Essex.
        </p>

        <p className="font-bold text-slate-900">
          Windsor raised me. Now I want to serve Ward 9 the same way I've served everywhere else, with real commitment, not just words.
        </p>

        {/* Interactive Action Links at End of Body */}
        <div className="pt-6 border-t border-slate-100 flex flex-col items-end gap-2 sm:gap-3">
          <button
            onClick={onNavigateToPlatform}
            className="text-xs sm:text-sm font-black text-[#FF0000] hover:text-[#D90000] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-red-50"
          >
            <span>Click here for platform details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>

          <a
            href="https://www.ontario.ca/document/ontario-municipal-councillors-guide/1-role-council-councillor-and-staff#section-2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-black text-[#FF0000] hover:text-[#D90000] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer group py-1.5 px-3 rounded-xl hover:bg-red-50"
          >
            <span>Learn about what a councillor's responsibilities are</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>

    </section>
  );
};
