import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { formatPhoneNumber } from './LawnSignModal';

export const VolunteerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bestTimeToCall: 'Evening (5pm - 8pm)',
    comments: '',
    _hp_website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const renderTimeRef = useRef(Date.now());
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
      import.meta.env.VITE_GOOGLE_SHEETS_VOLUNTEER_URL || 
      import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const payload = {
          formType: 'Volunteer',
          submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          bestTimeToCall: formData.bestTimeToCall,
          comments: formData.comments.trim()
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
      console.error('[VolunteerModal] Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Could not record your volunteer info. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bestTimeToCall: 'Evening (5pm - 8pm)',
      comments: '',
      _hp_website: ''
    });
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
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            JOIN THE CAMPAIGN
          </h3>
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
                Welcome to Team Soham, {formData.firstName}!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for offering your time and energy to help shape the future of Windsor Ward 9. Our campaign coordinator will be in touch with you shortly.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-8 py-3 rounded-full bg-[#0A3E88] hover:bg-[#08326E] text-white font-black text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Knock a few doors. Make a few calls. Put up a lawn sign. Whatever you can give, it moves the needle in Ward 9.
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

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              {/* Best Time to Call */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Best Time to Call
                </label>
                <select
                  value={formData.bestTimeToCall}
                  onChange={(e) => setFormData({ ...formData, bestTimeToCall: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all bg-white"
                >
                  <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                  <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                  <option value="Evening (5pm - 8pm)">Evening (5pm - 8pm)</option>
                  <option value="Weekends Only">Weekends Only</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>

              {/* Open-Ended Comments / Ideas */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Comments, Creative Ideas or Ways You'd Like to Help
                </label>
                <textarea
                  rows={3}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Tell us what you're interested in..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Periodic Campaign Updates Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.emailUpdates !== false}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-[#FF0000] focus:ring-red-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  Send me periodic campaign updates, community announcements, and election day reminders.
                </span>
              </label>

              {/* Submit Button (Blue #0A3E88) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#0A3E88] hover:bg-[#08326E] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Info...</span>
                  </>
                ) : (
                  <span>Sign Up to Support</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
