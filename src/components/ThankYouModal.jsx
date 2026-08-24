import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Heart, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const ThankYouModal = ({ isOpen, onClose, onNavigateHome }) => {
  const modalRef = useRef(null);

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

  const handleHomeClick = () => {
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-slide-up-fade">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleHomeClick} />

      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-lg rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scale-up"
      >
        {/* Header (Deep Blue #0A3E88) */}
        <div className="p-6 sm:p-8 bg-[#0A3E88] text-white border-b border-blue-900 relative text-center space-y-2 overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/20 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={handleHomeClick}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
            Thank You For Your Contribution!
          </h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-center">
          
          <div className="space-y-3">
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              An official statutory contribution receipt has been emailed to you for your financial records under Ontario’s <span className="font-semibold text-slate-800">Municipal Elections Act, 1996</span>.
            </p>
          </div>

          {/* Quote Block */}
          <div className="p-5 rounded-2xl bg-[#EEF4FC] border border-blue-100 text-left space-y-2">
            <p className="text-xs sm:text-sm font-semibold italic text-[#0A3E88] leading-relaxed">
              "Together, we are building a safer, stronger, and more responsive community for Ward 9."
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-[#FF0000] block text-right">
              — Soham Patel
            </span>
          </div>

          {/* Statutory Notice */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Authorized by Soham Patel Campaign</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleHomeClick}
              className="w-full py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Back to Campaign Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
