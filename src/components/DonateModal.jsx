import React, { useState, useEffect, useRef } from 'react';
import { X, CreditCard, Send, Check, Copy, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('interac'); // Default to Interac e-Transfer first
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMemoConfirmed, setIsMemoConfirmed] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  const stripeUrl = import.meta.env.VITE_STRIPE_DONATION_URL || 'https://donate.stripe.com/8x214m6fRc9H0JD9SOaVa00';
  const interacEmail = import.meta.env.VITE_INTERAC_DONATION_EMAIL || 'sohamforcouncil@gmail.com';

  const presetAmounts = [25, 50, 100, 250, 500];

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setIsMemoConfirmed(false);
      setEmailUpdates(false);
      setIsCustom(false);
      setCustomAmount('');
      setSelectedAmount(100);
    }

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

  const handlePresetSelect = (amt) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setSelectedAmount(num);
    } else {
      setSelectedAmount(0);
    }
  };

  const isAmountValid = selectedAmount >= 5 && selectedAmount <= 1200;

  const handleStripeRedirect = () => {
    if (!isConfirmed) return;

    // Send opt-in consent to Google Sheets Webhook
    const webhookUrl = 
      import.meta.env.VITE_GOOGLE_SHEETS_DONATE_URL || 
      import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      const payload = {
        formType: 'Donate Opt-In',
        submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
        periodicUpdates: emailUpdates ? 'Yes' : 'No'
      };

      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      }).catch((err) => console.error('[DonateModal] Webhook error:', err));
    }

    let finalUrl = stripeUrl;
    if (selectedAmount && selectedAmount > 0) {
      const sep = finalUrl.includes('?') ? '&' : '?';
      const cents = Math.round(selectedAmount * 100);
      finalUrl = `${finalUrl}${sep}prefilled_amount=${cents}&amount=${selectedAmount}`;
    }
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-slide-up-fade">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        
        {/* Top Header (Blue #0A3E88) */}
        <div className="p-6 sm:p-7 bg-[#0A3E88] text-white border-b border-blue-900 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>SUPPORT THE CAMPAIGN</span>
              <Heart className="w-5 h-5 text-[#FF0000] fill-current" />
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-snug">
            Every dollar goes straight to reaching Ward 9 voters - signs, flyers, and boots on the ground
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Method Selection Tabs (Interac First, Credit Card Second) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
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
          </div>

          {/* TAB 1: INTERAC E-TRANSFER (FIRST & DEFAULT) */}
          {activeTab === 'interac' && (
            <div className="space-y-5 animate-slide-up-fade">
              
              <div className="p-4 rounded-2xl bg-[#EEF4FC] border border-blue-100 text-xs sm:text-sm text-slate-700 space-y-1">
                <p className="font-bold text-[#0A3E88]">
                  Donate via Direct e-Transfer
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Every dollar donated via Interac e-Transfer deposits 100% directly into Soham's campaign account with zero fee deductions.
                </p>
              </div>

              {/* Mandatory Compliance Checkboxes (Placed FIRST above the email) */}
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Step 1: Statutory Compliance Confirmations <span className="text-[#FF0000]">*</span>
                </p>

                {/* Checkbox 1: Residency & Limits */}
                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-red-50/70 border border-red-200/90 transition-colors hover:bg-red-50">
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="mt-0.5 w-4.5 h-4.5 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer shrink-0"
                  />
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    I confirm that I am an individual normally resident in Ontario, I am contributing my own funds, and my total contributions to this campaign will not exceed $1,200. <span className="text-[#FF0000]">*</span>
                  </span>
                </label>

                {/* Checkbox 2: Mandatory Memo Requirement (s. 88.22(1)(g)) */}
                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 transition-colors hover:bg-blue-50">
                  <input
                    type="checkbox"
                    checked={isMemoConfirmed}
                    onChange={(e) => setIsMemoConfirmed(e.target.checked)}
                    className="mt-0.5 w-4.5 h-4.5 rounded text-[#0A3E88] focus:ring-blue-500 border-slate-300 cursor-pointer shrink-0"
                  />
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    I confirm that I will include my <u>Full Legal Name</u> and <u>Residential Address</u> in the e-Transfer message/memo box as required under s. 88.22(1)(g) of the <em>Municipal Elections Act, 1996</em> for official receipt issuance. <span className="text-[#FF0000]">*</span>
                  </span>
                </label>

              </div>

              {/* Step 2: Unlocked Campaign e-Transfer Email */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Step 2: Official Campaign e-Transfer Email
                </p>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
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

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Auto-deposit is enabled on <strong className="text-slate-900">{interacEmail}</strong>. Please include your legal name, residential address, & email in your banking app's memo field for official receipt issuance & campaign updates.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CREDIT CARD / APPLE PAY (STRIPE) */}
          {activeTab === 'card' && (
            <div className="space-y-5 animate-slide-up-fade">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Online Card Contribution
                </span>
                <span className="text-[11px] font-bold text-[#0A3E88] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  Secure Stripe Checkout
                </span>
              </div>

              {/* Statutory Confirmation Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-red-50/70 border border-red-200/90 transition-colors hover:bg-red-50">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 w-4.5 h-4.5 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer shrink-0"
                />
                <span className="text-xs font-bold text-slate-800 leading-snug">
                  I confirm that I am an individual normally resident in Ontario, I am contributing my own funds, and my total contributions to this campaign will not exceed $1,200. <span className="text-[#FF0000]">*</span>
                </span>
              </label>

              {/* Action Button to Launch Stripe Checkout */}
              <button
                type="button"
                onClick={handleStripeRedirect}
                disabled={!isConfirmed}
                className={`w-full py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                  isConfirmed
                    ? 'bg-[#FF0000] hover:bg-[#D90000] text-white hover:shadow-lg cursor-pointer'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-75'
                }`}
              >
                <span>Continue to Secure Checkout</span>
                <ExternalLink className="w-4 h-4" />
              </button>
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
