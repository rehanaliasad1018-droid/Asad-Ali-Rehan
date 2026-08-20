import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Copy, Check, Sparkles, Send, Phone, MapPin, Globe } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

export const ContactSection: React.FC = () => {
  const {
    profile,
    accentTheme,
    openInquiry,
    showToast,
    setCursorVariant,
    triggerHoverSound,
  } = usePortfolio();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    showToast(`Email copied: ${profile.email}`);
  };

  const socials = [
    { label: 'BEHANCE', url: profile.socials.behance, id: 'behance' },
    { label: 'DRIBBBLE', url: profile.socials.dribbble, id: 'dribbble' },
    { label: 'LINKEDIN', url: profile.socials.linkedin, id: 'linkedin' },
    { label: 'INSTAGRAM', url: profile.socials.instagram, id: 'instagram' },
    { label: 'READ.CV', url: profile.socials.readcv, id: 'readcv' },
  ];

  return (
    <section id="contact" className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 border-t border-black/10 relative bg-[#FAF9F5] text-[#111111] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-grain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8 text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase">
          <span className="w-8 h-[1px] bg-black/30" />
          <span>10 // INITIATE COLLABORATION</span>
        </div>

        {/* Massive CTA Headline */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-black uppercase tracking-tight leading-[0.90]"
          >
            HAVE A PROJECT <br />
            <span
              className="font-editorial italic font-light lowercase"
              style={{ color: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex }}
            >
              in mind?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-editorial text-2xl sm:text-4xl text-neutral-700 italic font-light mt-6"
          >
            Let's create something memorable.
          </motion.p>
        </div>

        {/* Action Buttons & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-black/10">
          {/* Main Action Triggers */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* START A PROJECT BUTTON */}
              <button
                onClick={openInquiry}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-10 py-5 font-mono-code text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg transition-all duration-300 hover:bg-black hover:text-white flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex,
                  color: accentTheme.hex === '#FFFFFF' ? '#FFFFFF' : '#000000',
                }}
              >
                <span>LET'S CONNECT</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>

              {/* EMAIL ME BUTTON */}
              <a
                href={`mailto:${profile.email}?subject=Project%20Inquiry%20—%20Design%20Collaboration`}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-10 py-5 font-mono-code text-[11px] font-bold tracking-[0.2em] uppercase border border-black/30 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3"
              >
                <Mail size={15} />
                <span>EMAIL ME</span>
              </a>
            </div>

            {/* 1-Click Clipboard Copy Pill */}
            <div className="p-6 bg-white border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] mb-1">
                  DIRECT EMAIL DISPATCH
                </div>
                <div className="font-mono-code text-sm sm:text-base text-black font-bold tracking-wider">
                  {profile.email}
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  triggerHoverSound();
                }}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-5 py-2.5 bg-[#FAF9F5] border border-black/15 text-[10px] font-mono-code tracking-[0.15em] uppercase text-black hover:bg-black hover:text-white transition-all flex items-center gap-2 self-start sm:self-center cursor-pointer shadow-2xs"
              >
                <Copy size={12} />
                <span>COPY ADDRESS</span>
              </button>
            </div>
          </div>

          {/* Socials & Location Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] mb-3">
                // CONNECT ON SOCIAL NETWORKS
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                      setCursorVariant('pointer');
                      triggerHoverSound();
                    }}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="p-4 bg-white border border-black/10 text-[10px] font-mono-code tracking-[0.15em] uppercase text-neutral-800 hover:text-black hover:border-black/40 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border border-black/10 flex items-center justify-between text-[11px] font-mono-code text-neutral-600 shadow-2xs">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-neutral-500" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-neutral-900 font-medium">AVAILABLE FOR COMMISSIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
