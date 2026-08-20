import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CREATIVE_PROCESS_STEPS } from '../data/portfolioData';
import { usePortfolio } from '../context/CustomizerContext';

export const CreativeProcess: React.FC = () => {
  const { accentTheme, triggerClickSound } = usePortfolio();
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-black/10 relative bg-[#FAF9F5] text-[#111111]">
      {/* Background Micro Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase">
              <span className="w-8 h-[1px] bg-black/30" />
              <span>08 // CREATIVE METHODOLOGY</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-black uppercase tracking-tight">
              STRUCTURED <br />
              <span className="font-editorial italic font-light lowercase text-neutral-700">
                design
              </span> PROCESS.
            </h2>
          </div>

          <p className="max-w-md text-xs font-mono-code text-neutral-600 tracking-wider">
            // A tested, four-stage strategic framework ensuring creative vision translates into commercially viable, high-impact reality.
          </p>
        </div>

        {/* 4 Steps Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATIVE_PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onClick={() => {
                  setActiveStep(idx);
                  triggerClickSound();
                }}
                className={`p-6 sm:p-8 border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group shadow-sm ${
                  isSelected
                    ? 'bg-white border-black shadow-xl ring-1 ring-black/10'
                    : 'bg-white border-black/10 hover:border-black/30'
                }`}
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-display font-black text-3xl sm:text-4xl"
                      style={{ color: isSelected ? (accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex) : 'rgba(0, 0, 0, 0.25)' }}
                    >
                      {step.number}
                    </span>

                    <span className="text-[9px] font-mono-code text-neutral-500 uppercase px-2 py-0.5 border border-black/10 bg-[#FAF9F5]">
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-black uppercase mb-1">
                    {step.title}
                  </h3>

                  <div className="text-[11px] font-mono-code text-neutral-500 font-medium mb-4">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-Points */}
                <div className="pt-4 border-t border-black/10 flex flex-col gap-2">
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-[11px] text-neutral-600 font-mono-code">
                      <div className="w-1.5 h-1.5 mt-1.5 shrink-0" style={{ backgroundColor: isSelected ? (accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex) : '#a1a1aa' }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
