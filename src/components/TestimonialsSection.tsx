import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { usePortfolio } from '../context/CustomizerContext';

export const TestimonialsSection: React.FC = () => {
  const { accentTheme, triggerHoverSound, triggerClickSound, setCursorVariant } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    triggerClickSound();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    triggerClickSound();
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10 relative bg-[#0A0A0A] overflow-hidden">
      {/* Background Stardust */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-grain" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 text-[10px] font-mono-code tracking-[0.25em] text-white/50 uppercase">
            <span className="w-8 h-[1px] bg-white/20" />
            <span>09 // CLIENT ENDORSEMENTS &amp; TESTIMONIALS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-10 h-10 border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-10 h-10 border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 bg-[#141414] border border-white/15 shadow-2xl relative"
          >
            <Quote
              size={42}
              className="mb-8 opacity-40"
              style={{ color: accentTheme.hex }}
            />

            <p className="font-editorial text-2xl sm:text-4xl text-white leading-relaxed italic font-light mb-10">
              "{current.quote}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-12 h-12 grayscale object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-display font-bold text-base text-white uppercase">
                    {current.clientName}
                  </h4>
                  <div className="text-[11px] font-mono-code text-white/50">
                    {current.clientRole} • {current.company}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest">
                // PROJECT: {current.project}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 transition-all ${
                currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
