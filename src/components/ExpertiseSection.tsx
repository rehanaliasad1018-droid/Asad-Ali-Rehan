import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { EXPERTISE_CATEGORIES } from '../data/portfolioData';
import { usePortfolio } from '../context/CustomizerContext';

export const ExpertiseSection: React.FC = () => {
  const { accentTheme, openInquiry, setCursorVariant, triggerHoverSound, triggerClickSound } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>(EXPERTISE_CATEGORIES[0].id);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const currentActive = EXPERTISE_CATEGORIES.find((c) => c.id === activeCategory) || EXPERTISE_CATEGORIES[0];

  return (
    <section id="expertise" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10 relative bg-[#0A0A0A]">
      {/* Background Stardust */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-white/50 uppercase">
              <span className="w-8 h-[1px] bg-white/20" />
              <span>05 // CORE DISCIPLINES &amp; EXPERTISE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              SPECIALIZED <span className="font-editorial italic font-light lowercase text-zinc-300">visual</span> CAPABILITIES.
            </h2>
          </div>

          <p className="max-w-md text-xs font-mono-code text-white/50 tracking-wider">
            // Delivering holistic visual ecosystems across brand strategy, commercial campaigns, social storytelling, and physical materiality.
          </p>
        </div>

        {/* Interactive Dual-Pane Expertise Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Category List */}
          <div className="lg:col-span-6 flex flex-col gap-2">
            {EXPERTISE_CATEGORIES.map((cat, index) => {
              const isSelected = activeCategory === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    triggerClickSound();
                  }}
                  onMouseEnter={() => {
                    setHoveredCategory(cat.id);
                    setCursorVariant('pointer');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => {
                    setHoveredCategory(null);
                    setCursorVariant('default');
                  }}
                  whileHover={{ x: 4 }}
                  className={`p-5 sm:p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#141414] border-white/30 shadow-xl'
                      : 'bg-[#111111] border-white/10 hover:border-white/20 hover:bg-[#161616]'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="expertiseActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: accentTheme.hex }}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className="text-[10px] font-mono-code font-bold"
                        style={{ color: isSelected ? accentTheme.hex : 'rgba(255,255,255,0.3)' }}
                      >
                        0{index + 1}
                      </span>
                      <h3 className={`font-display text-lg sm:text-xl font-bold uppercase transition-colors ${
                        isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code text-white/40 hidden sm:inline tracking-wider">
                        {cat.metrics}
                      </span>
                      <div
                        className={`w-7 h-7 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight size={14} className={isSelected ? 'rotate-45' : ''} />
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-white/50 pl-7 line-clamp-1 sm:line-clamp-2 font-light">
                    {cat.shortDesc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Rich Interactive Visual Preview Stage */}
          <div className="lg:col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActive.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 bg-[#141414] border border-white/15 shadow-2xl overflow-hidden relative"
              >
                {/* Visual Thumbnail Banner */}
                <div className="relative aspect-[16/9] overflow-hidden mb-6 group border border-white/10">
                  <img
                    src={currentActive.previewImage}
                    alt={currentActive.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className="px-3 py-1 text-[10px] font-mono-code font-bold uppercase text-black"
                      style={{ backgroundColor: accentTheme.hex }}
                    >
                      {currentActive.metrics}
                    </span>
                    <span className="text-[10px] font-mono-code text-white/80 bg-black/80 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                      VERIFIED PRODUCTION
                    </span>
                  </div>
                </div>

                {/* Detailed Narrative */}
                <h4 className="font-editorial text-3xl font-light italic text-white mb-2">
                  {currentActive.title}
                </h4>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-light">
                  {currentActive.description}
                </p>

                {/* Sub-Specialty Tags */}
                <div className="mb-6">
                  <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-2.5">
                    // KEY DELIVERABLES &amp; ARTIFACTS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentActive.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-[#1a1a1a] border border-white/10 text-[11px] font-mono-code text-white/80 flex items-center gap-1.5"
                      >
                        <Check size={11} className="text-[#00FF00]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-white/50">
                    Ready to elevate your visual identity?
                  </span>
                  <button
                    onClick={openInquiry}
                    onMouseEnter={() => {
                      setCursorVariant('pointer');
                      triggerHoverSound();
                    }}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="px-5 py-2.5 font-mono-code text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                    style={{ backgroundColor: accentTheme.hex, color: '#000000' }}
                  >
                    <span>INQUIRE NOW</span>
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
