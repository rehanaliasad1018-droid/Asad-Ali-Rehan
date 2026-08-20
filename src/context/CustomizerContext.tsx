import React, { createContext, useContext, useState, useEffect } from 'react';
import { DesignerProfile, AccentTheme, Project } from '../types';
import { DEFAULT_DESIGNER_PROFILE, ACCENT_THEMES, PROJECTS } from '../data/portfolioData';
import { playClickSound, playHoverSound, playSuccessSound } from '../utils/sound';

interface CustomizerContextType {
  profile: DesignerProfile;
  setProfile: React.Dispatch<React.SetStateAction<DesignerProfile>>;
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  triggerClickSound: () => void;
  triggerHoverSound: () => void;
  triggerSuccessSound: () => void;
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
  isInquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  isEstimatorOpen: boolean;
  openEstimator: () => void;
  closeEstimator: () => void;
  isResumeOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
  resetProfileToDefault: () => void;
  copyToastMessage: string | null;
  showToast: (message: string) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'pointer' | 'project' | 'view' | 'drag' | 'copy';
  setCursorVariant: (variant: 'default' | 'pointer' | 'project' | 'view' | 'drag' | 'copy') => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<DesignerProfile>(() => {
    try {
      const saved = localStorage.getItem('kairos_designer_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const name = (!parsed.name || parsed.name.toUpperCase().includes('REHAN')) ? DEFAULT_DESIGNER_PROFILE.name : parsed.name;
        return {
          ...DEFAULT_DESIGNER_PROFILE,
          ...parsed,
          name,
          avatarUrl: parsed.avatarUrl || DEFAULT_DESIGNER_PROFILE.avatarUrl,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_DESIGNER_PROFILE;
  });

  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(() => {
    try {
      const saved = localStorage.getItem('kairos_accent_theme');
      if (saved) {
        const found = ACCENT_THEMES.find((t) => t.id === saved);
        if (found) return found;
      }
    } catch {
      // Fallback
    }
    return ACCENT_THEMES[0];
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kairos_sound_enabled');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [copyToastMessage, setCopyToastMessage] = useState<string | null>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'project' | 'view' | 'drag' | 'copy'>('default');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsEstimatorOpen(false);
        setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kairos_designer_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('kairos_accent_theme', accentTheme.id);
      document.documentElement.style.setProperty('--accent-color', accentTheme.hex);
      document.documentElement.style.setProperty('--accent-rgb', accentTheme.rgb);
    } catch {}
  }, [accentTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('kairos_sound_enabled', soundEnabled ? 'true' : 'false');
    } catch {}
  }, [soundEnabled]);

  const setAccentTheme = (theme: AccentTheme) => {
    setAccentThemeState(theme);
    triggerClickSound();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playSuccessSound(true);
    }
  };

  const triggerClickSound = () => playClickSound(soundEnabled);
  const triggerHoverSound = () => playHoverSound(soundEnabled);
  const triggerSuccessSound = () => playSuccessSound(soundEnabled);

  const openProject = (project: Project) => {
    setActiveProject(project);
    triggerClickSound();
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setActiveProject(null);
    triggerClickSound();
    document.body.style.overflow = 'unset';
  };

  const openInquiry = () => {
    setIsInquiryOpen(true);
    triggerClickSound();
    document.body.style.overflow = 'hidden';
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
    triggerClickSound();
    document.body.style.overflow = 'unset';
  };

  const openProfileDrawer = () => {
    setIsProfileDrawerOpen(true);
    triggerClickSound();
  };

  const closeProfileDrawer = () => {
    setIsProfileDrawerOpen(false);
    triggerClickSound();
  };

  const openCommandPalette = () => {
    setIsCommandPaletteOpen(true);
    triggerClickSound();
  };

  const closeCommandPalette = () => {
    setIsCommandPaletteOpen(false);
    triggerClickSound();
  };

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen((prev) => !prev);
    triggerClickSound();
  };

  const openEstimator = () => {
    setIsEstimatorOpen(true);
    triggerClickSound();
    document.body.style.overflow = 'hidden';
  };

  const closeEstimator = () => {
    setIsEstimatorOpen(false);
    triggerClickSound();
    document.body.style.overflow = 'unset';
  };

  const openResume = () => {
    setIsResumeOpen(true);
    triggerClickSound();
    document.body.style.overflow = 'hidden';
  };

  const closeResume = () => {
    setIsResumeOpen(false);
    triggerClickSound();
    document.body.style.overflow = 'unset';
  };

  const resetProfileToDefault = () => {
    setProfile(DEFAULT_DESIGNER_PROFILE);
    showToast('Profile reset to default CV data');
  };

  const showToast = (message: string) => {
    setCopyToastMessage(message);
    triggerSuccessSound();
    setTimeout(() => {
      setCopyToastMessage(null);
    }, 2800);
  };

  return (
    <CustomizerContext.Provider
      value={{
        profile,
        setProfile,
        accentTheme,
        setAccentTheme,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        triggerClickSound,
        triggerHoverSound,
        triggerSuccessSound,
        activeProject,
        openProject,
        closeProject,
        isInquiryOpen,
        openInquiry,
        closeInquiry,
        isProfileDrawerOpen,
        openProfileDrawer,
        closeProfileDrawer,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
        isEstimatorOpen,
        openEstimator,
        closeEstimator,
        isResumeOpen,
        openResume,
        closeResume,
        resetProfileToDefault,
        copyToastMessage,
        showToast,
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a CustomizerProvider');
  }
  return context;
};
