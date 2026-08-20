import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calculator, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

interface DeliverableOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  baseDays: number;
  description: string;
  includedItems: string[];
}

const DELIVERABLE_OPTIONS: DeliverableOption[] = [
  {
    id: 'brand-identity',
    name: 'Comprehensive Brand Identity System',
    category: 'Branding',
    basePrice: 3500,
    baseDays: 14,
    description: 'Complete visual identity architecture including primary & secondary logos, typography system, brand guide, and stationery kit.',
    includedItems: ['Vector Master Logo Suite', 'Typography & Color Tokens', '60+ Page Brand Guidelines PDF', 'Business Card & Letterhead Suite'],
  },
  {
    id: 'packaging-3d',
    name: 'Luxury Packaging & 3D Renders',
    category: 'Packaging',
    basePrice: 2800,
    baseDays: 10,
    description: 'Dieline engineering, box/bottle label design, high-fidelity photorealistic 3D mockups and print-ready production files.',
    includedItems: ['Custom Dieline Blueprints', '3D Photorealistic Key Renders', 'Spot UV & Foil Stamping Specs', 'CMYK / Pantone Production Files'],
  },
  {
    id: 'social-kit',
    name: 'Social Media & Marketing Launch Kit',
    category: 'Digital',
    basePrice: 1800,
    baseDays: 7,
    description: 'High-converting social templates, carousel layouts, animated story assets, and advertising graphic templates in Figma.',
    includedItems: ['24+ Figma Template Modular Components', 'Instagram / LinkedIn Master Grids', 'Motion Graphic Story Assets', 'Ad Creative Variations'],
  },
  {
    id: 'editorial-book',
    name: 'Editorial Publication & Lookbook',
    category: 'Print',
    basePrice: 2400,
    baseDays: 10,
    description: 'Custom magazine, catalog, or annual report layout with Swiss grid typography, editorial curation, and press-ready PDFs.',
    includedItems: ['InDesign Master Spread Architecture', 'Custom Grid System', 'Image Color Grading & Pre-press', 'Interactive Digital PDF + Print PDF'],
  },
  {
    id: 'ui-ux-design',
    name: 'Digital Experience & Web UI Design',
    category: 'UI/UX',
    basePrice: 4200,
    baseDays: 18,
    description: 'Art-directed responsive web interface design in Figma with interactive prototype, micro-interaction specs, and component library.',
    includedItems: ['Responsive Desktop & Mobile UI', 'Interactive Figma Prototype', 'Design System & Style Token Kit', 'Developer Handoff Redlines'],
  },
  {
    id: 'motion-identity',
    name: 'Logo Animation & Motion Brand Guidelines',
    category: 'Motion',
    basePrice: 1600,
    baseDays: 5,
    description: 'Kinetic logo stingers, social video bumpers, lower thirds, and animated motion principles for broadcast and digital.',
    includedItems: ['3x Kinetic Logo Animations (4K MP4/ProRes)', 'Lottie / JSON Web Animations', 'Sound FX Sound Design Sync', 'Motion Design Rulebook'],
  },
];

