import React, { useState, useEffect, useRef } from 'react';
import { X, CreditCard, Send, Check, Copy, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'interac'
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  const stripeUrl = import.meta.env.VITE_STRIPE_DONATION_URL || 'https://buy.stripe.com';
  const interacEmail = import.meta.env.VITE_INTERAC_DONATION_EMAIL || 'sohamforcouncil@gmail.com';

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

  const handleStripeRedirect = () => {
    window.open(stripeUrl, '_blank', 'noopener,noreferrer');
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
              onClick={() => setActiveTab('card')}
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white text-[#0A3E88] shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#FF0000]" />
              <span>Credit Card / Apple Pay</span>
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

          {/* TAB 1: CREDIT CARD / APPLE PAY (STRIPE) */}
          {activeTab === 'card' && (
            <div className="space-y-5 animate-slide-up-fade">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Select Contribution Amount
                  </span>
                  <span className="text-[11px] font-bold text-[#0A3E88] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    Secure Stripe Checkout
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
                  Secure Instant Online Contribution
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Support Soham Patel’s grassroots campaign for Windsor Ward 9. Fast, encrypted checkout supporting Visa, Mastercard, American Express, Apple Pay, and Google Pay.
                </p>
              </div>

              {/* Action Button to Launch Stripe Checkout */}
              <button
                onClick={handleStripeRedirect}
                className="w-full py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Secure Checkout (${selectedAmount})</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: INTERAC E-TRANSFER (100% Free - 0% Deductions) */}
          {activeTab === 'interac' && (
            <div className="space-y-5 animate-slide-up-fade">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                    Official Campaign e-Transfer Email
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    100% Free (0% Processing Fees)
                  </span>
                </div>

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
                    <strong className="text-[#FF0000]">Mandatory Compliance Requirement:</strong> Under s. 88.22(1)(g) of the <em>Municipal Elections Act, 1996</em>, please include your <u>Full Legal Name</u> and <u>Residential Address</u> in the transfer memo box for official financial reporting and receipt issuance.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Statutory Ontario Municipal Elections Act, 1996 Compliance Disclosure (s. 88.8, 88.9, 88.16, 88.22) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Statutory Campaign Contribution Rules (Municipal Elections Act, 1996)</span>
            </div>
            <ul className="text-[11px] text-amber-900/90 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>
                <strong>Contribution Limits (s. 88.9, s. 88.22(1)(r)):</strong> An individual contributor may not make contributions exceeding a total of <strong>$1,200 CAD</strong> to any one candidate, and a total of <strong>$5,000 CAD</strong> to two or more candidates for office on the same council.
              </li>
              <li>
                <strong>Eligibility (s. 88.8(3)):</strong> Only individuals who are normally resident in Ontario may make contributions.
              </li>
              <li>
                <strong>Prohibited Contributors (s. 88.8(4)):</strong> Corporations, trade unions, federal/provincial political parties, and foreign entities are prohibited from contributing.
              </li>
              <li>
                <strong>Own Funds & Traceability (s. 88.8(8), s. 88.16):</strong> Contributions must be made from the contributor's own funds. Anonymous contributions and cash contributions exceeding $25 are prohibited by law.
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
