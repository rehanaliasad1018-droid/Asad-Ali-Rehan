import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';
import { usePortfolio } from '../context/CustomizerContext';

export const ExperienceTimeline: React.FC = () => {
  const { accentTheme } = usePortfolio();

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-black/10 relative bg-[#FAF9F5] text-[#111111]">
      {/* Background Micro Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase">
              <span className="w-8 h-[1px] bg-black/30" />
              <span>06 // CAREER &amp; LEADERSHIP TIMELINE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-black uppercase tracking-tight">
              PROFESSIONAL <br />
              <span className="font-editorial italic font-light lowercase text-neutral-700">
                industry
              </span> TRACK RECORD.
            </h2>
          </div>

          <p className="max-w-md text-xs font-mono-code text-neutral-600 tracking-wider">
            // Over 8+ years collaborating with forward-thinking design consultancies, international agencies, and global brands.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative border-l border-black/15 ml-4 sm:ml-8 pl-8 sm:pl-12 flex flex-col gap-14">
          {EXPERIENCE_TIMELINE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node */}
              <div
                className="absolute -left-[41px] sm:-left-[57px] top-1 w-4 h-4 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-md"
                style={{ backgroundColor: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex }}
              />

              {/* Main Content Box */}
              <div className="p-6 sm:p-8 bg-white border border-black/10 hover:border-black/30 transition-all shadow-sm hover:shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-4 border-b border-black/10">
                  <div>
                    <span
                      className="px-2.5 py-0.5 text-[9px] font-mono-code font-bold uppercase text-black inline-block mb-2 shadow-2xs"
                      style={{ backgroundColor: accentTheme.hex === '#FFFFFF' ? '#e5e5e5' : accentTheme.hex }}
                    >
                      {item.type}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-black uppercase">
                      {item.role}
                    </h3>
                    <div className="font-editorial text-lg text-neutral-700 italic mt-0.5 font-light">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono-code text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-neutral-400" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-neutral-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Role Narrative */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-6">
                  {item.description}
                </p>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <div className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] mb-3">
                    // KEY RESPONSIBILITIES &amp; DELIVERABLES
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 font-light">
                        <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-[#FAF9F5] border border-black/10 text-[10px] font-mono-code text-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
