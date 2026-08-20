import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PlatformSection = ({ onVolunteerClick }) => {
  useScrollReveal();

  const platformPoints = [
    {
      id: 1,
      badge: "MAIN FOCUS",
      title: "Safe, Connected & Peaceful Neighborhoods",
      summary: "Prioritizing neighborhood traffic calming, pedestrian crosswalk safety, and proactive community-focused policing to protect families and seniors throughout Ward 9.",
      bulletPoints: [
        "Speed mitigation and smart traffic calming on residential corridors",
        "Improved street lighting and crosswalk visibility near local schools",
        "Active partnerships with neighborhood watch and youth community programs"
      ],
      colLeftWidth: "lg:col-span-7",
      colRightWidth: "lg:col-span-5",
      isImageRight: true
    },
    {
      id: 2,
      badge: "MAIN FOCUS",
      title: "Modern Infrastructure & Storm Drainage Resilience",
      summary: "Investing in essential road resurfacing, sidewalk accessibility, and proactive stormwater drainage upgrades to prevent residential flooding during heavy rainstorms.",
      bulletPoints: [
        "Targeted resurfacing for deteriorating residential roads and thoroughfares",
        "Upgraded catch basins, sewer line clean-outs, and basement flooding subsidies",
        "Expanding interconnected bike paths and accessible sidewalk networks"
      ],
      colLeftWidth: "lg:col-span-5",
      colRightWidth: "lg:col-span-7",
      isImageRight: false
    },
    {
      id: 3,
      badge: "MAIN FOCUS",
      title: "Revitalized Parks, Recreation & Green Spaces",
      summary: "Preserving and expanding Ward 9's public parks, sports fields, splash pads, and recreational amenities for children, growing families, and seniors.",
      bulletPoints: [
        "Modernizing neighborhood park playground equipment and shaded seating",
        "Preserving natural woodlots and expanding urban tree canopy coverage",
        "Year-round community sports programming and accessible recreational facilities"
      ],
      colLeftWidth: "lg:col-span-7",
      colRightWidth: "lg:col-span-5",
      isImageRight: true
    },
    {
      id: 4,
      badge: "MAIN FOCUS",
      title: "Transparent Governance & Fiscal Accountability",
      summary: "Ensuring every municipal property tax dollar delivers maximum value for residents, with honest representation and direct community feedback on City Council decisions.",
      bulletPoints: [
        "Regular Ward 9 town halls and digital survey channels before major council votes",
        "Disciplined city budget allocation focusing on core frontline services",
        "Direct resident assistance and rapid response to 311 service inquiries"
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