export const ProjectEstimatorModal: React.FC = () => {
  const { isEstimatorOpen, closeEstimator, openInquiry, accentTheme, triggerClickSound, triggerSuccessSound, showToast } = usePortfolio();

  const [selectedIds, setSelectedIds] = useState<string[]>(['brand-identity', 'packaging-3d']);
  const [speedTier, setSpeedTier] = useState<'standard' | 'rush' | 'relaxed'>('standard');
  const [revisionTier, setRevisionTier] = useState<'standard' | 'unlimited'>('standard');

  if (!isEstimatorOpen) return null;

  const toggleDeliverable = (id: string) => {
    triggerClickSound();
    setSelectedIds((prev) => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const selectedDeliverables = DELIVERABLE_OPTIONS.filter((d) => selectedIds.includes(d.id));

  const rawPrice = selectedDeliverables.reduce((acc, curr) => acc + curr.basePrice, 0);
  const rawDays = selectedDeliverables.reduce((acc, curr) => acc + curr.baseDays, 0);

  // Speed multiplier
  const speedMultiplier = speedTier === 'rush' ? 1.35 : speedTier === 'relaxed' ? 0.9 : 1.0;
  const daysMultiplier = speedTier === 'rush' ? 0.6 : speedTier === 'relaxed' ? 1.3 : 1.0;

  // Revisions add-on
  const revisionAddon = revisionTier === 'unlimited' ? 800 : 0;

  const finalEstimatedPrice = Math.round(rawPrice * speedMultiplier + revisionAddon);
  const finalEstimatedDays = Math.max(5, Math.round(rawDays * daysMultiplier * 0.75));

  const handleProceedToInquiry = () => {
    triggerSuccessSound();
    closeEstimator();
    openInquiry();
    showToast('Applied estimated project deliverables to inquiry form!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeEstimator}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#141414] border border-white/15 my-8 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="p-6 sm:px-8 border-b border-white/10 flex items-center justify-between bg-[#181818]">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center text-black font-bold"
                style={{ backgroundColor: accentTheme.hex }}
              >
                <Calculator size={16} />
              </div>
              <div>
                <span className="text-[9px] font-mono-code uppercase tracking-[0.2em] text-white/50 block">
                  INTERACTIVE BUDGET &amp; TIMELINE CALCULATOR
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-white">
                  Project Scope &amp; Fee Estimator
                </h3>
              </div>
            </div>

            <button
              onClick={closeEstimator}
              className="w-8 h-8 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white/60 flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Deliverables Picker */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.2em] block mb-3">
                  01 // SELECT PROJECT DELIVERABLES
                </label>
                <div className="space-y-3">
                  {DELIVERABLE_OPTIONS.map((option) => {
                    const isSelected = selectedIds.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => toggleDeliverable(option.id)}
                        className={`p-4 border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-white bg-[#1c1c1c]'
                            : 'border-white/10 bg-[#121212] hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 border flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'border-white bg-white text-black'
                                  : 'border-white/20 bg-transparent'
                              }`}
                            >
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span className="font-display font-bold text-sm text-white uppercase">
                              {option.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono-code text-xs font-bold text-white">
                              ${option.basePrice.toLocaleString()}
                            </span>
                            <span className="block text-[9px] font-mono-code text-white/40">
                              ~{option.baseDays} days
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-white/60 font-mono-code mb-2 pl-8">
                          {option.description}
                        </p>

                        {isSelected && (
                          <div className="pl-8 pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] font-mono-code text-white/50">
                            {option.includedItems.map((inc, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentTheme.hex }} />
                                <span>{inc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="pt-4 border-t border-white/10">
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.2em] block mb-3">
                  02 // TIMELINE &amp; PACE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'relaxed', label: 'Relaxed Pace', desc: '-10% Discount, Flexible' },
                    { id: 'standard', label: 'Standard Pace', desc: 'Standard Milestones' },
                    { id: 'rush', label: 'Fast-Track Rush', desc: '+35% Dedicated Priority' },
                  ].map((speed) => (
                    <button
                      key={speed.id}
                      onClick={() => setSpeedTier(speed.id as any)}
                      className={`p-3 border text-left transition-all cursor-pointer ${
                        speedTier === speed.id
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase">{speed.label}</div>
                      <div className="text-[9px] font-mono-code text-white/40 mt-0.5">{speed.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real-Time Summary & Scope Statement */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-[#181818] border border-white/10">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                  <span className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.2em]">
                    // ESTIMATED INVESTMENT
                  </span>
                  <span className="text-[10px] font-mono-code text-green-400 flex items-center gap-1">
                    <ShieldCheck size={12} /> VERIFIED ACCREDITED RATE
                  </span>
                </div>

                {/* Big Price Display */}
                <div className="mb-6 p-6 bg-[#111111] border border-white/10 text-center">
                  <span className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest block mb-1">
                    PROJECT TOTAL (EST.)
                  </span>
                  <div className="font-display text-4xl sm:text-5xl font-black text-white">
                    ${finalEstimatedPrice.toLocaleString()}
                  </div>
                  <div className="flex justify-center items-center gap-4 mt-3 text-xs font-mono-code text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock size={12} style={{ color: accentTheme.hex }} />
                      Est. {finalEstimatedDays} Business Days
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Layers size={12} style={{ color: accentTheme.hex }} />
                      {selectedDeliverables.length} Deliverable Modules
                    </span>
                  </div>
                </div>

                {/* Scope Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.15em]">
                    INCLUDED SCOPE MODULES:
                  </div>
                  {selectedDeliverables.map((d) => (
                    <div key={d.id} className="flex justify-between items-center text-xs font-mono-code border-b border-white/5 pb-1.5">
                      <span className="text-white/80">{d.name}</span>
                      <span className="text-white font-bold">${d.basePrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Guarantees */}
                <div className="p-4 bg-white/5 border border-white/10 text-[10px] font-mono-code text-white/60 space-y-1.5 mb-6">
                  <div className="flex items-center gap-1.5 text-white font-bold">
                    <Sparkles size={12} style={{ color: accentTheme.hex }} />
                    WHAT IS ALWAYS INCLUDED:
                  </div>
                  <div>• Direct 1-on-1 collaboration with Senior Designer</div>
                  <div>• 100% Full commercial copyright transfer &amp; vector source files</div>
                  <div>• Dedicated milestone review checkpoints &amp; Slack/Email access</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={handleProceedToInquiry}
                  className="w-full py-4 font-mono-code text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all hover:bg-white hover:text-black"
                  style={{ backgroundColor: accentTheme.hex, color: '#000000' }}
                >
                  <span>Transfer Scope to Inquiry Form</span>
                  <ArrowRight size={14} />
                </button>
                <p className="text-[9px] font-mono-code text-white/40 text-center">
                  Estimates are non-binding. Exact proposal provided after discovery discussion.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
