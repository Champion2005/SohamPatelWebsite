import React from 'react';
import sohamHeadshot from '../assets/soham_headshot.png';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection = () => {
  useScrollReveal();

  return (
    <section id="about" className="scroll-mt-24 w-full">
      {/* Section Header with Left Border Line */}
      <div className="border-l-4 border-[#059669] pl-4 sm:pl-6 space-y-2 mb-8 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0F172A]">
          Meet Soham Patel
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed">
          A Fresh, Collaborative Voice for Windsor Ward 9
        </p>
      </div>

      {/* Main Unified Card (Light Image Area on Left + Dark Text Area on Right) */}
      <div className="w-full rounded-3xl bg-[#0F172A] text-slate-100 shadow-2xl border border-slate-800 overflow-hidden relative group reveal-zoom card-hover-lift">
        
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] lg:min-h-[480px] items-stretch relative z-10">
          
          {/* =================================================================
             LEFT SIDE: Candidate Image Area (Light Background)
             ================================================================= */}
          <div className="lg:col-span-5 relative bg-[#D2E3DB] flex items-end justify-center overflow-hidden min-h-[260px] sm:min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-slate-700/50 order-2 lg:order-1">
            
            {/* Soft Ambient Light Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/60 via-transparent to-transparent pointer-events-none" />

            {/* Gradient Mask to Fade Image smoothly into Light Background Base */}
            <div 
              className="w-full h-full flex items-end justify-center relative z-10 px-4 pt-4"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%, black 35%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%, black 35%)'
              }}
            >
              <img 
                src={sohamHeadshot} 
                alt="Soham Patel Portrait" 
                className="w-full max-w-[220px] sm:max-w-xs lg:max-w-[340px] xl:max-w-[380px] h-auto max-h-[280px] lg:max-h-[460px] object-contain object-bottom drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

          </div>

          {/* =================================================================
             RIGHT SIDE: Text Content (3 Body Paragraphs)
             ================================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
            
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Soham Patel is a lifelong community champion and experienced project professional who believes Windsor’s Ward 9 deserves responsive, proactive, and accessible leadership at City Hall. Having worked closely with local neighborhood groups, small business owners, and active families across the ward, Soham understands the everyday priorities that make our neighborhoods safe, prosperous, and connected.
              </p>
              
              <p>
                With a solid background in collaborative problem-solving, municipal advocacy, and fiscal responsibility, Soham is focused on delivering tangible results: from fixing neighborhood roads and enhancing storm drainage resilience to investing in modern parks, youth recreation, and local traffic calming measures.
              </p>

              <p>
                Soham’s campaign is built on direct accountability and community engagement. He is committed to holding regular ward town halls, maintaining an open-door policy for all residents, and ensuring every municipal tax dollar is invested transparently to build a stronger future for Ward 9.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
