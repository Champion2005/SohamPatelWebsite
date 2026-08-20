import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { searchWindsorAddress } from '../data/ward9Data';

// Helper function to auto-format North American phone numbers: (519) 555-0123
export function formatPhoneNumber(val) {
  if (!val) return '';
  const digits = val.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const LawnSignModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    emailUpdates: true,
    _hp_website: ''
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const renderTimeRef = useRef(Date.now());
  const debounceTimerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      renderTimeRef.current = Date.now();
      setErrorMessage('');
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

  const handleAddressChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, address: val }));
    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (val.trim().length < 3) {
      setAddressSuggestions([]);
      return;
    }

    setIsSearchingAddress(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchWindsorAddress(val);
        setAddressSuggestions(results);
      } catch {
        setAddressSuggestions([]);
      } finally {
        setIsSearchingAddress(false);
      }
    }, 300);
  };

  const handleSelectAddress = (item) => {
    setFormData(prev => ({ ...prev, address: item.label }));
    setAddressSuggestions([]);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Search and select your Windsor address';
    if (!formData.phone.trim() || formData.phone.length < 14) newErrors.phone = 'Complete 10-digit phone number is required';
    if (formData.email.trim() && !formData.email.includes('@')) newErrors.email = 'Please enter a valid email address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData._hp_website && !e.isTrusted) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    const webhookUrl = 
      import.meta.env.VITE_GOOGLE_SHEETS_LAWN_SIGN_URL || 
      import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const payload = {
          formType: 'Lawn Sign',
          submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          emailUpdates: formData.emailUpdates ? 'Yes' : 'No'
        };

        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('[LawnSignModal] Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Could not record your request. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      emailUpdates: true,
      _hp_website: ''
    });
    setAddressSuggestions([]);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-slide-up-fade">
      
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-lg rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        
        {/* Modal Top Header (Blue #0A3E88 with Red Accent) */}
        <div className="p-6 sm:p-8 bg-[#0A3E88] text-white flex items-center justify-between border-b border-blue-900">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FF0000] bg-white px-2 py-0.5 rounded-full inline-block">
              Show Your Support
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Request a Lawn Sign
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 text-[#FF0000] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black uppercase text-[#0A3E88]">
                Thank You, {formData.firstName}!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your lawn sign request for <strong className="text-slate-800">{formData.address}</strong> has been saved. Our campaign team will deliver and install your sign during campaign season.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-8 py-3 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get a free campaign lawn sign delivered right to your front yard. Support Soham Patel’s vision for Windsor Ward 9.
              </p>
              <p className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 p-2.5 rounded-xl leading-snug">
                <strong>Notice:</strong> Under s. 88.2 of the <em>Municipal Elections Act, 1996</em>, residential tenants and condominium owners/occupants have a protected legal right to display election campaign signs on their leased or unit premises.
              </p>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot Field */}
              <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1, overflow: 'hidden' }} aria-hidden="true">
                <input
                  type="text"
                  name="b_anti_bot_check"
                  tabIndex={-1}
                  autoComplete="new-password"
                  value={formData._hp_website}
                  onChange={(e) => setFormData({ ...formData, _hp_website: e.target.value })}
                />
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    First Name <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Last Name <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              {/* Searchable Address Input */}
              <div className="space-y-1.5 relative">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Street Address (Searchable) <span className="text-[#FF0000]">*</span></span>
                  {isSearchingAddress && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF0000]" />}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleAddressChange}
                    placeholder="Start typing your street address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  />
                </div>
                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}

                {addressSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 max-h-48 overflow-y-auto">
                    {addressSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectAddress(item)}
                        className="p-3 hover:bg-red-50 text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-2 transition-colors text-left"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone Number Field First */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Phone Number <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(226) 260-8869"
                  maxLength={14}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* Email Address Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Email Updates Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.emailUpdates}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  Send me periodic campaign updates, community announcements, and election day reminders.
                </span>
              </label>

              {/* Submit Button (Red #FF0000) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Request...</span>
                  </>
                ) : (
                  <span>Submit Lawn Sign Request</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
