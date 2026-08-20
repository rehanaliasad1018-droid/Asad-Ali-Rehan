import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Check, Sparkles, User, Briefcase, Award, Mail, Globe, Save } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { DEFAULT_DESIGNER_PROFILE } from '../data/portfolioData';

export const ProfileCustomizerDrawer: React.FC = () => {
  const {
    isProfileDrawerOpen,
    closeProfileDrawer,
    profile,
    setProfile,
    resetProfileToDefault,
    showToast,
    accentTheme,
  } = usePortfolio();

  const [formData, setFormData] = useState(profile);

  // Sync state if profile changes
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isProfileDrawerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    showToast('Designer Profile & CV Data Updated!');
    closeProfileDrawer();
  };

  const loadPreset = (presetName: string) => {
    if (presetName === 'asad' || presetName === 'rehan') {
      const p = {
        ...DEFAULT_DESIGNER_PROFILE,
        name: 'ASAD ALI',
        title: 'SENIOR GRAPHIC DESIGNER & ART DIRECTOR',
        email: 'rehanaliasad1018@gmail.com',
        yearsOfExperience: '8+',
        projectsCompleted: '120+',
        brandsWorkedWith: '40+',
        designAwards: '14',
      };
      setFormData(p);
      setProfile(p);
      showToast('Loaded Asad Ali profile');
    } else if (presetName === 'alex') {
      const p = {
        ...DEFAULT_DESIGNER_PROFILE,
        name: 'ALEX VANCE',
        title: 'SENIOR BRAND IDENTITY & PACKAGING DESIGNER',
        email: 'alex.vance@designstudio.co',
        yearsOfExperience: '10+',
        projectsCompleted: '150+',
        brandsWorkedWith: '55+',
        designAwards: '22',
      };
      setFormData(p);
      setProfile(p);
      showToast('Loaded Alex Vance profile');
    } else if (presetName === 'elena') {
      const p = {
        ...DEFAULT_DESIGNER_PROFILE,
        name: 'ELENA ROSTOVA',
        title: 'CREATIVE DIRECTOR & EDITORIAL VISUAL DESIGNER',
        email: 'elena@rostova.design',
        yearsOfExperience: '9+',
        projectsCompleted: '130+',
        brandsWorkedWith: '48+',
        designAwards: '19',
      };
      setFormData(p);
      setProfile(p);
      showToast('Loaded Elena Rostova profile');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProfileDrawer}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#141414] border-l border-white/15 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code text-white/50 uppercase tracking-[0.2em]">
                  <Sparkles size={12} style={{ color: accentTheme.hex }} />
                  <span>CV &amp; PROFILE CUSTOMIZER</span>
                </div>
                <h3 className="font-display font-black text-xl text-white uppercase mt-0.5">
                  EDIT PORTFOLIO DATA
                </h3>
              </div>

              <button
                onClick={closeProfileDrawer}
                className="w-8 h-8 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-zinc-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="mb-6">
              <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.2em] block mb-2">
                // QUICK PROFILE PRESETS
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => loadPreset('asad')}
                  className="p-2.5 bg-[#1c1c1c] border border-white/10 hover:border-white/30 text-[10px] font-mono-code text-zinc-300 hover:text-white text-center cursor-pointer transition-colors"
                >
                  Asad Ali
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('alex')}
                  className="p-2.5 bg-[#1c1c1c] border border-white/10 hover:border-white/30 text-[10px] font-mono-code text-zinc-300 hover:text-white text-center cursor-pointer transition-colors"
                >
                  Alex Vance
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('elena')}
                  className="p-2.5 bg-[#1c1c1c] border border-white/10 hover:border-white/30 text-[10px] font-mono-code text-zinc-300 hover:text-white text-center cursor-pointer transition-colors"
                >
                  Elena Rostova
                </button>
              </div>
            </div>

            {/* Avatar Thumbnail Preview */}
            <div className="mb-6 p-3 bg-[#181818] border border-white/10 flex items-center gap-4">
              <div className="w-14 h-14 bg-black overflow-hidden shrink-0 border border-white/20">
                <img
                  src={formData.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                  alt={formData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider">CURRENT PORTRAIT</div>
                <div className="text-xs font-display font-bold text-white uppercase truncate">{formData.name}</div>
                <div className="text-[10px] font-mono-code text-white/40 truncate">{formData.title}</div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  PORTRAIT IMAGE URL
                </label>
                <input
                  type="text"
                  value={formData.avatarUrl || ''}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="Image URL or default portrait"
                  className="w-full px-3.5 py-2.5 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  DESIGNER FULL NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  PROFESSIONAL TITLE
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  CONTACT EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  AVAILABILITY STATUS
                </label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                    YEARS EXP
                  </label>
                  <input
                    type="text"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                    PROJECTS
                  </label>
                  <input
                    type="text"
                    value={formData.projectsCompleted}
                    onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                    BRANDS WORKED
                  </label>
                  <input
                    type="text"
                    value={formData.brandsWorkedWith}
                    onChange={(e) => setFormData({ ...formData, brandsWorkedWith: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                    AWARDS
                  </label>
                  <input
                    type="text"
                    value={formData.designAwards}
                    onChange={(e) => setFormData({ ...formData, designAwards: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  HERO INTRO STATEMENT
                </label>
                <textarea
                  rows={2}
                  value={formData.intro}
                  onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-white/50 uppercase tracking-wider block mb-1">
                  ABOUT BIOGRAPHY
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#1c1c1c] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 font-mono-code text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-white hover:text-black transition-colors"
                  style={{ backgroundColor: accentTheme.hex, color: '#000000' }}
                >
                  <Save size={14} />
                  <span>APPLY CHANGES</span>
                </button>

                <button
                  type="button"
                  onClick={resetProfileToDefault}
                  title="Reset to default CV"
                  className="p-3.5 bg-[#1c1c1c] border border-white/10 hover:bg-white hover:text-black text-zinc-400 transition-all cursor-pointer"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </form>
          </div>

          <div className="pt-6 border-t border-white/10 text-[10px] font-mono-code text-white/40 text-center tracking-wider">
            Changes are saved locally to your browser session.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
