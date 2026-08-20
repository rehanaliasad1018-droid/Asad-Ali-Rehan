import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  FolderGit2, 
  Palette, 
  Calculator, 
  FileText, 
  Volume2, 
  VolumeX, 
  Mail, 
  User, 
  Sliders, 
  X,
  ExternalLink,
  Sparkles,
  Command,
  Grid,
  Box
} from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { PROJECTS, ACCENT_THEMES } from '../data/portfolioData';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    closeCommandPalette, 
    openProject, 
    openInquiry, 
    openProfileDrawer, 
    openEstimator, 
    openResume, 
    accentTheme, 
    setAccentTheme, 
    soundEnabled, 
    toggleSound, 
    showToast,
    triggerClickSound,
    profile
  } = usePortfolio();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isCommandPaletteOpen) return null;

  interface CommandItem {
    id: string;
    category: 'PROJECTS' | 'ACTIONS' | 'NAVIGATION' | 'THEMES';
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
  }

  const commands: CommandItem[] = [
    // Actions
    {
      id: 'estimator',
      category: 'ACTIONS',
      title: 'Open Project Fee & Timeline Estimator',
      description: 'Calculate instant budgets for branding, packaging & UI',
      icon: <Calculator size={14} />,
      action: () => {
        closeCommandPalette();
        openEstimator();
      },
    },
    {
      id: 'inquiry',
      category: 'ACTIONS',
      title: 'Start Project Inquiry / Discovery Form',
      description: 'Send brief, request rates, or schedule consultation',
      icon: <Mail size={14} />,
      action: () => {
        closeCommandPalette();
        openInquiry();
      },
    },
    {
      id: 'resume',
      category: 'ACTIONS',
      title: 'View & Print Executive CV Sheet',
      description: 'Printable editorial resume & career pedigree',
      icon: <FileText size={14} />,
      action: () => {
        closeCommandPalette();
        openResume();
      },
    },
    {
      id: 'customizer',
      category: 'ACTIONS',
      title: 'Customize Designer Profile & Theme',
      description: 'Edit name, portrait, credentials, and accent styles',
      icon: <Sliders size={14} />,
      action: () => {
        closeCommandPalette();
        openProfileDrawer();
      },
    },
    {
      id: 'sound',
      category: 'ACTIONS',
      title: soundEnabled ? 'Mute Interface Sound FX' : 'Enable Interface Sound FX',
      description: soundEnabled ? 'Disable audio tactile clicks' : 'Synthesize tactile UI audio feedback',
      icon: soundEnabled ? <VolumeX size={14} /> : <Volume2 size={14} />,
      action: () => {
        toggleSound();
        showToast(soundEnabled ? 'Interface audio muted' : 'Interface audio enabled');
        closeCommandPalette();
      },
    },
    {
      id: 'copy-email',
      category: 'ACTIONS',
      title: `Copy Designer Email (${profile.email})`,
      description: 'Copy direct email address to clipboard',
      icon: <Mail size={14} />,
      action: () => {
        navigator.clipboard.writeText(profile.email);
        showToast(`Copied ${profile.email} to clipboard!`);
        closeCommandPalette();
      },
    },

    // Navigation sections
    {
      id: 'nav-foil',
      category: 'NAVIGATION',
      title: 'Jump to: 3D Tactile Foil & Hologram Simulator',
      description: 'Interact with 3D card tilt, 24K gold stamping & holographic finishes',
      icon: <Box size={14} />,
      action: () => {
        closeCommandPalette();
        document.getElementById('design-lab')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-lab',
      category: 'NAVIGATION',
      title: 'Jump to: Interactive Design Lab',
      description: 'Test typography, color matrix & wireframe inspector',
      icon: <Sparkles size={14} />,
      action: () => {
        closeCommandPalette();
        document.getElementById('design-lab')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-work',
      category: 'NAVIGATION',
      title: 'Jump to: Selected Works Archive',
      description: 'Browse complete case studies & editorial galleries',
      icon: <FolderGit2 size={14} />,
      action: () => {
        closeCommandPalette();
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'Jump to: Designer Profile & Bio',
      description: 'Learn about philosophy, methodology & background',
      icon: <User size={14} />,
      action: () => {
        closeCommandPalette();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-experience',
      category: 'NAVIGATION',
      title: 'Jump to: Career Timeline & Pedigree',
      description: 'View 10+ years tenure across design studios',
      icon: <FileText size={14} />,
      action: () => {
        closeCommandPalette();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },

    // Projects
    ...PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      category: 'PROJECTS' as const,
      title: `Case Study: ${project.title}`,
      description: `${project.client} • ${project.category} (${project.year})`,
      icon: <FolderGit2 size={14} />,
      action: () => {
        closeCommandPalette();
        openProject(project);
      },
    })),

    // Accent Themes
    ...ACCENT_THEMES.map((theme) => ({
      id: `theme-${theme.id}`,
      category: 'THEMES' as const,
      title: `Accent Theme: ${theme.name}`,
      description: `Switch interface brand color to ${theme.hex}`,
      icon: (
        <span
          className="w-3 h-3 rounded-full inline-block border border-white/20"
          style={{ backgroundColor: theme.hex }}
        />
      ),
      action: () => {
        setAccentTheme(theme);
        showToast(`Theme updated to ${theme.name}`);
        closeCommandPalette();
      },
    })),
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-24 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCommandPalette}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Search Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#141414] border border-white/20 shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* Input Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#181818]">
            <Search size={16} className="text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command, project name, or theme (e.g. 'Onyx', 'Lab', 'Estimator', 'Orange')..."
              autoFocus
              className="flex-1 bg-transparent text-sm text-white font-mono-code placeholder:text-white/30 focus:outline-none"
            />
            <div className="flex items-center gap-1.5 text-[9px] font-mono-code text-white/40 border border-white/10 px-2 py-0.5">
              <span>ESC TO EXIT</span>
            </div>
            <button
              onClick={closeCommandPalette}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono-code text-white/40">
                No matching actions found for "{query}". Try "Work", "CV", "Theme", or "Estimator".
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-white text-black'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'border-black/20 bg-black/5' : 'border-white/10 bg-white/5 text-white/70'
                        }`}
                      >
                        {cmd.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold font-mono-code uppercase truncate">
                          {cmd.title}
                        </div>
                        <div
                          className={`text-[10px] font-mono-code truncate ${
                            isSelected ? 'text-black/70' : 'text-white/40'
                          }`}
                        >
                          {cmd.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[8px] font-mono-code px-1.5 py-0.5 border ${
                          isSelected
                            ? 'border-black/30 text-black/70'
                            : 'border-white/10 text-white/40'
                        }`}
                      >
                        {cmd.category}
                      </span>
                      <ArrowRight size={12} className={isSelected ? 'text-black' : 'text-white/20'} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3 bg-[#0e0e0e] border-t border-white/10 flex items-center justify-between text-[9px] font-mono-code text-white/40">
            <div className="flex items-center gap-4">
              <span>↑↓ NAVIGATE</span>
              <span>↵ SELECT</span>
              <span>ESC CLOSE</span>
            </div>
            <div className="flex items-center gap-1">
              <Command size={10} />
              <span>KAIROS OS COMMAND PALETTE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
