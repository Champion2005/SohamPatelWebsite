import React, { useState } from 'react';
import { CreditCard, Send, Check, Copy, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const DonateSection = () => {
  useScrollReveal();

  const [activeTab, setActiveTab] = useState('interac'); // Default to Interac e-Transfer first
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMemoConfirmed, setIsMemoConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  const stripeUrl = import.meta.env.VITE_STRIPE_DONATION_URL || 'https://buy.stripe.com';
  const interacEmail = import.meta.env.VITE_INTERAC_DONATION_EMAIL || 'sohamforcouncil@gmail.com';

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(interacEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStripeRedirect = () => {
    if (!isConfirmed) return;
    window.open(stripeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="donate" className="scroll-mt-24 w-full max-w-5xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 space-y-2 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Support Soham Patel
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed pt-1">
          Grassroots support fuels our mission for Windsor Ward 9. Every contribution directly funds lawn signs, door-to-door flyers, and community outreach.
        </p>
      </div>

      {/* Main Donation Container Card */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden reveal-zoom p-6 sm:p-10 lg:p-12 space-y-8">
        
        {/* Method Selection Tabs (Interac First, Credit Card Second) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('interac')}
            className={`py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              activeTab === 'interac'
                ? 'bg-white text-[#0A3E88] shadow-md border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-5 h-5 text-[#0A3E88]" />
            <span>Interac e-Transfer (100% Free)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              activeTab === 'card'
                ? 'bg-white text-[#0A3E88] shadow-md border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-5 h-5 text-[#FF0000]" />
            <span>Credit Card / Apple Pay</span>
          </button>
        </div>

        {/* TAB 1: INTERAC E-TRANSFER (FIRST & DEFAULT) */}
        {activeTab === 'interac' && (
          <div className="space-y-6 animate-slide-up-fade">
            
            <div className="p-5 rounded-2xl bg-[#EEF4FC] border border-blue-100 text-sm text-slate-700 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-base text-[#0A3E88]">
                  Donate via Direct Interac e-Transfer
                </p>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  100% Free (0% Processing Fees)
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every dollar donated via Interac e-Transfer deposits 100% directly into Soham's campaign account with zero processing fee deductions.
              </p>
            </div>

            {/* Mandatory Compliance Checkboxes (Placed FIRST above the email) */}
            <div className="space-y-3.5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700">
                Step 1: Statutory Compliance Confirmations <span className="text-[#FF0000]">*</span>
              </p>

              {/* Checkbox 1: Residency & Limits */}
              <label className="flex items-start gap-3.5 cursor-pointer p-4 rounded-2xl bg-red-50/70 border border-red-200/90 transition-colors hover:bg-red-50">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer shrink-0"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  I confirm that I am an individual normally resident in Ontario, I am contributing my own funds, and my total contributions to this campaign will not exceed $1,200. <span className="text-[#FF0000]">*</span>
                </span>
              </label>

              {/* Checkbox 2: Mandatory Memo Requirement (s. 88.22(1)(g)) */}
              <label className="flex items-start gap-3.5 cursor-pointer p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 transition-colors hover:bg-blue-50">
                <input
                  type="checkbox"
                  checked={isMemoConfirmed}
                  onChange={(e) => setIsMemoConfirmed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded text-[#0A3E88] focus:ring-blue-500 border-slate-300 cursor-pointer shrink-0"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  I confirm that I will include my <u>Full Legal Name</u> and <u>Residential Address</u> in the e-Transfer message/memo box as required under s. 88.22(1)(g) of the <em>Municipal Elections Act, 1996</em> for official receipt issuance. <span className="text-[#FF0000]">*</span>
                </span>
              </label>
            </div>

            {/* Step 2: Unlocked Campaign e-Transfer Email (Always visible) */}
            <div className="space-y-3.5 pt-2">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700">
                Step 2: Official Campaign e-Transfer Email
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
                  <span className="font-black text-lg sm:text-xl text-[#0A3E88] truncate select-all">
                    {interacEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-5 py-3 rounded-xl bg-[#0A3E88] hover:bg-[#08326E] text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4.5 h-4.5 text-emerald-400" />
                        <span>Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4.5 h-4.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Auto-deposit is enabled on <strong className="text-slate-900">{interacEmail}</strong>. Please ensure your legal name & residential address are entered in your banking app's memo field.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CREDIT CARD / APPLE PAY (STRIPE) */}
        {activeTab === 'card' && (
          <div className="space-y-6 animate-slide-up-fade">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Select Contribution Amount
                </span>
                <span className="text-xs font-bold text-[#0A3E88] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Secure Stripe Checkout
                </span>
              </div>
              
              {/* Preset Amount Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-1">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-4 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer border ${
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

            <div className="p-5 rounded-2xl bg-[#EEF4FC] border border-blue-100 text-sm text-slate-700 space-y-1">
              <p className="font-bold text-[#0A3E88] text-base">
                Secure Instant Online Contribution
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Support Soham Patel’s grassroots campaign for Windsor Ward 9. Fast, encrypted checkout supporting Visa, Mastercard, American Express, Apple Pay, and Google Pay.
              </p>
            </div>

            {/* Statutory Confirmation Checkbox */}
            <label className="flex items-start gap-3.5 cursor-pointer p-4 rounded-2xl bg-red-50/70 border border-red-200/90 transition-colors hover:bg-red-50">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer shrink-0"
              />
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                I confirm that I am an individual normally resident in Ontario, I am contributing my own funds, and my total contributions to this campaign will not exceed $1,200. <span className="text-[#FF0000]">*</span>
              </span>
            </label>

            {/* Action Button to Launch Stripe Checkout */}
            <button
              type="button"
              onClick={handleStripeRedirect}
              disabled={!isConfirmed}
              className={`w-full py-4.5 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 ${
                isConfirmed
                  ? 'bg-[#FF0000] hover:bg-[#D90000] text-white hover:shadow-lg cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-75'
              }`}
            >
              <span>Continue to Secure Checkout (${selectedAmount})</span>
              <ExternalLink className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        {/* Statutory Ontario Municipal Elections Act, 1996 Compliance Disclosure */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-2.5">
          <div className="flex items-center gap-2 font-black uppercase tracking-wider text-xs sm:text-sm text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Statutory Campaign Contribution Rules (Municipal Elections Act, 1996)</span>
          </div>
          <ul className="text-xs sm:text-sm text-amber-900/90 space-y-2 list-disc list-inside leading-relaxed">
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

    </section>
  );
};
