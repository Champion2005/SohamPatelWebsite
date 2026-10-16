import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Copy, Check, ExternalLink, ChevronDown, ChevronUp, Car } from 'lucide-react';
import { advanceVotingData, electionDayData } from '../data/votingData';

export const VotingHeroCard = ({ simulatedDate = null }) => {
  // Filter out any dates that have already passed (evaluated client-side in the visitor's browser)
  const now = simulatedDate ? new Date(simulatedDate) : new Date();
  const activeAdvanceDates = advanceVotingData.filter(
    (item) => new Date(item.expiresAt) > now
  );
  const isElectionDayActive = new Date(electionDayData.expiresAt) > now;

  // Once all advance dates and election day have passed, remove the card completely from the site
  if (activeAdvanceDates.length === 0 && !isElectionDayActive) {
    return null;
  }

  // Tracks which location accordion is expanded: 'mic-mac' | 'precious-blood' | 'election-day' | null
  const [expandedId, setExpandedId] = useState(null);
  // Tracks which address was copied via the explicit Copy button
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id, e) => {
    if (e) e.stopPropagation();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    } catch {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy error:', err);
    }
    document.body.removeChild(textArea);
  };

  // Toggle location accordion (strictly visibility toggle - no automatic copying)
  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full sm:w-[380px] md:w-[410px] lg:w-[460px] rounded-2xl bg-white border border-blue-200/90 shadow-lg shadow-blue-950/5 p-2.5 sm:p-3 transition-all text-left relative">
      
      {/* Card Header */}
      <div className="flex items-center pb-1.5 mb-1.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 rounded-full bg-[#FF0000] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#0A3E88]">
            Voting Schedule & Locations
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        {/* =================================================================
           1. ADVANCE VOTING SECTION (Only displayed if at least 1 date is active)
           ================================================================= */}
        {activeAdvanceDates.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-1.5 sm:p-2 border border-slate-200/70">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 bg-[#0A3E88] text-white text-[9.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                Advance Voting
              </span>
              <span className="text-[9.5px] font-semibold text-slate-500">
                {activeAdvanceDates.length} {activeAdvanceDates.length === 1 ? 'Date' : 'Dates'} Available
              </span>
            </div>

            <div className="space-y-1.5">
              {activeAdvanceDates.map((item) => {
                const isExpanded = expandedId === item.id;
                const isCopied = copiedId === item.id;

                return (
                  <div key={item.id} className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/80 shadow-xs">
                    {/* Top Line: Date, Hours & Drive-Thru Badge */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                        <span className="text-xs font-bold text-slate-900">{item.date}</span>
                        <span className="text-slate-300">·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="text-[11px] font-semibold text-slate-700">{item.time}</span>
                        </div>
                      </div>

                      {item.specialBadge && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[8.5px] font-black px-1.5 py-0.2 rounded uppercase shrink-0">
                          <Car className="w-2.5 h-2.5 text-amber-600" />
                          {item.specialBadge}
                        </span>
                      )}
                    </div>

                    {/* Location Action Button (Toggles address visibility on click) */}
                    <button
                      onClick={() => handleToggle(item.id)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer border ${
                        isExpanded
                          ? 'bg-[#0A3E88] text-white border-[#0A3E88] shadow-sm'
                          : 'bg-blue-50/70 hover:bg-blue-100/80 text-[#0A3E88] border-blue-200/80'
                      }`}
                      title="Click to view location and address"
                    >
                      <div className="flex items-center gap-1.5 truncate pr-1">
                        <MapPin className={`w-3 h-3 shrink-0 ${isExpanded ? 'text-white' : 'text-[#FF0000]'}`} />
                        <span className="truncate">{item.locationName}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 text-[10px]">
                        <span className={isExpanded ? 'text-blue-100' : 'text-slate-500'}>
                          {isExpanded ? 'Hide Address' : 'View Address'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3 opacity-90" />
                        ) : (
                          <ChevronDown className="w-3 h-3 opacity-70" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Address Display with Copy Button */}
                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] animate-fadeIn">
                        <div className="flex items-start justify-between gap-2 bg-blue-50/60 p-2 rounded-md border border-blue-100">
                          <div className="space-y-0.5 text-slate-700 min-w-0">
                            <div className="font-bold text-[#0A3E88] flex items-center gap-1 text-xs">
                              <MapPin className="w-3 h-3 text-[#FF0000] shrink-0" />
                              <span className="truncate">{item.locationName}</span>
                            </div>
                            <div className="text-slate-900 font-semibold pl-4 text-[11px]">
                              {item.address}
                            </div>
                            {item.specialBadge && (
                              <div className="text-[10px] text-amber-800 pl-4 font-medium">
                                Drive-Thru voting available from {item.time}
                              </div>
                            )}
                          </div>

                          {/* Copy & Directions Buttons */}
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={(e) => copyToClipboard(item.copyText, item.id, e)}
                              className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold transition-all shadow-xs cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#0A3E88] hover:bg-[#062654] text-white'
                              }`}
                              title="Copy address to clipboard"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                            <a
                              href={item.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold text-slate-600 hover:text-[#0A3E88] bg-white border border-slate-200 transition-all hover:bg-slate-50"
                            >
                              <span>Directions</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================
           2. ELECTION DAY SECTION (Only displayed if Election Day has not passed)
           ================================================================= */}
        {isElectionDayActive && (
          <div className="bg-slate-50 rounded-xl p-1.5 sm:p-2 border border-slate-200/70">
            <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/80 shadow-xs">
              {/* Top Line: Date, Time */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center bg-[#FF0000] text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                    Election Day
                  </span>
                  <span className="text-xs font-bold text-slate-900">{electionDayData.date}</span>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-700">{electionDayData.time}</span>
                  </div>
                </div>
              </div>

              {/* Location Button for Election Day */}
              <button
                onClick={() => handleToggle('election-day')}
                className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer border ${
                  expandedId === 'election-day'
                    ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm'
                    : 'bg-red-50/80 hover:bg-red-100 text-[#FF0000] border-red-200'
                }`}
                title="Click to view all 4 voting locations and addresses"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>Vote at any of the 4 Locations</span>
                </div>

                <div className="flex items-center gap-1 shrink-0 text-[10px]">
                  <span className={expandedId === 'election-day' ? 'text-red-100' : 'text-slate-500'}>
                    {expandedId === 'election-day' ? 'Hide Locations' : 'View Locations'}
                  </span>
                  {expandedId === 'election-day' ? (
                    <ChevronUp className="w-3 h-3 opacity-90" />
                  ) : (
                    <ChevronDown className="w-3 h-3 opacity-70" />
                  )}
                </div>
              </button>

              {/* Expandable 4 Locations List with Individual Copy Address Buttons */}
              {expandedId === 'election-day' && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] space-y-1.5 animate-fadeIn">
                  <div className="text-[10px] font-bold text-slate-500 pb-0.5">
                    Eligible Polling Stations:
                  </div>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
                    {electionDayData.locations.map((loc) => {
                      const isCopied = copiedId === loc.id;
                      return (
                        <div
                          key={loc.id}
                          className="flex items-center justify-between gap-2 p-1.5 rounded-md bg-slate-50 hover:bg-blue-50/50 border border-slate-200/70 transition-colors"
                        >
                          <div className="min-w-0 pr-1">
                            <div className="font-bold text-slate-900 text-[11px] truncate">
                              <span className="text-[#0A3E88] font-black mr-1">({loc.code})</span>
                              {loc.name}
                            </div>
                            <div className="text-[10px] text-slate-600 truncate">{loc.address}</div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => copyToClipboard(loc.copyText, loc.id, e)}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white hover:bg-[#0A3E88] text-[#0A3E88] hover:text-white border border-slate-200'
                              }`}
                              title={`Copy address: ${loc.address}`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-2.5 h-2.5" />
                                  <span className="text-[9px]">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-2.5 h-2.5" />
                                  <span className="text-[9px]">Copy</span>
                                </>
                              )}
                            </button>
                            <a
                              href={loc.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#0A3E88] transition-colors"
                              title="Open directions in Google Maps"
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
