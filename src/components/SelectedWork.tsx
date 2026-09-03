import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Grid3X3, Columns, List, ChevronRight, ChevronLeft, Layers, Sparkles, Camera } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { usePortfolio } from '../context/CustomizerContext';

type ViewMode = 'editorial' | 'horizontal' | 'index';
type CategoryFilter = 'ALL' | 'BRAND IDENTITY' | 'SOCIAL MEDIA' | 'CAMPAIGN DESIGN' | 'DIGITAL DESIGN' | 'PACKAGING' | 'ADVERTISING';

export const SelectedWork: React.FC = () => {
  const { openProject, accentTheme, setCursorVariant, setCursorText, triggerHoverSound, projectImages, setProjectImage } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('editorial');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const handleProjectImageUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setProjectImage(projectId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectDrop = (projectId: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setProjectImage(projectId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const categories: CategoryFilter[] = [
    'ALL',
    'BRAND IDENTITY',
    'PACKAGING',
    'CAMPAIGN DESIGN',
    'DIGITAL DESIGN',
    'SOCIAL MEDIA',
    'ADVERTISING',
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === 'ALL') return true;
    return project.category === activeCategory;
  });

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10 relative bg-[#0A0A0A] overflow-hidden">
      {/* Background Stardust */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header & View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-white/50 uppercase">
              <span className="w-8 h-[1px] bg-white/20" />
              <span>03 // SELECTED COMMERCIAL WORK</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.94]">
              FEATURED <br />
              <span className="font-editorial italic font-light lowercase text-zinc-300">
                archive &amp;
              </span> CASE STUDIES.
            </h2>
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/[0.04] p-1.5 border border-white/10 backdrop-blur-md self-start lg:self-end">
            <button
              onClick={() => setViewMode('editorial')}
              title="Editorial Magazine Grid"
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono-code tracking-[0.15em] transition-all cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Grid3X3 size={13} />
              <span className="hidden sm:inline">EDITORIAL</span>
            </button>

            <button
              onClick={() => setViewMode('horizontal')}
              title="Cinematic Filmstrip"
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono-code tracking-[0.15em] transition-all cursor-pointer ${
                viewMode === 'horizontal'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Columns size={13} />
              <span className="hidden sm:inline">HORIZONTAL</span>
            </button>

            <button
              onClick={() => setViewMode('index')}
              title="Archive Index List"
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono-code tracking-[0.15em] transition-all cursor-pointer ${
                viewMode === 'index'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <List size={13} />
              <span className="hidden sm:inline">INDEX</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b border-white/10">
          {categories.map((cat) => {
            const count = cat === 'ALL' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className={`px-4 py-2 text-[10px] font-mono-code tracking-[0.2em] uppercase whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'text-black font-bold shadow-lg'
                    : 'bg-[#141414] border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
                style={{
                  backgroundColor: isSelected ? accentTheme.hex : undefined,
                }}
              >
                <span>{cat}</span>
                <span className={`text-[9px] ${isSelected ? 'text-black/80' : 'text-white/40'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* VIEW MODE 1: EDITORIAL MAGAZINE GRID */}
        {viewMode === 'editorial' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => {
              // Asymmetric editorial sizing
              const isLarge = index % 3 === 0;
              const colSpan = isLarge ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4';
              const aspect = isLarge ? 'aspect-[16/10]' : 'aspect-[4/5]';
              const heroImg = projectImages[project.id] || project.heroImage;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
                  className={`${colSpan} group cursor-pointer flex flex-col justify-between`}
                  onClick={() => openProject(project)}
                  onMouseEnter={() => {
                    setHoveredProject(project);
                    setCursorVariant('project');
                    setCursorText('VIEW');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => {
                    setHoveredProject(null);
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                >
                  {/* Image Card Container */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleProjectDrop(project.id, e)}
                    className={`relative ${aspect} overflow-hidden bg-[#141414] border border-white/10 shadow-2xl mb-5 group/card transition-all duration-300 hover:border-white/25`}
                  >
                    <img
                      src={heroImg}
                      alt={project.title}
                      className="w-full h-full object-cover object-center select-none transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:contrast-[1.03] group-hover:brightness-[1.03]"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono-code font-bold tracking-[0.2em] text-white uppercase">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[9px] font-mono-code text-white/70 group-hover/card:opacity-0 transition-opacity">
                        {project.year}
                      </span>
                    </div>

                    {/* Quick Replace Trigger Button on Hover */}
                    <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover/card:opacity-100 transition-all duration-200">
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 bg-black/85 hover:bg-black text-white/80 hover:text-white backdrop-blur-md border border-white/20 text-[9px] font-mono-code tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xl transition-all"
                        title="Upload replacement image for this project"
                      >
                        <Camera size={11} />
                        <span>REPLACE</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleProjectImageUpload(project.id, e)}
                        />
                      </label>
                    </div>

                    {/* Bottom Floating Info */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none z-10">
                      <div className="max-w-[75%]">
                        <span
                          className="text-[9px] font-mono-code uppercase tracking-[0.2em] block mb-1 font-semibold"
                          style={{ color: accentTheme.hex }}
                        >
                          {project.client}
                        </span>
                        <h3 className="font-editorial italic font-light text-2xl sm:text-3xl text-white group-hover:text-zinc-100 transition-colors line-clamp-1">
                          {project.title.split('—')[0]}
                        </h3>
                      </div>

                      <div
                        className="w-10 h-10 flex items-center justify-center text-black font-bold transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl pointer-events-auto"
                        style={{ backgroundColor: accentTheme.hex }}
                      >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Tools Tags */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[9px] font-mono-code text-white/50 bg-white/[0.04] px-2 py-0.5 border border-white/10 tracking-wider uppercase"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: HORIZONTAL FILMSTRIP */}
        {viewMode === 'horizontal' && (
          <div className="relative">
            {/* Scroll navigation arrows */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={13} style={{ color: accentTheme.hex }} />
                <span>DRAG OR USE ARROWS TO BROWSE CINEMATIC FILMSTRIP</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollHorizontal('left')}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white/15 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollHorizontal('right')}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white/15 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={horizontalScrollRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
            >
              {filteredProjects.map((project) => {
                const horizImg = projectImages[project.id] || project.heroImage;
                return (
                <div
                  key={project.id}
                  onClick={() => openProject(project)}
                  onMouseEnter={() => {
                    setCursorVariant('project');
                    setCursorText('VIEW');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                  className="min-w-[340px] sm:min-w-[460px] lg:min-w-[560px] snap-start rounded-3xl overflow-hidden bg-[#121216] border border-white/15 group cursor-pointer shadow-2xl flex flex-col justify-between p-4"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={horizImg}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono-code font-bold uppercase text-white border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] font-mono-code text-zinc-400 uppercase">
                          {project.client} • {project.year}
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase">
                          {project.title.split('—')[0]}
                        </h3>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: accentTheme.hex }}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-light line-clamp-2 px-1">
                    {project.shortDescription}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW MODE 3: MINIMAL ARCHIVE INDEX TABLE */}
        {viewMode === 'index' && (
          <div className="border-t border-white/15">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                onMouseEnter={() => {
                  setHoveredProject(project);
                  setCursorVariant('project');
                  setCursorText('VIEW');
                  triggerHoverSound();
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setCursorVariant('default');
                  setCursorText('');
                }}
                className="py-6 sm:py-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors"
              >
                <div className="flex items-start md:items-center gap-6">
                  <span className="text-xs font-mono-code text-zinc-500 font-bold mt-1 md:mt-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                      <span>{project.title}</span>
                      <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accentTheme.hex }} />
                    </h3>
                    <div className="text-xs font-mono-code text-zinc-400 mt-1">
                      {project.client}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10 self-start md:self-center pl-10 md:pl-0">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-code uppercase text-zinc-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-500">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
