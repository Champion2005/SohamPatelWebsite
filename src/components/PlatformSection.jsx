import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PlatformSection = ({ onVolunteerClick }) => {
  useScrollReveal();

  const platformPoints = [
    {
      id: 1,
      badge: "MAIN FOCUS",
      title: "Our Streets Deserve To Be Safe. Period.",
      summary: "Residents in Ward 9 have dealt with safety concerns that shouldn't be normal in any neighbourhood. Seniors have been targeted for theft, speeding on residential streets has put families at risk, and there have been incidents of vehicles losing control near homes and schools. Safety on our streets needs to be treated as a priority.",
      bulletPoints: [
        "Stronger police presence in high-concern areas across the ward",
        "Real enforcement against speeding on residential streets",
        "Traffic calming measures to protect pedestrians, children, and seniors"
      ],
      colLeftWidth: "lg:col-span-7",
      colRightWidth: "lg:col-span-5",
      isImageRight: true
    },
    {
      id: 2,
      badge: "MAIN FOCUS",
      title: "Invest In Our Spaces. Invest In Our Community.",
      summary: "Ward 9 has been underinvested in for too long with outdated parks, aging community centres, and libraries that deserve better funding. I'll fight for real investment in our green spaces and community facilities, new and upgraded tennis and pickleball courts, better trails, and stronger backing for the community centres and libraries this ward deserves.",
      bulletPoints: [
        "Real investment in community centres and libraries",
        "New and upgraded tennis and pickleball courts",
        "Better trails, parks, and green spaces across the ward"
      ],
      colLeftWidth: "lg:col-span-5",
      colRightWidth: "lg:col-span-7",
      isImageRight: false
    },
    {
      id: 3,
      badge: "MAIN FOCUS",
      title: "6th Concession: No Walkways. No Bike Lanes. No Plan.",
      summary: "6th Concession Road wasn't built with walkways, bike lanes, or real traffic management in mind. With a multi-storey apartment development expected on the street, traffic on this corridor is only going to get heavier. I'll push the city to add the walkways, bike lanes, and traffic planning this road needs now, before that growth hits.",
      bulletPoints: [
        "Dedicated walkways and bike lanes added to the corridor",
        "Real traffic management planned ahead of new development",
        "Safer conditions for residents currently walking along the roadside"
      ],
      colLeftWidth: "lg:col-span-7",
      colRightWidth: "lg:col-span-5",
      isImageRight: true
    },
    {
      id: 4,
      badge: "MAIN FOCUS",
      title: "Plan Ahead. Not After The Damage Is Done.",
      summary: "Windsor keeps waiting until infrastructure is already overloaded before doing anything about it. Roads get dug up and underground utilities—sewer, water, gas, and electrical—get replaced after the community has already outgrown them, and residents are the ones stuck living through it. Growth is good for Ward 9, but it needs to come with a plan. With major developments like the new hospital coming to Ward 9 and the community growing rapidly, I'll push the city to plan roads and underground infrastructure ahead of growth so residents aren't the ones absorbing the impact.",
      bulletPoints: [
        "Infrastructure planning tied directly to upcoming major developments",
        "Roads and underground utilities upgraded ahead of growth, not after",
        "Growth that's planned well, so residents feel the benefits, not the disruption"
      ],
      colLeftWidth: "lg:col-span-5",
      colRightWidth: "lg:col-span-7",
      isImageRight: false
    }
  ];

  return (
    <section id="platform" className="scroll-mt-24 w-full space-y-10">
      
      {/* =================================================================
         SECTION HEADER & INTRO
         ================================================================= */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 space-y-2 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Platform
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed pt-1">
          Ward 9 is one of Windsor's most dynamic, family-focused communities, and it deserves a councillor who treats it that way. Here's Soham's practical roadmap to protect our neighbourhoods and represent residents with integrity at City Hall.
        </p>
      </div>

      {/* =================================================================
         PLATFORM POINTS: Clean Content Layout
         ================================================================= */}
      <div className="space-y-8 lg:space-y-10 py-2">
        {platformPoints.map((item) => {
          const TextBlock = (
            <div className="h-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-[#FFF0F0] border border-[#FF0000]/20 text-[#FF0000] text-xs font-black tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A3E88] leading-snug uppercase">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.summary}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                  {item.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onVolunteerClick}
                  className="text-xs sm:text-sm font-black text-[#FF0000] hover:text-[#D90000] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer group"
                >
                  <span>Support this mission</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );

          // Deep Blue Card Placeholder for future image
          const ImagePlaceholderCard = (
            <div className="h-full min-h-[260px] sm:min-h-[300px] lg:min-h-full rounded-3xl bg-[#0A3E88] border border-blue-900 shadow-xl overflow-hidden relative flex items-center justify-center">
              {/* Subtle Ambient Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#062654] via-[#0A3E88] to-[#08326E] pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF0000]/15 rounded-full blur-2xl pointer-events-none" />
            </div>
          );

          return (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {item.isImageRight ? (
                <>
                  <div className={`w-full ${item.colLeftWidth} flex flex-col reveal-left`}>
                    {TextBlock}
                  </div>
                  <div className={`w-full ${item.colRightWidth} flex flex-col reveal-right delay-100`}>
                    {ImagePlaceholderCard}
                  </div>
                </>
              ) : (
                <>
                  <div className={`w-full ${item.colLeftWidth} order-2 lg:order-1 flex flex-col reveal-left`}>
                    {ImagePlaceholderCard}
                  </div>
                  <div className={`w-full ${item.colRightWidth} order-1 lg:order-2 flex flex-col reveal-right delay-100`}>
                    {TextBlock}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
