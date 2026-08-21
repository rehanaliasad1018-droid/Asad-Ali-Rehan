import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, Sparkles, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

export const AboutSection: React.FC = () => {
  const { profile, accentTheme, openProfileDrawer, setCursorVariant, triggerHoverSound, showToast } = usePortfolio();

  const stats = [
    {
      value: 17+,
      label: 'Years of Experience',
      desc: 'Refining craft across identity, print, and digital art direction',
      icon: Briefcase,
    },
    {
      value: profile.projectsCompleted,
      label: 'Projects Completed',
      desc: 'Executed with high fidelity from concept to global distribution',
      icon: CheckCircle2,
    },
    {
      value: profile.brandsWorkedWith,
      label: 'Brands & Clients',
      desc: 'Partnering with boutique innovators and enterprise market leaders',
      icon: Sparkles,
    },
    {
      value: 14,
      label: 'Awards & Honors',
      desc: 'Selected in D&AD, Tokyo TDC, Red Dot, and Awwwards',
      icon: Award,
    },
  ];

  const pillars = [
    {
      title: 'GRID & STRUCTURAL MASTERY',
      desc: 'Rooted in timeless Swiss and International typographic styles, every composition is anchored on strict mathematical proportion, hierarchy, and spatial balance.',
    },
    {
      title: 'CONCEPT-FIRST RIGOR',
      desc: 'Aesthetic execution without strategic rationale is merely decoration. I architect visual languages that stem directly from core brand positioning and consumer psychology.',
    },
    {
      title: 'CROSS-MEDIUM FIDELITY',
      desc: 'From tactile foil-stamped luxury unboxing to responsive 4K digital billboard takeovers and micro-interaction web design, the identity remains flawless across all scales.',
    },
    {
      title: 'COMMERCIAL MEASURABILITY',
      desc: 'Great design is an investment driver. Every identity and campaign is engineered to boost conversion, command pricing power, and forge lasting brand equity.',
    },
  ];

  const handleDownloadCV = () => {
    showToast('CV downloaded / prepared for viewing');
    // Open print preview or trigger download
    window.print();
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-black/10 bg-[#FAF9F5] text-[#111111] relative overflow-hidden">
      {/* Background Micro Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-10 text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase">
          <span className="w-8 h-[1px] bg-black/30" />
          <span>02 // ABOUT THE DESIGNER</span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.92] text-black"
          >
            {profile.statement.split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {idx === 1 ? (
                  <span
                    className="italic font-editorial font-light tracking-normal lowercase"
                    style={{ color: accentTheme.hex === '#FFFFFF' ? '#555555' : accentTheme.hex }}
                  >
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Editorial Bio & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Biography Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="font-editorial text-2xl sm:text-3xl text-neutral-800 leading-relaxed font-light italic">
              {profile.bio}
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              Operating at the intersection of branding, typography, art direction, and digital systems, I partner with forward-thinking founders and established creative directors to craft enduring commercial value. Every project is approached with relentless precision, curiosity, and respect for physical materiality and digital responsiveness.
            </p>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownloadCV}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-8 py-4 bg-black border border-black text-white font-mono-code text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <FileText size={13} />
                <span>DOWNLOAD / PRINT CV</span>
              </button>

              <button
                onClick={openProfileDrawer}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-6 py-4 text-neutral-600 font-mono-code text-[10px] font-bold tracking-[0.2em] uppercase hover:text-black transition-all flex items-center gap-1.5 cursor-pointer border border-black/10 hover:border-black/30 bg-white"
              >
                <span>EDIT PROFILE DATA</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </motion.div>

          {/* Designer Portrait / Monogram Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative border border-black/10 bg-white p-4 shadow-xl group">
              <div className="aspect-[4/5] overflow-hidden relative bg-[#1c1c1c]">
                <img
                  src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="text-[9px] font-mono-code tracking-[0.2em] uppercase mb-1 font-semibold"
                    style={{ color: accentTheme.hex }}
                  >
                    CREATIVE DIRECTION // DESIGN PRAXIS
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-white/80 font-mono-code mt-1">{profile.title}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono-code text-neutral-500 tracking-[0.1em]">
                <span>EST. 2016</span>
                <span className="text-emerald-600 font-semibold">● ACTIVE IN PRACTICE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 bg-white border border-black/10 hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center text-black font-bold"
                    style={{ backgroundColor: accentTheme.hex }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-mono-code text-neutral-400 uppercase">0{idx + 1}</span>
                </div>

                <div className="font-display font-black text-4xl sm:text-5xl text-black tracking-tight group-hover:text-neutral-700 transition-colors">
                  {stat.value}
                </div>

                <div className="text-[10px] font-mono-code text-neutral-900 font-bold uppercase mt-2 tracking-[0.15em]">
                  {stat.label}
                </div>

                <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed font-light">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Core Design Pillars */}
        <div className="pt-12 border-t border-black/10">
          <div className="text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase mb-8">
            // METHODOLOGY &amp; DESIGN PILLARS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-6 border border-black/10 bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div
                    className="font-mono-code text-[11px] font-bold mb-2"
                    style={{ color: accentTheme.hex === '#FFFFFF' ? '#111111' : accentTheme.hex }}
                  >
                    0{idx + 1}
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wider text-black uppercase mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
