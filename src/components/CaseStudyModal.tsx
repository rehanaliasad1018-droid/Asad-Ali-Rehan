import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Copy, Check, Sparkles, ExternalLink, Award, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { PROJECTS } from '../data/portfolioData';

export const CaseStudyModal: React.FC = () => {
  const {
    activeProject,
    closeProject,
    openProject,
    accentTheme,
    showToast,
    setCursorVariant,
    triggerHoverSound,
    triggerClickSound,
  } = usePortfolio();

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProject]);

  if (!activeProject) return null;

  const caseStudy = activeProject.caseStudy;
  const currentIndex = PROJECTS.findIndex((p) => p.id === activeProject.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleCopyHex = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${name} (${hex}) to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${activeProject.title} — Case Study`,
        text: activeProject.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto"
      >
        {/* Background Stardust */}
        <div className="fixed inset-0 opacity-[0.035] pointer-events-none bg-grain" />

        {/* Sticky Minimal Navigation Header */}
        <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={closeProject}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex items-center gap-2 text-[10px] font-mono-code tracking-[0.2em] text-white/50 hover:text-white uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">BACK TO ARCHIVE</span>
            </button>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="text-xs font-mono-code text-white/80 font-bold uppercase truncate max-w-xs sm:max-w-md">
              {activeProject.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all bg-[#141414] cursor-pointer"
              title="Share Project"
            >
              <Share2 size={14} />
            </button>

            <button
              onClick={closeProject}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-4 py-2 border border-white/20 bg-white/10 hover:bg-white text-white hover:text-black font-mono-code text-[10px] tracking-[0.15em] font-bold uppercase transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>CLOSE</span>
              <X size={13} />
            </button>
          </div>
        </header>

        {/* Case Study Body Container */}
        <main className="max-w-6xl mx-auto px-6 sm:px-8 py-12 lg:py-16 relative z-10">
          {/* Section 1: Hero Banner & Quick Facts */}
          <div className="mb-16">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="px-3 py-1 text-[9px] font-mono-code font-bold uppercase text-black"
                style={{ backgroundColor: accentTheme.hex }}
              >
                {activeProject.category}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono-code text-white/70">
                {activeProject.year}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-mono-code text-white/50">
                CLIENT: {activeProject.client}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] mb-6">
              {activeProject.title}
            </h1>

            <p className="font-editorial text-2xl sm:text-3xl text-white/80 italic font-light max-w-3xl leading-relaxed mb-10">
              "{caseStudy.tagline}"
            </p>

            {/* Hero Visual Image */}
            <div className="relative aspect-[16/9] overflow-hidden border border-white/15 shadow-2xl mb-12 bg-[#141414]">
              <img
                src={activeProject.heroImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#141414] border border-white/10">
              <div>
                <div className="text-[9px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-1">
                  ROLE &amp; FUNCTION
                </div>
                <div className="text-xs font-mono-code text-white font-bold">
                  {caseStudy.role}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-1">
                  TIMELINE / DURATION
                </div>
                <div className="text-xs font-mono-code text-white font-bold">
                  {caseStudy.duration}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-1">
                  CLIENT / SECTOR
                </div>
                <div className="text-xs font-mono-code text-white font-bold">
                  {activeProject.client}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-1">
                  TOOLS USED
                </div>
                <div className="text-xs font-mono-code text-white/80 font-bold truncate">
                  {activeProject.tools.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Creative Challenge & Strategic Approach */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-t border-white/10 pt-16">
            <div className="lg:col-span-4">
              <div className="text-[10px] font-mono-code tracking-[0.2em] text-white/40 uppercase mb-2">
                // 01. THE BRIEF &amp; OBJECTIVE
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                THE CREATIVE CHALLENGE
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light mb-6">
                {caseStudy.challenge}
              </p>
              <div className="p-6 bg-[#141414] border border-white/10">
                <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-3">
                  // SCOPE OF DELIVERABLES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {caseStudy.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-mono-code text-white/80">
                      <div className="w-1.5 h-1.5" style={{ backgroundColor: accentTheme.hex }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Design Approach & Conceptual Rationale */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-t border-white/10 pt-16">
            <div className="lg:col-span-4">
              <div className="text-[10px] font-mono-code tracking-[0.2em] text-white/40 uppercase mb-2">
                // 02. STRATEGY &amp; SYSTEM
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                THE DESIGN APPROACH
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                {caseStudy.approach}
              </p>
            </div>
          </div>

          {/* Section 4: Brand Visual Direction (Palette & Typography Specimen) */}
          <div className="mb-20 border-t border-white/10 pt-16">
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-white/40 uppercase">
              <span>// 03. VISUAL LANGUAGE &amp; DESIGN TOKENS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase mb-8">
              {caseStudy.visualDirection.title}
            </h2>

            {/* Color Swatches Grid with Click-to-Copy */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {caseStudy.visualDirection.colors.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => handleCopyHex(color.hex, color.name)}
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="group p-4 bg-[#141414] border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                >
                  <div
                    className="aspect-square mb-3 border border-white/10 relative flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1.5 text-[9px] font-mono-code font-bold text-white flex items-center gap-1.5">
                      {copiedHex === color.hex ? <Check size={11} className="text-[#00FF00]" /> : <Copy size={11} />}
                      <span>{copiedHex === color.hex ? 'COPIED' : 'COPY HEX'}</span>
                    </div>
                  </div>

                  <div className="text-xs font-mono-code font-bold text-white uppercase">
                    {color.name}
                  </div>
                  <div className="text-[10px] font-mono-code text-white/40 flex items-center justify-between mt-0.5">
                    <span>{color.hex}</span>
                    <span>{color.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Typography Specimen Box */}
            <div className="p-6 sm:p-8 bg-[#141414] border border-white/15">
              <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em] mb-4">
                // TYPOGRAPHIC HIERARCHY &amp; SPECIMEN
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudy.visualDirection.typography.map((type, idx) => (
                  <div key={type.name} className="border-l-2 pl-4" style={{ borderColor: accentTheme.hex }}>
                    <div className="text-[10px] font-mono-code text-white/40 mb-1">
                      {idx === 0 ? 'Primary Display Face' : 'Secondary Body & Annotation'}
                    </div>
                    <div className="font-display font-bold text-2xl text-white uppercase">
                      {type.name}
                    </div>
                    <div className="text-xs font-mono-code text-zinc-300 mt-1">
                      {type.style}
                    </div>
                    <p className="text-xs text-white/50 mt-2 font-light">
                      {type.usage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: High-Resolution Mockup Gallery */}
          <div className="mb-20 border-t border-white/10 pt-16">
            <div className="text-[10px] font-mono-code tracking-[0.25em] text-white/40 uppercase mb-4">
              // 04. MULTI-ANGLE VISUAL APPLICATIONS &amp; ARTIFACTS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase mb-8">
              FINAL ARTWORK &amp; REAL-WORLD MOCKUPS
            </h2>

            <div className="flex flex-col gap-8">
              {caseStudy.mockups.map((mockup, index) => (
                <div
                  key={index}
                  className="border border-white/15 bg-[#141414] shadow-2xl p-4 sm:p-6"
                >
                  <div className="overflow-hidden relative mb-4">
                    <img
                      src={mockup.url}
                      alt={mockup.title}
                      className="w-full h-auto object-cover max-h-[700px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                    <h4 className="font-display font-bold text-lg text-white uppercase">
                      {mockup.title}
                    </h4>
                    <p className="text-xs font-mono-code text-white/50">
                      {mockup.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Results & Commercial Impact */}
          <div className="mb-20 border-t border-white/10 pt-16">
            <div className="text-[10px] font-mono-code tracking-[0.25em] text-white/40 uppercase mb-4">
              // 05. MEASURABLE OUTCOMES
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase mb-8">
              RESULTS &amp; COMMERCIAL IMPACT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.impact.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-[#141414] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-2"
                      style={{ color: accentTheme.hex }}
                    >
                      {stat.metric}
                    </div>
                    <div className="text-xs font-mono-code text-white font-bold uppercase tracking-wider mb-2">
                      {stat.label}
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote if available */}
            {caseStudy.testimonial && (
              <div className="mt-8 p-8 bg-[#141414] border border-white/15 relative overflow-hidden">
                <p className="font-editorial text-xl sm:text-2xl text-zinc-200 italic font-light leading-relaxed mb-4">
                  "{caseStudy.testimonial.quote}"
                </p>
                <div className="flex items-center justify-between text-xs font-mono-code text-white/50">
                  <span className="text-white font-bold uppercase">{caseStudy.testimonial.author}</span>
                  <span>{caseStudy.testimonial.title}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 7: Next & Previous Project Switcher */}
          <div className="border-t border-white/15 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => openProject(prevProject)}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-full sm:w-auto p-6 bg-[#141414] border border-white/10 hover:border-white/30 text-left transition-all group flex items-center gap-4 cursor-pointer"
            >
              <ArrowLeft size={18} className="text-zinc-500 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[9px] font-mono-code text-white/40 uppercase block tracking-wider">PREVIOUS PROJECT</span>
                <span className="font-display font-bold text-sm text-white uppercase group-hover:text-zinc-200">
                  {prevProject.title.split('—')[0]}
                </span>
              </div>
            </button>

            <button
              onClick={closeProject}
              className="text-[10px] font-mono-code text-white/50 hover:text-white uppercase tracking-[0.2em] cursor-pointer"
            >
              [ RETURN TO ARCHIVE ]
            </button>

            <button
              onClick={() => openProject(nextProject)}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-full sm:w-auto p-6 bg-[#141414] border border-white/10 hover:border-white/30 text-right transition-all group flex items-center justify-end gap-4 cursor-pointer"
            >
              <div>
                <span className="text-[9px] font-mono-code text-white/40 uppercase block tracking-wider">NEXT PROJECT</span>
                <span className="font-display font-bold text-sm text-white uppercase group-hover:text-zinc-200">
                  {nextProject.title.split('—')[0]}
                </span>
              </div>
              <ArrowRight size={18} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
