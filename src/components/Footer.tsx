import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

export const Footer: React.FC = () => {
  const { profile, accentTheme, setCursorVariant, triggerHoverSound } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeText = "Brand Identity • Art Direction • Social Media Design • Digital Strategy • Creative Visuals • Packaging • Campaigns";

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F5F5] select-none">
      {/* High-Impact Editorial White Ticker Tape Marquee */}
      <div className="h-[72px] bg-white text-black flex items-center overflow-hidden whitespace-nowrap border-t border-white/10">
        <div className="flex items-center space-x-12 px-6 animate-marquee">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] font-display">
            {marqueeText}
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] font-display">
            {marqueeText}
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] font-display">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Main Footer Details */}
      <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="text-[13px] font-display font-black tracking-[0.3em] uppercase text-white mb-2">
              {profile.name} <span style={{ color: accentTheme.hex }}>/</span> <span className="text-zinc-500 font-mono-code text-[11px] tracking-[0.25em]">PORTFOLIO</span>
            </div>
            <p className="text-xs font-mono-code text-white/50 tracking-wider">
              // SENIOR ART DIRECTOR &amp; GRAPHIC DESIGNER
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="font-editorial text-2xl italic text-white/90 font-light">
              Design with purpose. Visuals with impact.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => {
              setCursorVariant('pointer');
              triggerHoverSound();
            }}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-white text-[10px] font-mono-code font-bold tracking-[0.2em] uppercase transition-all self-start md:self-auto cursor-pointer hover:bg-white hover:text-black"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] font-mono-code text-white/40 tracking-[0.15em] uppercase">
          <div>
            © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED. CRAFTED FOR EDITORIAL EXCELLENCE.
          </div>

          <div className="flex items-center gap-6 text-white/60">
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
              {profile.email}
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LINKEDIN
            </a>
            <a href={profile.socials.behance} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              BEHANCE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
