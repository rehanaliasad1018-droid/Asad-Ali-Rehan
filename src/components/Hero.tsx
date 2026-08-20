import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles, Globe2, Calculator, FlaskConical, Command, FileText } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { PROJECTS } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const { profile, accentTheme, openInquiry, openProject, openEstimator, openResume, openCommandPalette, setCursorVariant, triggerHoverSound } = usePortfolio();

  // Local Time Capital State
  const [timeNY, setTimeNY] = useState('');
  const [timeLDN, setTimeLDN] = useState('');
  const [timeTYO, setTimeTYO] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeNY(now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setTimeLDN(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setTimeTYO(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLab = () => {
    const labSection = document.getElementById('design-lab');
    if (labSection) {
      labSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const project1 = PROJECTS[0];
  const project2 = PROJECTS[1] || PROJECTS[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 bg-[#0A0A0A] text-[#F5F5F5] select-none"
    >
      {/* Stardust Texture Layer */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-grain" />

      {/* Top Meta Bar */}
      <div className="w-full px-6 sm:px-12 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono-code text-white/50 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/60 font-medium">
              {profile.status}
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span className="hidden sm:inline tracking-[0.2em] uppercase text-white/40">{profile.location}</span>
        </div>

        {/* Global Creative Studio Clocks & Shortcut */}
        <div className="flex items-center gap-6 text-white/40">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Globe2 size={11} className="text-white/30" />
              <span className="text-white/60 font-medium">NYC:</span>
              <span>{timeNY || '17:40:00'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/60 font-medium">LON:</span>
              <span>{timeLDN || '22:40:00'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/60 font-medium">TYO:</span>
              <span>{timeTYO || '06:40:00'}</span>
            </div>
          </div>

          <button
            onClick={openCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/5 hover:border-white/40 text-[10px] font-mono-code text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <Command size={11} />
            <span>CMD+K COMMANDS</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid (7 : 5 Architectural Split) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 z-10">
        {/* Left Column: Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 py-12 sm:py-16 lg:border-r border-white/10 relative">
          <div className="mb-4 flex items-center gap-2">
            <span
              className="text-[9px] font-mono-code font-bold uppercase tracking-[0.25em]"
              style={{ color: accentTheme.hex }}
            >
              01 // SENIOR ART DIRECTOR &amp; DESIGNER
            </span>
          </div>

          {/* Sized cleanly and powerfully with refined proportional scale */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9.5vw] sm:text-[7.8vw] md:text-[6.2vw] lg:text-[68px] xl:text-[84px] leading-[0.90] font-black uppercase tracking-tight mb-6 font-display"
          >
            Senior<br />
            Graphic<br />
            <span
              className="text-transparent inline-block"
              style={{ WebkitTextStroke: '1px #F5F5F5' }}
            >
              Designer.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6 p-3 bg-white/[0.03] border border-white/10 max-w-md"
          >
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover border border-white/20 shrink-0"
              />
            )}
            <div className="min-w-0">
              <div className="text-[9px] font-mono-code text-white/40 tracking-[0.2em] uppercase">DIRECTOR // PRACTITIONER</div>
              <div className="text-xs font-mono-code text-white font-bold tracking-wider uppercase truncate">{profile.name}</div>
              <div className="text-[10px] font-mono-code text-white/60 truncate">{profile.title}</div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed mb-8"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 items-center mb-6"
          >
            <button
              onClick={scrollToWork}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer shadow-xl flex items-center gap-2"
              style={{
                backgroundColor: accentTheme.hex,
                color: '#000000',
              }}
            >
              <span>View My Work</span>
              <ArrowDown size={14} />
            </button>

            <button
              onClick={openInquiry}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="border border-white/30 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center gap-2 hover:border-white hover:bg-white/5"
            >
              <span>Let's Connect</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              onClick={openEstimator}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="border border-white/20 bg-white/5 text-white/80 hover:text-white px-4 py-3.5 text-[10px] font-mono-code font-bold tracking-[0.15em] uppercase transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calculator size={13} style={{ color: accentTheme.hex }} />
              <span>Project Estimator</span>
            </button>

            <button
              onClick={openResume}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="border border-white/20 bg-white/5 text-white/80 hover:text-white px-4 py-3.5 text-[10px] font-mono-code font-bold tracking-[0.15em] uppercase transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={13} style={{ color: accentTheme.hex }} />
              <span>Executive CV</span>
            </button>
          </motion.div>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 text-[10px] font-mono-code text-white/50">
            <span className="text-white/30">DISCOVER:</span>
            <button
              onClick={scrollToLab}
              className="hover:text-white hover:underline cursor-pointer flex items-center gap-1"
            >
              <FlaskConical size={11} style={{ color: accentTheme.hex }} />
              <span>Interactive Design Lab</span>
            </button>
            <span>•</span>
            <button
              onClick={openEstimator}
              className="hover:text-white hover:underline cursor-pointer"
            >
              Cost &amp; Timeline Calculator
            </button>
            <span>•</span>
            <button
              onClick={openCommandPalette}
              className="hover:text-white hover:underline cursor-pointer"
            >
              ⌘K Quick Palette
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Visual Showcase (Grid Rows 01 & 02) */}
        <div className="lg:col-span-5 grid grid-rows-1 lg:grid-rows-2 border-t lg:border-t-0 border-white/10">
          {/* Card 01 */}
          <div
            onClick={() => openProject(project1)}
            onMouseEnter={() => {
              setCursorVariant('project');
              triggerHoverSound();
            }}
            onMouseLeave={() => setCursorVariant('default')}
            className="relative group overflow-hidden border-b border-white/10 cursor-pointer min-h-[280px] lg:min-h-0 flex flex-col justify-end p-8 bg-[#1A1A1A]"
          >
            <div className="absolute inset-0 bg-[#1A1A1A]">
              <img
                src={project1.heroImage}
                alt={project1.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent z-10" />

            {/* Giant Architectural Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[110px] sm:text-[140px] font-black font-display pointer-events-none select-none">
              01
            </div>

            {/* Meta & Title */}
            <div className="relative z-20">
              <p
                className="text-[9px] uppercase tracking-[0.2em] mb-2 font-mono-code font-semibold"
                style={{ color: accentTheme.hex }}
              >
                {project1.category} / {project1.year}
              </p>
              <h3 className="text-2xl sm:text-3xl font-editorial italic font-light text-white group-hover:text-zinc-100 transition-colors">
                {project1.title}
              </h3>
            </div>
          </div>

          {/* Card 02 */}
          <div
            onClick={() => openProject(project2)}
            onMouseEnter={() => {
              setCursorVariant('project');
              triggerHoverSound();
            }}
            onMouseLeave={() => setCursorVariant('default')}
            className="relative group overflow-hidden cursor-pointer min-h-[280px] lg:min-h-0 flex flex-col justify-end p-8 bg-[#151515]"
          >
            <div className="absolute inset-0 bg-[#151515]">
              <img
                src={project2.heroImage}
                alt={project2.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent z-10" />

            {/* Giant Architectural Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[110px] sm:text-[140px] font-black font-display pointer-events-none select-none">
              02
            </div>

            {/* Meta & Title */}
            <div className="relative z-20">
              <p
                className="text-[9px] uppercase tracking-[0.2em] mb-2 font-mono-code font-semibold"
                style={{ color: accentTheme.hex }}
              >
                {project2.category} / {project2.year}
              </p>
              <h3 className="text-2xl sm:text-3xl font-editorial italic font-light text-white group-hover:text-zinc-100 transition-colors">
                {project2.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

