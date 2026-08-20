import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Layers, Palette, Wand2, Compass, CheckCircle2 } from 'lucide-react';
import { DESIGN_TOOLS } from '../data/portfolioData';
import { usePortfolio } from '../context/CustomizerContext';
import {
  ToolBrandIcon,
  PhotoshopIcon,
  IllustratorIcon,
  InDesignIcon,
  FigmaIcon,
  AfterEffectsIcon,
  PremiereProIcon,
  BlenderIcon,
} from './SoftwareIcons';

export const DesignToolsSection: React.FC = () => {
  const { accentTheme, setCursorVariant, triggerHoverSound, triggerClickSound, showToast } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const marqueeItems = [
    'PHOTOSHOP',
    'ILLUSTRATOR',
    'INDESIGN',
    'FIGMA',
    'AFTER EFFECTS',
    'PREMIERE PRO',
    '3D BLENDER',
    'TYPOGRAPHY',
    'ART DIRECTION',
  ];

  const categories = ['ALL', 'Vector & Identity', 'Image & Retouching', 'Editorial & Layout', 'Digital & UI', 'Motion & Video', '3D & Spatial'];

  const filteredTools = selectedCategory === 'ALL'
    ? DESIGN_TOOLS
    : DESIGN_TOOLS.filter((t) => t.category === selectedCategory);

  return (
    <section id="tools" className="py-24 sm:py-32 border-t border-white/10 relative bg-[#0A0A0A] overflow-hidden">
      {/* Background Stardust */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-grain" />

      {/* Infinite Kinetic Marquee Top Track */}
      <div className="w-full overflow-hidden border-y border-white/10 py-6 mb-20 bg-white/[0.01]">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="font-display font-black text-4xl sm:text-6xl uppercase tracking-wider text-transparent select-none"
                style={{
                  WebkitTextStroke: idx % 2 === 0 ? '1px rgba(255, 255, 255, 0.4)' : '1px rgba(255, 255, 255, 0.8)',
                  color: idx % 3 === 0 ? accentTheme.hex : 'transparent',
                }}
              >
                {item}
              </span>
              <span className="text-zinc-600 text-2xl font-mono">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-white/50 uppercase">
              <span className="w-8 h-[1px] bg-white/20" />
              <span>07 // SOFTWARE &amp; TECHNICAL ARSENAL</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              DESIGN TOOLS &amp; <br />
              <span className="font-editorial italic font-light lowercase text-zinc-300">
                production
              </span> SUITE.
            </h2>
          </div>

          <p className="max-w-md text-xs font-mono-code text-white/50 tracking-wider">
            // Industry-standard mastery spanning vector construction, typography, layout automation, motion design, and spatial rendering with original Creative Cloud &amp; Figma pipelines.
          </p>
        </div>

        {/* Quick-Access Interactive App Launchpad Bar */}
        <div className="mb-12 p-6 bg-[#121212] border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono-code text-white/40 uppercase tracking-[0.2em] block mb-1">
                // CREATIVE SUITE SHORTCUT DOCK
              </span>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Original Production Applications
              </h3>
            </div>

            {/* Quick Interactive Icons Row */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: 'Adobe Photoshop', slug: 'photoshop', icon: <PhotoshopIcon size={42} /> },
                { name: 'Adobe Illustrator', slug: 'illustrator', icon: <IllustratorIcon size={42} /> },
                { name: 'Adobe InDesign', slug: 'indesign', icon: <InDesignIcon size={42} /> },
                { name: 'Figma', slug: 'figma', icon: <FigmaIcon size={42} /> },
                { name: 'Adobe After Effects', slug: 'aftereffects', icon: <AfterEffectsIcon size={42} /> },
                { name: 'Adobe Premiere Pro', slug: 'premiere', icon: <PremiereProIcon size={42} /> },
                { name: 'Blender 3D', slug: 'blender', icon: <BlenderIcon size={42} /> },
              ].map((app) => (
                <button
                  key={app.name}
                  onClick={() => {
                    showToast(`${app.name}: Verified Production Proficiency`);
                    triggerClickSound();
                  }}
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="p-2 bg-[#181818] border border-white/10 hover:border-white/40 hover:bg-[#202020] transition-all flex items-center justify-center cursor-pointer group shadow-md"
                  title={app.name}
                >
                  {app.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                triggerClickSound();
              }}
              className={`px-3 py-1.5 text-[10px] font-mono-code uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="p-6 bg-[#141414] border border-white/10 hover:border-white/30 hover:bg-[#181818] transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Original Brand Icon */}
                  <div className="shrink-0">
                    <ToolBrandIcon toolName={tool.name} size={42} />
                  </div>

                  <span className="text-[9px] font-mono-code text-white/50 uppercase px-2 py-0.5 border border-white/10 bg-white/5">
                    {tool.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white uppercase mb-2 group-hover:text-zinc-200">
                  {tool.name}
                </h3>

                <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                  {tool.description}
                </p>
              </div>

              <div>
                {/* Proficiency Bar */}
                <div className="flex items-center justify-between text-[10px] font-mono-code text-white/50 mb-1.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-emerald-400" />
                    <span>PROFICIENCY</span>
                  </span>
                  <span className="font-bold text-white">{tool.proficiency}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentTheme.hex === '#FFFFFF' ? '#ffffff' : accentTheme.hex }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
