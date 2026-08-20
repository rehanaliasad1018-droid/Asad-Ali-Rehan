import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, Eye, EyeOff, Sparkles, Sliders, X, Maximize, Compass } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

export const GridOverlayHUD: React.FC = () => {
  const { accentTheme, triggerClickSound, showToast } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [showColumns, setShowColumns] = useState(true);
  const [showBaselines, setShowBaselines] = useState(true);
  const [showGoldenRatio, setShowGoldenRatio] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: '0.00', normY: '0.00' });
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth).toFixed(3);
      const normY = (e.clientY / window.innerHeight).toFixed(3);
      setMousePos({ x: e.clientX, y: e.clientY, normX, normY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  const toggleHUD = () => {
    triggerClickSound();
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      showToast('Architectural Swiss Grid Overlay Activated');
    }
  };

  return (
    <>
      {/* Floating Toggle Button on Bottom-Left */}
      <div className="fixed bottom-6 left-6 z-[80] print:hidden">
        <button
          onClick={toggleHUD}
          className={`px-3 py-2 border font-mono-code text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all cursor-pointer ${
            isOpen
              ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              : 'bg-[#111111]/90 text-white/70 border-white/20 hover:border-white/50 hover:text-white'
          }`}
        >
          <Grid size={12} style={{ color: isOpen ? '#000000' : accentTheme.hex }} />
          <span>{isOpen ? 'GRID // ON' : '📐 ARCHITECTURAL GRID'}</span>
        </button>
      </div>

      {/* Full-Screen Architectural Swiss Grid Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-[75] select-none"
          >
            {/* 12-Column Grid Layout Guides */}
            {showColumns && (
              <div className="w-full h-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-6 sm:grid-cols-12 gap-4 h-full pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full border-x border-cyan-400/10 bg-cyan-500/[0.015] flex flex-col justify-between py-4"
                  >
                    <span className="text-[8px] font-mono-code text-cyan-400/40 px-1">COL {String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[8px] font-mono-code text-cyan-400/30 px-1 text-right">{(100 / 12).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* 8pt / 16pt Baseline Rhythm Guides */}
            {showBaselines && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(0, 240, 255, 0.12) 1px, transparent 1px)',
                  backgroundSize: '100% 24px',
                }}
              />
            )}

            {/* Golden Ratio Blueprint Spiral Overlay */}
            {showGoldenRatio && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                <div className="w-[80vw] h-[50vw] max-w-5xl max-h-[600px] border border-amber-400/40 relative">
                  <div className="absolute top-0 right-0 w-[38.2%] h-full border-l border-amber-400/30" />
                  <div className="absolute top-0 right-0 w-[38.2%] h-[61.8%] border-b border-amber-400/30" />
                  <div className="absolute top-4 left-4 text-[9px] font-mono-code text-amber-400">
                    GOLDEN RATIO (φ = 1.618033) // HARMONIC PROPORTION
                  </div>
                </div>
              </div>
            )}

            {/* Live Crosshair Following Cursor */}
            {showCoordinates && (
              <div
                className="fixed pointer-events-none transition-transform duration-75 z-[78]"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Crosshair lines */}
                <div className="w-12 h-[1px] bg-cyan-400/60 -translate-x-1/2" />
                <div className="w-[1px] h-12 bg-cyan-400/60 -translate-y-1/2 absolute top-0 left-0" />
                <div className="absolute top-3 left-3 bg-black/85 border border-cyan-400/40 px-2 py-1 text-[9px] font-mono-code text-cyan-300 whitespace-nowrap shadow-lg">
                  X:{mousePos.x} Y:{mousePos.y} ({mousePos.normX}, {mousePos.normY})
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Blueprint HUD Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-6 z-[85] w-72 bg-[#121212]/95 border border-white/20 p-4 shadow-2xl backdrop-blur-md text-white font-mono-code select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[10px]">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Compass size={12} />
                <span>SWISS GRID METRICS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            {/* Viewport Meta */}
            <div className="text-[9px] text-white/50 space-y-1 mb-3 bg-white/[0.03] p-2 border border-white/5">
              <div className="flex justify-between">
                <span>VIEWPORT:</span>
                <span className="text-white font-bold">{viewportSize.w} × {viewportSize.h}PX</span>
              </div>
              <div className="flex justify-between">
                <span>GRID SYSTEM:</span>
                <span className="text-cyan-400">12-COL MODULAR</span>
              </div>
              <div className="flex justify-between">
                <span>BASELINE RHYTHM:</span>
                <span className="text-white font-bold">24PX (8PT SYSTEM)</span>
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="space-y-1.5 text-[10px]">
              <button
                onClick={() => setShowColumns((v) => !v)}
                className={`w-full px-2.5 py-1.5 border text-left flex items-center justify-between cursor-pointer transition-all ${
                  showColumns ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <span>12-Column Grid</span>
                <span>{showColumns ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setShowBaselines((v) => !v)}
                className={`w-full px-2.5 py-1.5 border text-left flex items-center justify-between cursor-pointer transition-all ${
                  showBaselines ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <span>8pt Rhythm Baselines</span>
                <span>{showBaselines ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setShowGoldenRatio((v) => !v)}
                className={`w-full px-2.5 py-1.5 border text-left flex items-center justify-between cursor-pointer transition-all ${
                  showGoldenRatio ? 'bg-amber-500/20 border-amber-400/40 text-amber-300' : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <span>Golden Spiral (1.618)</span>
                <span>{showGoldenRatio ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setShowCoordinates((v) => !v)}
                className={`w-full px-2.5 py-1.5 border text-left flex items-center justify-between cursor-pointer transition-all ${
                  showCoordinates ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <span>Cursor Crosshairs</span>
                <span>{showCoordinates ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
