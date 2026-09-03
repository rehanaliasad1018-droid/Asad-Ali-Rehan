import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { EXPERIENCE_TIMELINE, EXPERTISE_CATEGORIES, DESIGN_TOOLS } from '../data/portfolioData';
import { ToolBrandIcon } from './SoftwareIcons';

export const ResumeModal: React.FC = () => {
  const { isResumeOpen, closeResume, profile, accentTheme, showToast } = usePortfolio();

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:bg-white">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeResume}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm print:hidden"
        />

        {/* Resume Sheet Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          className="relative w-full max-w-4xl bg-[#161616] print:bg-white text-[#f0f0f0] print:text-black border border-white/20 print:border-none shadow-2xl z-10 my-8 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:overflow-visible"
        >
          {/* Header Bar */}
          <div className="p-4 sm:px-8 bg-[#1a1a1a] print:hidden border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono-code text-white/60">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentTheme.hex }} />
              <span>EXECUTIVE CV &amp; PORTFOLIO ONE-SHEET</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-white text-black text-[11px] font-mono-code font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <Printer size={13} />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={closeResume}
                className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 font-sans print:p-8 print:text-black print:bg-white">
            {/* Top Identity Block */}
            <div className="border-b border-white/15 print:border-black/20 pb-8 flex flex-col sm:flex-row justify-between sm:items-start gap-6">
              <div className="flex items-start gap-6">
                {profile.avatarUrl && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-20 h-20 object-cover border border-white/20 print:border-black/20 shrink-0"
                  />
                )}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white print:text-black">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-mono-code uppercase font-semibold tracking-wider text-white/70 print:text-black/70 mt-1">
                    {profile.title}
                  </p>
                  <p className="text-xs text-white/50 print:text-black/60 font-mono-code mt-1">
                    {profile.yearsOfExperience} • Specialized in Brand Architecture, Packaging &amp; Art Direction
                  </p>
                </div>
              </div>

              {/* Meta details */}
              <div className="text-xs font-mono-code text-white/60 print:text-black/70 space-y-1.5 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={12} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone size={12} />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={12} />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Executive Bio */}
            <div>
              <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-2">
                // EXECUTIVE SUMMARY
              </h2>
              <p className="text-sm text-white/80 print:text-black/80 font-light leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-4 flex items-center gap-1.5">
                <Briefcase size={13} />
                <span>// CAREER HISTORY &amp; LEADERSHIP</span>
              </h2>
              <div className="space-y-6">
                {EXPERIENCE_TIMELINE.map((exp, i) => (
                  <div key={i} className="border-l-2 border-white/10 print:border-black/20 pl-4 space-y-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <h3 className="text-sm font-bold text-white print:text-black uppercase font-display">
                        {exp.role} <span className="font-light text-white/60 print:text-black/60">@ {exp.company}</span>
                      </h3>
                      <span className="text-[10px] font-mono-code text-white/40 print:text-black/50">
                        {exp.period} • {exp.location}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 print:text-black/70 font-mono-code leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {exp.skills.map((h, hi) => (
                        <span key={hi} className="text-[9px] font-mono-code px-2 py-0.5 bg-white/5 print:bg-black/5 border border-white/10 print:border-black/10 text-white/60 print:text-black/70">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies & Software Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 print:border-black/10">
              <div>
                <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-3">
                  // CORE DISCIPLINES
                </h2>
                <div className="space-y-2">
                  {EXPERTISE_CATEGORIES.map((cat, i) => (
                    <div key={i} className="text-xs font-mono-code flex items-center justify-between border-b border-white/5 pb-1">
                      <span className="text-white print:text-black">{cat.title}</span>
                      <span className="text-white/40 print:text-black/50 text-[10px]">{cat.tags.length} Capabilities</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-3">
                  // MASTER TOOLKIT &amp; PRODUCTION SUITE
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {DESIGN_TOOLS.map((tool, i) => (
                    <div key={i} className="flex items-center gap-2 p-1.5 bg-white/5 print:bg-black/5 border border-white/10 print:border-black/10">
                      <ToolBrandIcon toolName={tool.name} size={20} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono-code font-bold text-white print:text-black truncate">
                          {tool.name.replace('Adobe ', '')}
                        </div>
                        <div className="text-[9px] font-mono-code text-white/40 print:text-black/50">
                          {tool.proficiency}% Mastery
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 print:border-black/10">
              <div>
                <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-3 flex items-center gap-1.5">
                  <GraduationCap size={13} />
                  <span>// EDUCATION</span>
                </h2>
                <div className="space-y-3">
                  <div className="border-l-2 border-white/10 print:border-black/20 pl-3">
                    <div className="text-xs font-bold text-white print:text-black uppercase">
                      Bachelors in Commerce (2nd Div)
                    </div>
                    <div className="text-[11px] text-white/60 print:text-black/70 font-mono-code">
                      Dadabhoy University of Higher Education • 2012
                    </div>
                  </div>
                  <div className="border-l-2 border-white/10 print:border-black/20 pl-3">
                    <div className="text-xs font-bold text-white print:text-black uppercase">
                      Intermediate (C Grade)
                    </div>
                    <div className="text-[11px] text-white/60 print:text-black/70 font-mono-code">
                      Formen College Nazimabad Karachi • 2006
                    </div>
                  </div>
                  <div className="border-l-2 border-white/10 print:border-black/20 pl-3">
                    <div className="text-xs font-bold text-white print:text-black uppercase">
                      Matriculation (A Grade)
                    </div>
                    <div className="text-[11px] text-white/60 print:text-black/70 font-mono-code">
                      S.M Public School • 2004
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono-code font-bold uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-3 flex items-center gap-1.5">
                  <Award size={13} />
                  <span>// CERTIFICATIONS &amp; EXPERTISE</span>
                </h2>
                <div className="space-y-3">
                  <div className="border-l-2 border-white/10 print:border-black/20 pl-3">
                    <div className="text-xs font-bold text-white print:text-black uppercase">
                      Graphic &amp; Web Design
                    </div>
                    <div className="text-[11px] text-white/60 print:text-black/70 font-mono-code">
                      Arena Multimedia • 2008
                    </div>
                  </div>
                  <div className="border-l-2 border-white/10 print:border-black/20 pl-3">
                    <div className="text-xs font-bold text-white print:text-black uppercase">
                      Diploma in Information Tech.
                    </div>
                    <div className="text-[11px] text-white/60 print:text-black/70 font-mono-code">
                      Aptech Computer Education • 2012
                    </div>
                  </div>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {['Web Design', 'UI/UX Design', 'Logo Design', 'Packaging & Label', 'Brochures / Flyers', 'Social Media Marketing', 'Corporate Animation'].map((s, idx) => (
                      <span key={idx} className="text-[9px] font-mono-code px-2 py-0.5 bg-white/5 print:bg-black/5 border border-white/10 print:border-black/10 text-white/60 print:text-black/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Verification */}
            <div className="pt-4 border-t border-white/10 print:border-black/10 flex flex-wrap justify-between items-center text-xs font-mono-code text-white/50 print:text-black/60">
              <div>
                M. ASAD ALI — SENIOR GRAPHIC DESIGNER &amp; ART DIRECTOR (17+ YEARS EXP)
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} style={{ color: accentTheme.hex }} />
                <span>VERIFIED PROFESSIONAL CV</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
