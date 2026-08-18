import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, AlertCircle, MessageSquare } from 'lucide-react';
import { formatPhoneNumber } from './LawnSignModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ContactSection = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Question',
    message: '',
    _hp_website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required so Soham can reply to you';
    if (!formData.message.trim()) newErrors.message = 'Please enter your question or message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Autofill Safety: Only block if honeypot is filled AND event is NOT trusted
    if (formData._hp_website && !e.isTrusted) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    const webhookUrl = 
      import.meta.env.VITE_GOOGLE_SHEETS_CONTACT_URL || 
      import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const payload = {
          formType: 'Question / Contact',
          submittedAt: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          topic: formData.topic,
          message: formData.message.trim()
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
      console.error('[ContactSection] Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Could not send your message. Please try again or contact Soham directly via phone/email.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'General Question',
      message: '',
      _hp_website: ''
    });
    setErrors({});
  };

  return (
    <section id="contact" className="scroll-mt-24 w-full max-w-5xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 space-y-2 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Contact Soham
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed pt-1">
          Have a question about the campaign, an idea for Ward 9, or a neighborhood concern? Send Soham a direct message below or reach out via phone and email.
        </p>
      </div>

      {/* Direct Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal-zoom">
        
        {/* Phone Card (Interactive link with hover effect) */}
        <a 
          href="tel:5199909999" 
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm card-hover-lift flex items-start gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#EEF4FC] text-[#0A3E88] group-hover:bg-[#FF0000] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">Phone Hotline</span>
            <span className="text-lg font-black text-[#0A3E88] group-hover:text-[#FF0000] transition-colors block">(519) 990-9999</span>
            <span className="text-xs text-slate-500">Call or leave a voicemail</span>
          </div>
        </a>

        {/* Email Card (Interactive link with hover effect) */}
        <a 
          href="mailto:soham@sohampatel.ca" 
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm card-hover-lift flex items-start gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#EEF4FC] text-[#0A3E88] group-hover:bg-[#FF0000] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">Email Address</span>
            <span className="text-lg font-black text-[#0A3E88] group-hover:text-[#FF0000] transition-colors block">soham@sohampatel.ca</span>
            <span className="text-xs text-slate-500">Direct campaign inbox</span>
          </div>
        </a>

        {/* Ward Location Card (Static info block - no hover lift) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF4FC] text-[#0A3E88] flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#FF0000]" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">Ward 9 Focus</span>
            <span className="text-lg font-black text-[#0A3E88] block">South & East Windsor</span>
            <span className="text-xs text-slate-500">Windsor, Ontario</span>
          </div>
        </div>

      </div>

      {/* "Ask Soham a Question" Google-Forms-Style Card (Static container - no hover lift) */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl reveal-up">
        
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0A3E88] text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0A3E88]">
              Ask Me Questions / Share Your Voice
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your question directly to Soham's inbox. All inquiries are reviewed personally.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 text-[#FF0000] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black uppercase text-[#0A3E88]">
              Thank You for Reaching Out, {formData.name}!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your question regarding <strong className="text-slate-900">{formData.topic}</strong> has been delivered to Soham. He will respond to your email at <strong className="text-slate-900">{formData.email}</strong> shortly.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-8 py-3 rounded-full bg-[#0A3E88] hover:bg-[#08326E] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              Ask Another Question
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Anti-Bot Honeypot */}
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

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Your Full Name <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="First and last name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Your Email Address <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Phone & Topic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(519) 555-0123"
                  maxLength={14}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Question Category / Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all bg-white"
                >
                  <option value="General Question">General Campaign Question</option>
                  <option value="Roads & Storm Drainage Resilience">Roads & Storm Drainage Resilience</option>
                  <option value="Traffic Calming & Neighborhood Safety">Traffic Calming & Neighborhood Safety</option>
                  <option value="Parks, Trees & Youth Spaces">Parks, Trees & Youth Spaces</option>
                  <option value="City Budget & Tax Transparency">City Budget & Tax Transparency</option>
                  <option value="Host a Coffee / Meet & Greet">Host a Coffee Meet & Greet</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Your Question / Message <span className="text-[#FF0000]">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What would you like to ask Soham or discuss about Ward 9?"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-[#FF0000] focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none"
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* Submit Button (Red #FF0000) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Question...</span>
                </>
              ) : (
                <>
                  <span>Send Question to Soham</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>

    </section>
  );
};
