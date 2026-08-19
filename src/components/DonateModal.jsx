import React, { useState, useEffect, useRef } from 'react';
import { X, CreditCard, Send, Check, Copy, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('zeffy'); // 'zeffy' | 'interac'
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  const zeffyUrl = import.meta.env.VITE_ZEFFY_DONATION_URL || 'https://www.zeffy.com/donation-form';
  const interacEmail = import.meta.env.VITE_INTERAC_DONATION_EMAIL || 'donate@sohampatel.ca';

  const presetAmounts = [25, 50, 100, 250, 500];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(interacEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleZeffyRedirect = () => {
    window.open(zeffyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-slide-up-fade">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Top Header (Blue #0A3E88) */}
        <div className="p-6 sm:p-7 bg-[#0A3E88] text-white flex items-center justify-between border-b border-blue-900">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FF0000] bg-white px-2.5 py-0.5 rounded-full inline-block">
              Campaign Contribution
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>Support Soham Patel</span>
              <Heart className="w-5 h-5 text-[#FF0000] fill-current" />
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Method Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('zeffy')}
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'zeffy'
                  ? 'bg-white text-[#0A3E88] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#FF0000]" />
              <span>Credit / Apple Pay</span>
            </button>

            <button
              onClick={() => setActiveTab('interac')}
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'interac'
                  ? 'bg-white text-[#0A3E88] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-4 h-4 text-[#0A3E88]" />
              <span>Interac e-Transfer</span>
            </button>
          </div>

          {/* TAB 1: ZEFFY (0% Fee Credit Card / Apple Pay) */}
          {activeTab === 'zeffy' && (
            <div className="space-y-5 animate-slide-up-fade">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Select Contribution Amount
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    100% Goes to Campaign (0% Fee)
                  </span>
                </div>
                
                {/* Preset Amount Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-1">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-3.5 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer border ${
                        selectedAmount === amt
                          ? 'bg-[#0A3E88] text-white border-[#0A3E88] shadow-md scale-[1.02]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF4FC] border border-blue-100 text-xs sm:text-sm text-slate-700 space-y-1">
                <p className="font-bold text-[#0A3E88]">
                  Powered by Zeffy for 100% Free Processing
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Zeffy is Canada's 0% fee platform for campaigns and community organizations. Every dollar you give directly funds lawn signs, flyers, and voter outreach in Ward 9.
                </p>
              </div>

              {/* Action Button to Launch Zeffy */}
              <button
                onClick={handleZeffyRedirect}
                className="w-full py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Secure Checkout (${selectedAmount})</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: INTERAC E-TRANSFER (100% Free) */}
          {activeTab === 'interac' && (
            <div className="space-y-5 animate-slide-up-fade">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Official Campaign e-Transfer Email
                </span>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 gap-2">
                  <span className="font-black text-base sm:text-lg text-[#0A3E88] truncate select-all">
                    {interacEmail}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 rounded-lg bg-[#0A3E88] hover:bg-[#08326E] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Simple Step-by-Step Instructions */}
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <p className="font-bold text-[#0A3E88] uppercase tracking-wider text-xs">
                  How to send an e-Transfer:
                </p>
                <ol className="space-y-2 list-decimal list-inside text-slate-600 text-xs sm:text-sm leading-relaxed">
                  <li>Log in to your Canadian online banking app.</li>
                  <li>Send an Interac e-Transfer to <strong className="text-slate-900">{interacEmail}</strong> (Auto-deposit enabled).</li>
                  <li className="text-[#0A3E88] font-bold">
                    <strong className="text-[#FF0000]">Important:</strong> In the transfer message / memo box, please include your <u>Full Legal Name</u> and <u>Residential Address</u> (required for Ontario municipal election compliance).
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Ontario Municipal Elections Act Compliance Disclosure */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Ontario Municipal Campaign Rules</span>
            </div>
            <ul className="text-[11px] text-amber-800/90 space-y-1 list-disc list-inside leading-snug">
              <li>Individual contribution limit is <strong>$1,200 CAD</strong> per candidate.</li>
              <li>Only individuals residing in Ontario can donate.</li>
              <li>Corporations, trade unions, and anonymous donations are prohibited by law.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
