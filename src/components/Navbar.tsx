import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sliders, Menu, X, ArrowUpRight, Palette, Command, Calculator, FileText, FlaskConical } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';
import { ACCENT_THEMES } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const {
    profile,
    accentTheme,
    setAccentTheme,
    soundEnabled,
    toggleSound,
    openInquiry,
    openProfileDrawer,
    openCommandPalette,
    openEstimator,
    openResume,
    setCursorVariant,
    triggerHoverSound,
  } = usePortfolio();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracker
      const sections = ['hero', 'work', 'about', 'expertise', 'design-lab', 'experience', 'tools', 'process', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'LAB', href: '#design-lab', id: 'design-lab' },
    { label: 'EXPERTISE', href: '#expertise', id: 'expertise' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'TOOLS', href: '#tools', id: 'tools' },
    { label: 'PROCESS', href: '#process', id: 'process' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Monogram / Designer Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            onMouseEnter={() => {
              setCursorVariant('pointer');
              triggerHoverSound();
            }}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            {profile.avatarUrl && (
              <div className="w-8 h-8 overflow-hidden border border-white/20 shrink-0 bg-[#1c1c1c]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="text-[13px] font-display font-black tracking-[0.3em] uppercase text-white group-hover:text-zinc-200 transition-colors">
              {profile.name} <span style={{ color: accentTheme.hex }}>/</span> <span className="text-zinc-400 font-mono-code text-[11px] font-normal tracking-[0.25em]">PORTFOLIO</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[10px] font-mono-code font-medium tracking-[0.25em] uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    triggerHoverSound();
                  }}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`transition-all duration-200 cursor-pointer pb-1 relative ${
                    isActive
                      ? 'text-white border-b-2 font-bold'
                      : 'text-white/70 hover:text-white'
                  }`}
                  style={{
                    borderColor: isActive ? accentTheme.hex : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              onClick={openCommandPalette}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              title="Open Command Palette (⌘K)"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-white/10 hover:border-white/30 text-[10px] font-mono-code text-white/60 hover:text-white bg-white/[0.03] transition-all cursor-pointer"
            >
              <Command size={11} />
              <span>⌘K</span>
            </button>

            {/* Accent Theme Picker */}
            <div className="relative">
              <button
                onClick={() => setPaletteMenuOpen(!paletteMenuOpen)}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                title="Change visual accent color"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all bg-white/[0.03]"
              >
                <Palette size={14} style={{ color: paletteMenuOpen ? accentTheme.hex : undefined }} />
              </button>

              <AnimatePresence>
                {paletteMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 p-2 bg-[#121216] border border-white/15 rounded-2xl shadow-2xl flex gap-2 z-50"
                  >
                    {ACCENT_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setAccentTheme(theme);
                          setPaletteMenuOpen(false);
                        }}
                        title={theme.name}
                        className="w-6 h-6 rounded-full transition-transform hover:scale-125 relative flex items-center justify-center"
                        style={{ backgroundColor: theme.hex }}
                      >
                        {accentTheme.id === theme.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              title={soundEnabled ? 'Disable UI sound effects' : 'Enable UI sound effects'}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all bg-white/[0.03]"
            >
              {soundEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} />}
            </button>

            {/* Live Profile / CV Customizer Drawer Trigger */}
            <button
              onClick={openProfileDrawer}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              title="Customize CV & Profile Data"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all bg-white/[0.03]"
            >
              <Sliders size={14} />
            </button>

            {/* Main CTA: Let's Work Together / Start a Project */}
            <button
              onClick={openInquiry}
              onMouseEnter={() => {
                setCursorVariant('pointer');
                triggerHoverSound();
              }}
              onMouseLeave={() => setCursorVariant('default')}
              className="hidden sm:flex items-center gap-2 px-5 py-2 text-[10px] font-mono-code font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-black cursor-pointer shadow-md"
              style={{
                backgroundColor: accentTheme.hex,
                color: '#000000',
              }}
            >
              <span>LET'S CONNECT</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 border border-white/15 flex items-center justify-center text-white bg-white/5"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono-code tracking-[0.25em] text-zinc-500 uppercase">
                // NAVIGATION MENU
              </span>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx }}
                    className="font-display text-3xl font-black tracking-tight text-white hover:text-zinc-300 flex items-center justify-between border-b border-white/10 pb-3"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono-code text-zinc-600">0{idx + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-4 text-center font-mono-code font-bold tracking-[0.2em] uppercase text-xs hover:bg-white transition-colors"
                style={{ backgroundColor: accentTheme.hex, color: '#000000' }}
              >
                START A PROJECT
              </button>

              <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400">
                <span>{profile.email}</span>
                <span className="text-emerald-400">● AVAILABLE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
