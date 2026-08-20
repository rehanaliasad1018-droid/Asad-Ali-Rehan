import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Check, ArrowRight, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/CustomizerContext';

export const ProjectInquiryModal: React.FC = () => {
  const { isInquiryOpen, closeInquiry, profile, accentTheme, triggerSuccessSound, setCursorVariant, triggerHoverSound } = usePortfolio();

  const [services, setServices] = useState<string[]>(['Brand Identity']);
  const [budget, setBudget] = useState<string>('$10k — $25k');
  const [timeline, setTimeline] = useState<string>('1 — 2 Months');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isInquiryOpen) return null;

  const availableServices = [
    'Brand Identity & Guidelines',
    'Packaging & Dielines',
    'Commercial Campaigns & OOH',
    'Digital Design & Web',
    'Social Media Design Kit',
    'Art Direction & Styling',
  ];

  const budgetTiers = [
    '< $5,000',
    '$5,000 — $10,000',
    '$10,000 — $25,000',
    '$25,000+',
  ];

  const timelineOptions = [
    'Immediate (Within 2 Weeks)',
    '1 — 2 Months',
    '3 — 4 Months',
    'Flexible / Long-term',
  ];

  const toggleService = (srv: string) => {
    if (services.includes(srv)) {
      setServices(services.filter((s) => s !== srv));
    } else {
      setServices([...services, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    triggerSuccessSound();

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: [accentTheme.hex, '#ffffff', '#38bdf8', '#ff3366'],
      });
    } catch {}
  };

  const handleReset = () => {
    setIsSubmitted(false);
    closeInquiry();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeInquiry}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl bg-[#141414] border border-white/15 p-6 sm:p-10 shadow-2xl relative my-8"
        >
          {/* Close button */}
          <button
            onClick={closeInquiry}
            onMouseEnter={() => {
              setCursorVariant('pointer');
              triggerHoverSound();
            }}
            onMouseLeave={() => setCursorVariant('default')}
            className="absolute top-6 right-6 w-9 h-9 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-zinc-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-1">
                  <Sparkles size={12} style={{ color: accentTheme.hex }} />
                  <span>PROJECT INITIATION FORM</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  START A COLLABORATION
                </h3>
                <p className="text-xs text-white/50 font-mono-code mt-1">
                  // Please specify your project scope and objectives.
                </p>
              </div>

              {/* Contact Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-1.5 tracking-wider">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono-code focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-1.5 tracking-wider">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono-code focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-1.5 tracking-wider">
                  COMPANY / BRAND NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Studio Lumière"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono-code focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-2 tracking-wider">
                  REQUIRED DESIGN SERVICES
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableServices.map((srv) => {
                    const isChecked = services.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-1.5 text-[10px] font-mono-code tracking-[0.15em] uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                          isChecked
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'bg-[#1c1c1c] text-white/50 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                        <span>{srv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-2 tracking-wider">
                  ESTIMATED BUDGET TIER
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetTiers.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`p-2.5 text-[10px] font-mono-code text-center uppercase transition-all cursor-pointer ${
                        budget === b
                          ? 'border text-white font-bold'
                          : 'bg-[#1c1c1c] text-white/50 border border-white/10 hover:border-white/20'
                      }`}
                      style={{
                        borderColor: budget === b ? accentTheme.hex : undefined,
                        backgroundColor: budget === b ? 'rgba(255, 255, 255, 0.05)' : undefined,
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase block mb-1.5 tracking-wider">
                  PROJECT BRIEF &amp; OBJECTIVES
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your vision, target audience, deliverables, or inspiration links..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono-code focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full py-4 font-mono-code text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors cursor-pointer shadow-xl"
                style={{
                  backgroundColor: accentTheme.hex,
                  color: '#000000',
                }}
              >
                <Send size={14} />
                <span>SEND PROJECT BRIEF</span>
              </button>
            </form>
          ) : (
            <div className="py-8 flex flex-col items-center text-center">
              <div
                className="w-14 h-14 flex items-center justify-center text-black mb-6 shadow-2xl"
                style={{ backgroundColor: accentTheme.hex }}
              >
                <CheckCircle size={28} />
              </div>

              <h3 className="font-display font-black text-3xl text-white uppercase mb-2">
                BRIEF TRANSMITTED
              </h3>

              <p className="font-editorial text-xl text-zinc-300 italic max-w-md mb-8 font-light">
                "Thank you, {formData.name || 'friend'}. Your project brief has been received. I review all inquiries within 24 business hours."
              </p>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white text-black font-mono-code text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                CLOSE INQUIRY
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
