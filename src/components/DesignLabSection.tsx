import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Type, 
  Palette, 
  Layers, 
  Sliders, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Maximize2,
  RefreshCw,
  Download,
  RotateCw,
  Box,
  Sun
} from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

type LabTab = 'typography' | 'color' | 'retouch' | 'specimen' | 'foil';

const FONT_PAIRINGS = [
  {
    name: 'Monumental Editorial',
    headingFont: 'font-display',
    bodyFont: 'font-editorial italic',
    description: 'Syne Display Bold paired with Instrument Serif Italic for luxury & high-fashion editorial.',
  },
  {
    name: 'Precision Brutalist',
    headingFont: 'font-mono-code font-black tracking-widest',
    bodyFont: 'font-mono-code font-light',
    description: 'Monospace high-density grid for architectural and technical branding.',
  },
  {
    name: 'Cinematic Modernist',
    headingFont: 'font-display font-extrabold tracking-tight',
    bodyFont: 'font-sans font-light',
    description: 'Clean grotesque geometric heading with humanist body typography.',
  },
];

const COLOR_SCHEMES = [
  {
    name: 'Editorial Signal (Default)',
    primary: '#FF4E00',
    secondary: '#1A1A1A',
    background: '#0A0A0A',
    text: '#F5F5F5',
    contrastRatio: '13.8:1',
    rating: 'AAA (Pass)',
  },
  {
    name: 'Acid Cybernetic',
    primary: '#E2FD52',
    secondary: '#1C2208',
    background: '#080A04',
    text: '#FAFAFA',
    contrastRatio: '15.2:1',
    rating: 'AAA (Pass)',
  },
  {
    name: 'Tokyo Neo-Cyan',
    primary: '#00F0FF',
    secondary: '#071F24',
    background: '#040B0D',
    text: '#FFFFFF',
    contrastRatio: '14.1:1',
    rating: 'AAA (Pass)',
  },
  {
    name: 'Hyper Violet',
    primary: '#B026FF',
    secondary: '#1A0826',
    background: '#0A040F',
    text: '#F8F4FA',
    contrastRatio: '12.4:1',
    rating: 'AAA (Pass)',
  },
];

export const DesignLabSection: React.FC = () => {
  const { accentTheme, profile, showToast, setCursorVariant, triggerHoverSound, triggerClickSound } = usePortfolio();

  const [activeTab, setActiveTab] = useState<LabTab>('typography');

  // Typography Playground State
  const [customHeadline, setCustomHeadline] = useState('FORM FOLLOWS CONCEPT');
  const [customSubtext, setCustomSubtext] = useState('Crafting timeless brand artifacts through disciplined typography, architectural grids, and meticulous color theory.');
  const [selectedPairing, setSelectedPairing] = useState(0);
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0.05);
  const [textTransform, setTextTransform] = useState<'uppercase' | 'none' | 'capitalize'>('uppercase');

  // Retouching Split Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Color Matrix State
  const [selectedScheme, setSelectedScheme] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Specimen layout state
  const [specimenFormat, setSpecimenFormat] = useState<'poster' | 'badge' | 'social'>('poster');

  // 3D Tactile Foil & Hologram State
  const [foilFinish, setFoilFinish] = useState<'gold' | 'hologram' | 'palladium' | 'rose' | 'deboss' | 'neon'>('gold');
  const [paperStock, setPaperStock] = useState<'obsidian' | 'travertine' | 'hemp' | 'silver'>('obsidian');
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [cardRotX, setCardRotX] = useState(-8);
  const [cardRotY, setCardRotY] = useState(14);
  const [sheenPos, setSheenPos] = useState({ x: 45, y: 35 });
  const [cornerRadius, setCornerRadius] = useState(12);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 22;
    const rotY = ((x - centerX) / centerX) * 22;
    setCardRotX(rotX);
    setCardRotY(rotY);
    setSheenPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleCardMouseLeave = () => {
    setCardRotX(-8);
    setCardRotY(14);
    setSheenPos({ x: 45, y: 35 });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    showToast(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, position)));
  };

  return (
    <section id="design-lab" className="py-24 sm:py-32 border-b border-black/10 bg-[#FFFFFF] text-[#111111] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical size={14} style={{ color: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex }} />
              <span
                className="text-[10px] font-mono-code font-bold uppercase tracking-[0.25em]"
                style={{ color: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex }}
              >
                04 // INTERACTIVE DESIGN LAB &amp; SPECIMEN
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Visual Laboratory &amp; <span className="font-editorial italic font-light">Craft Sandbox.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-mono-code leading-relaxed">
            Test typography pairings in real-time, inspect wireframe-to-render geometry, and evaluate WCAG AAA color token matrixes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-black/10 pb-4">
          <button
            onClick={() => {
              setActiveTab('typography');
              triggerClickSound();
            }}
            className={`px-4 py-2.5 text-[11px] font-mono-code font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'typography'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-[#F4F4F2] text-neutral-700 border-black/10 hover:border-black/30 hover:text-black'
            }`}
          >
            <Type size={13} />
            <span>01 // Typography Studio</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('color');
              triggerClickSound();
            }}
            className={`px-4 py-2.5 text-[11px] font-mono-code font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'color'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-[#F4F4F2] text-neutral-700 border-black/10 hover:border-black/30 hover:text-black'
            }`}
          >
            <Palette size={13} />
            <span>02 // Color &amp; Contrast Matrix</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('retouch');
              triggerClickSound();
            }}
            className={`px-4 py-2.5 text-[11px] font-mono-code font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'retouch'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-[#F4F4F2] text-neutral-700 border-black/10 hover:border-black/30 hover:text-black'
            }`}
          >
            <Layers size={13} />
            <span>03 // Wireframe vs Render Inspector</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('specimen');
              triggerClickSound();
            }}
            className={`px-4 py-2.5 text-[11px] font-mono-code font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'specimen'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-[#F4F4F2] text-neutral-700 border-black/10 hover:border-black/30 hover:text-black'
            }`}
          >
            <Sparkles size={13} />
            <span>04 // Specimen Poster Generator</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('foil');
              triggerClickSound();
            }}
            className={`px-4 py-2.5 text-[11px] font-mono-code font-bold uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'foil'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-[#F4F4F2] text-neutral-700 border-black/10 hover:border-black/30 hover:text-black'
            }`}
          >
            <Box size={13} />
            <span>05 // 3D Tactile Foil &amp; Hologram Lab</span>
          </button>
        </div>

        {/* Tab 1: Typography Studio */}
        {activeTab === 'typography' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-4 p-6 bg-[#FAF9F5] border border-black/10 space-y-6 shadow-sm">
              <div>
                <label className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                  // HEADLINE TEXT
                </label>
                <input
                  type="text"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 text-black text-xs font-mono-code focus:outline-none focus:border-black/40"
                  placeholder="Enter headline..."
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                  // EDITORIAL SUBTEXT
                </label>
                <textarea
                  value={customSubtext}
                  onChange={(e) => setCustomSubtext(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 text-black text-xs font-mono-code focus:outline-none focus:border-black/40 resize-none"
                  placeholder="Enter description..."
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                  // FONT PAIRING PRESETS
                </label>
                <div className="space-y-2">
                  {FONT_PAIRINGS.map((pairing, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPairing(idx);
                        triggerClickSound();
                      }}
                      className={`w-full text-left p-3 border text-xs transition-all cursor-pointer ${
                        selectedPairing === idx
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-black/10 bg-white text-neutral-700 hover:border-black/30'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-wider text-[11px]">{pairing.name}</div>
                      <div className={`text-[10px] font-mono-code mt-0.5 ${selectedPairing === idx ? 'text-white/70' : 'text-neutral-400'}`}>{pairing.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/10">
                <div>
                  <div className="flex justify-between text-[10px] font-mono-code text-neutral-600 mb-1">
                    <span>FONT SIZE</span>
                    <span>{fontSize}PX</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="80"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono-code text-neutral-600 mb-1">
                    <span>LETTER TRACKING</span>
                    <span>{(letterSpacing * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="-0.05"
                    max="0.2"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  {(['uppercase', 'capitalize', 'none'] as const).map((trans) => (
                    <button
                      key={trans}
                      onClick={() => setTextTransform(trans)}
                      className={`flex-1 py-2 text-[10px] font-mono-code uppercase border transition-all cursor-pointer ${
                        textTransform === trans
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-neutral-600 border-black/10 hover:border-black/30'
                      }`}
                    >
                      {trans}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Canvas Output */}
            <div className="lg:col-span-8 p-8 sm:p-12 bg-[#111111] border border-black/20 min-h-[460px] flex flex-col justify-between relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none font-mono-code text-[10px] text-white text-right">
                GRID // 12-COL 8PT HARMONY<br />
                SCALE // {fontSize}PX @ {letterSpacing}EM
              </div>

              <div className="space-y-6 z-10 my-auto">
                <div
                  className={`${FONT_PAIRINGS[selectedPairing].headingFont} leading-[0.95] text-white transition-all`}
                  style={{
                    fontSize: `${fontSize}px`,
                    letterSpacing: `${letterSpacing}em`,
                    textTransform,
                  }}
                >
                  {customHeadline || 'HEADLINE PREVIEW'}
                </div>

                <p
                  className={`${FONT_PAIRINGS[selectedPairing].bodyFont} text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed`}
                >
                  {customSubtext}
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono-code text-white/40 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentTheme.hex }} />
                  <span>DESIGNER: {profile.name}</span>
                </div>
                <div>TYPE SPECIMEN // KAIROS ARCHIVE</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Color Matrix */}
        {activeTab === 'color' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em]">
                // ACCREDITED DESIGN PALETTES
              </div>

              {COLOR_SCHEMES.map((scheme, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedScheme(idx);
                    triggerClickSound();
                  }}
                  className={`p-5 border transition-all cursor-pointer ${
                    selectedScheme === idx
                      ? 'border-black bg-white shadow-md'
                      : 'border-black/10 bg-[#FAF9F5] hover:border-black/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-display font-bold text-sm text-black uppercase">{scheme.name}</span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 bg-black/5 text-neutral-700 border border-black/10">
                      WCAG {scheme.rating}
                    </span>
                  </div>

                  {/* Swatch preview */}
                  <div className="grid grid-cols-4 gap-2 h-10 mb-3">
                    <div className="h-full border border-black/10" style={{ backgroundColor: scheme.primary }} />
                    <div className="h-full border border-black/10" style={{ backgroundColor: scheme.secondary }} />
                    <div className="h-full border border-black/10" style={{ backgroundColor: scheme.background }} />
                    <div className="h-full border border-black/10" style={{ backgroundColor: scheme.text }} />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono-code text-neutral-500">
                    <span>Contrast: {scheme.contrastRatio}</span>
                    <span>Primary: {scheme.primary}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Specimen Token Inspector */}
            <div className="lg:col-span-7 p-8 bg-[#FAF9F5] border border-black/10 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-black/10 mb-6">
                  <div>
                    <span className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block">
                      ACTIVE TOKEN SYSTEM
                    </span>
                    <h3 className="font-display text-xl font-bold text-black uppercase">
                      {COLOR_SCHEMES[selectedScheme].name}
                    </h3>
                  </div>
                  <div className="text-right font-mono-code text-[10px] text-neutral-500">
                    RATIO // {COLOR_SCHEMES[selectedScheme].contrastRatio}<br />
                    STANDARDS // WCAG 2.1 AAA
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'PRIMARY ACCENT', hex: COLOR_SCHEMES[selectedScheme].primary },
                    { label: 'SECONDARY SHADOW', hex: COLOR_SCHEMES[selectedScheme].secondary },
                    { label: 'CANVAS BACKGROUND', hex: COLOR_SCHEMES[selectedScheme].background },
                    { label: 'EDITORIAL TEXT', hex: COLOR_SCHEMES[selectedScheme].text },
                  ].map((token, i) => (
                    <div
                      key={i}
                      onClick={() => copyToClipboard(token.hex, token.label)}
                      className="p-4 bg-white border border-black/10 group hover:border-black/40 transition-all cursor-pointer relative shadow-xs"
                    >
                      <div className="w-full h-16 mb-3 border border-black/10" style={{ backgroundColor: token.hex }} />
                      <div className="text-[9px] font-mono-code text-neutral-500 uppercase mb-1">{token.label}</div>
                      <div className="text-xs font-mono-code text-black font-bold flex items-center justify-between">
                        <span>{token.hex}</span>
                        {copiedColor === token.hex ? <Check size={12} className="text-green-600" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real-time Render Sandbox */}
                <div
                  className="p-6 border border-black/15 shadow-sm"
                  style={{
                    backgroundColor: COLOR_SCHEMES[selectedScheme].background,
                    color: COLOR_SCHEMES[selectedScheme].text,
                  }}
                >
                  <div
                    className="text-[10px] font-mono-code font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: COLOR_SCHEMES[selectedScheme].primary }}
                  >
                    // LIVE CONTRAST RENDERING
                  </div>
                  <h4 className="font-display text-2xl font-bold uppercase mb-2">
                    Visual Balance Meets Legibility.
                  </h4>
                  <p className="text-xs font-mono-code opacity-80 leading-relaxed">
                    This palette satisfies digital accessibility criteria for luxury graphic identity, outdoor poster typography, and high-impact digital products.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 flex justify-between items-center text-[10px] font-mono-code text-neutral-500">
                <span>Click any color swatch to copy hex code</span>
                <span>Export ready for Figma / CSS Tokens</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Retouch & Wireframe Inspector */}
        {activeTab === 'retouch' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-mono-code text-neutral-600">
              <div>
                <span className="text-black font-bold">DRAG OR HOVER SLIDER:</span> Compare raw vector wireframe geometry against finished art-directed assets.
              </div>
              <div className="flex items-center gap-4 text-[10px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> LEFT: WIREFRAME CAD / VECTOR
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> RIGHT: FINAL FINISH / TEXTURE
                </span>
              </div>
            </div>

            {/* Split Comparison Canvas */}
            <div
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
              className="relative w-full h-[460px] sm:h-[540px] overflow-hidden border border-black/20 bg-black cursor-ew-resize select-none shadow-xl"
            >
              {/* Layer B: Finished Artwork (Right) */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
                  alt="Finished Render"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-black/80 border border-white/20 text-[10px] font-mono-code text-white uppercase tracking-wider backdrop-blur-sm">
                  FINAL ARTWORK // 100% TEXTURED
                </div>
              </div>

              {/* Layer A: Raw Wireframe / Vector Geometry (Left, clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="w-[100vw] max-w-7xl h-full relative bg-[#090909]">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
                    alt="Wireframe Render"
                    className="w-full h-full object-cover grayscale contrast-200 opacity-30"
                  />
                  {/* Vector Grid Overlay Simulation */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff22_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff22_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="absolute top-12 left-12 p-4 border border-[#00f0ff]/50 bg-black/70 font-mono-code text-[10px] text-[#00f0ff] space-y-1">
                    <div>GEOMETRY // 48-BEZIER CURVATURE</div>
                    <div>KERNING ANCHORS // ACTIVE</div>
                    <div>VECTOR MESH // 32,400 VERTICES</div>
                  </div>
                  <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-black/80 border border-[#00f0ff]/40 text-[10px] font-mono-code text-[#00f0ff] uppercase tracking-wider backdrop-blur-sm">
                    CAD WIREFRAME // VECTOR BLUEPRINT
                  </div>
                </div>
              </div>

              {/* Splitter Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono-code text-[10px] font-black shadow-2xl">
                  ↔
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Specimen Poster Generator */}
        {activeTab === 'specimen' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em]">
                // POSTER FORMAT CONFIGURATOR
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-black">
                Export Custom Specimen One-Sheet.
              </h3>
              <p className="text-xs font-mono-code text-neutral-600 leading-relaxed">
                Generate an architectural specimen card featuring current accent tokens, signature typography, and verified creative credentials.
              </p>

              <div className="flex gap-2">
                {(['poster', 'badge', 'social'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSpecimenFormat(fmt)}
                    className={`flex-1 py-3 text-[10px] font-mono-code uppercase font-bold border transition-all cursor-pointer ${
                      specimenFormat === fmt
                        ? 'bg-black text-white border-black'
                        : 'bg-[#FAF9F5] text-neutral-700 border-black/10 hover:border-black/30'
                    }`}
                  >
                    {fmt} Mode
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-black/10">
                <button
                  onClick={() => {
                    showToast('Specimen artifact ready! Use Print / Screenshot for high-res output.');
                  }}
                  className="w-full py-4 text-xs font-mono-code font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  style={{ backgroundColor: accentTheme.hex === '#FFFFFF' ? '#000000' : accentTheme.hex, color: accentTheme.hex === '#FFFFFF' ? '#FFFFFF' : '#000000' }}
                >
                  <Download size={14} />
                  <span>Download Specimen Sheet</span>
                </button>
              </div>
            </div>

            {/* Output Mockup */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md bg-[#161616] border border-black/30 p-8 shadow-2xl relative">
                {/* Header Meta */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-[8px] font-mono-code tracking-[0.3em] uppercase text-white/40 block">
                      ARCHIVE SPECIMEN NO. 804
                    </span>
                    <span className="text-xs font-mono-code text-white font-bold">{profile.name}</span>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: accentTheme.hex }}
                  />
                </div>

                {/* Main Headline */}
                <div className="py-6 space-y-3">
                  <div className="text-[10px] font-mono-code text-white/50 uppercase tracking-[0.25em]">
                    CREATIVE DIRECTION // DESIGN PRAXIS
                  </div>
                  <h2 className="font-display text-4xl font-black uppercase text-white tracking-tight leading-[0.9]">
                    VISUAL<br />
                    PRECISION &amp;<br />
                    <span style={{ color: accentTheme.hex }}>STRATEGY.</span>
                  </h2>
                  <p className="font-editorial italic text-base text-white/70 pt-2">
                    "Designing enduring brand identities that articulate authority and emotional resonance."
                  </p>
                </div>

                {/* Footer Meta Matrix */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-[9px] font-mono-code text-white/50">
                  <div>
                    <span className="block text-white/30">DISCIPLINE</span>
                    <span className="text-white">BRANDING</span>
                  </div>
                  <div>
                    <span className="block text-white/30">EXP</span>
                    <span className="text-white">{profile.yearsOfExperience}</span>
                  </div>
                  <div>
                    <span className="block text-white/30">STATUS</span>
                    <span className="text-white">AVAILABLE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Tab 5: 3D Tactile Foil & Hologram Simulator */}
        {activeTab === 'foil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-1">
                  05 // 3D FINISH &amp; SUBSTRATE PHYSICS
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-black">
                  Tactile Stamping &amp; Material Engine
                </h3>
                <p className="text-xs font-mono-code text-neutral-600 mt-1">
                  Hover and drag across the physical card to observe real-time specular lighting, holographic chromatic dispersion, and debossed micro-textures.
                </p>
              </div>

              {/* Foil Finish Selector */}
              <div>
                <label className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                  // METALLIC FOIL &amp; FINISH
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'gold', label: '24K Gold Foil', color: '#D4AF37' },
                    { id: 'hologram', label: 'Prismatic Holo', color: '#00FFFF' },
                    { id: 'palladium', label: 'Palladium Chrome', color: '#E0E0E0' },
                    { id: 'rose', label: 'Rose Copper', color: '#E0A899' },
                    { id: 'deboss', label: 'Blind Deboss', color: '#555555' },
                    { id: 'neon', label: 'Electric UV', color: '#E2FD52' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFoilFinish(f.id as any);
                        triggerClickSound();
                      }}
                      className={`p-2.5 border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        foilFinish === f.id
                          ? 'bg-black text-white border-black'
                          : 'bg-[#FAF9F5] text-neutral-700 border-black/10 hover:border-black/30'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20"
                        style={{ backgroundColor: f.color }}
                      />
                      <span className="text-[10px] font-mono-code font-bold uppercase truncate">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Stock Substrate Selector */}
              <div>
                <label className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                  // PAPER STOCK SUBSTRATE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'obsidian', label: 'Obsidian Cotton (700gsm)', desc: 'Ultra-matte charcoal' },
                    { id: 'travertine', label: 'Italian Travertine', desc: 'Warm ivory textured linen' },
                    { id: 'hemp', label: 'Raw Organic Hemp', desc: 'Compostable botanical flecks' },
                    { id: 'silver', label: 'Palladium Sheet', desc: 'Reflective aluminum card' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPaperStock(p.id as any);
                        triggerClickSound();
                      }}
                      className={`p-2.5 border text-left transition-all cursor-pointer ${
                        paperStock === p.id
                          ? 'border-black bg-black text-white'
                          : 'border-black/10 bg-[#FAF9F5] text-neutral-700 hover:border-black/30'
                      }`}
                    >
                      <div className="text-[10px] font-mono-code font-bold uppercase">{p.label}</div>
                      <div className={`text-[9px] font-mono-code ${paperStock === p.id ? 'text-white/70' : 'text-neutral-400'}`}>{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Adjustments: Corner Radius & Card Side Flip */}
              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setCardSide((s) => (s === 'front' ? 'back' : 'front'));
                      triggerClickSound();
                    }}
                    className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 border border-black text-[10px] font-mono-code font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <RotateCw size={12} />
                    <span>Flip Card: {cardSide === 'front' ? 'View Back' : 'View Front'}</span>
                  </button>

                  <div className="text-[10px] font-mono-code text-neutral-500 text-right">
                    TILT // {cardRotX.toFixed(0)}°X, {cardRotY.toFixed(0)}°Y
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono-code text-neutral-600 mb-1">
                    <span>CORNER DIE-CUT RADIUS</span>
                    <span>{cornerRadius}PX</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    value={cornerRadius}
                    onChange={(e) => setCornerRadius(Number(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 3D Interactive Card Stage */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#111111] border border-black/30 min-h-[460px] relative overflow-hidden shadow-xl">
              <div className="absolute top-4 left-4 text-[9px] font-mono-code text-white/50">
                DRAG OR HOVER MOUSE TO TILT 3D CARD IN REAL-TIME
              </div>

              <div className="absolute top-4 right-4 text-[9px] font-mono-code text-white/50">
                FINISH: {foilFinish.toUpperCase()} // 3D PERSPECTIVE: 1000PX
              </div>

              {/* Interactive 3D Perspective Card Container */}
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="w-full max-w-[420px] aspect-[1.6/1] cursor-grab active:cursor-grabbing relative transition-transform duration-100 ease-out select-none"
                style={{
                  perspective: '1200px',
                }}
              >
                {/* 3D Card Body */}
                <div
                  className="w-full h-full p-8 shadow-2xl relative overflow-hidden transition-all duration-150 border border-white/20"
                  style={{
                    borderRadius: `${cornerRadius}px`,
                    transform: `rotateX(${cardRotX}deg) rotateY(${cardRotY}deg)`,
                    transformStyle: 'preserve-3d',
                    backgroundColor:
                      paperStock === 'obsidian'
                        ? '#0e0e10'
                        : paperStock === 'travertine'
                        ? '#eadecf'
                        : paperStock === 'hemp'
                        ? '#d6cebe'
                        : '#1e2124',
                    color:
                      paperStock === 'obsidian' || paperStock === 'silver' ? '#ffffff' : '#111111',
                    boxShadow: `
                      ${-cardRotY * 1.5}px ${cardRotX * 1.5 + 20}px 40px rgba(0, 0, 0, 0.6),
                      0 0 20px rgba(255, 255, 255, 0.05)
                    `,
                  }}
                >
                  {/* Dynamic Specular Sheen Glare */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      background:
                        foilFinish === 'hologram'
                          ? `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(0, 255, 255, 0.4) 0%, rgba(255, 0, 255, 0.3) 30%, rgba(255, 255, 0, 0.2) 60%, transparent 80%)`
                          : foilFinish === 'gold'
                          ? `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 230, 140, 0.45) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 75%)`
                          : foilFinish === 'rose'
                          ? `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 190, 180, 0.45) 0%, rgba(224, 168, 153, 0.2) 40%, transparent 75%)`
                          : foilFinish === 'neon'
                          ? `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(226, 253, 82, 0.4) 0%, rgba(226, 253, 82, 0.1) 40%, transparent 75%)`
                          : `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`,
                    }}
                  />

                  {/* Micro-texture noise */}
                  <div className="absolute inset-0 opacity-10 bg-grain pointer-events-none" />

                  {cardSide === 'front' ? (
                    /* Front View */
                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[8px] font-mono-code uppercase tracking-[0.25em] opacity-60">
                            CREATIVE ARCHIVE // EST. 2026
                          </div>
                          <div
                            className="font-display font-black text-xl uppercase tracking-tight mt-1"
                            style={{
                              backgroundImage:
                                foilFinish === 'gold'
                                  ? 'linear-gradient(135deg, #FFE082 0%, #D4AF37 50%, #8D6E14 100%)'
                                  : foilFinish === 'hologram'
                                  ? 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)'
                                  : foilFinish === 'rose'
                                  ? 'linear-gradient(135deg, #FFE0D6 0%, #E0A899 50%, #8A4B38 100%)'
                                  : foilFinish === 'neon'
                                  ? 'linear-gradient(135deg, #E2FD52 0%, #A6CB10 100%)'
                                  : 'none',
                              WebkitBackgroundClip:
                                foilFinish === 'deboss' ? 'none' : 'text',
                              WebkitTextFillColor:
                                foilFinish === 'deboss' ? 'inherit' : 'transparent',
                              textShadow:
                                foilFinish === 'deboss'
                                  ? 'inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.2)'
                                  : 'none',
                            }}
                          >
                            {profile.name}
                          </div>
                        </div>

                        {/* Monogram Seal */}
                        <div
                          className="w-10 h-10 border flex items-center justify-center font-display font-black text-sm"
                          style={{
                            borderColor:
                              foilFinish === 'gold'
                                ? '#D4AF37'
                                : foilFinish === 'neon'
                                ? '#E2FD52'
                                : 'currentColor',
                            color:
                              foilFinish === 'gold'
                                ? '#D4AF37'
                                : foilFinish === 'neon'
                                ? '#E2FD52'
                                : 'inherit',
                          }}
                        >
                          K
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[9px] font-mono-code font-bold uppercase tracking-[0.2em] opacity-80">
                          {profile.title}
                        </div>
                        <div className="text-[8px] font-mono-code opacity-50">
                          PARIS • TOKYO • NEW YORK // {profile.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Back View */
                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="flex justify-between items-center border-b border-current/20 pb-2">
                        <span className="text-[8px] font-mono-code uppercase tracking-widest opacity-60">
                          ENCRYPTED IDENTITY TOKEN
                        </span>
                        <span className="text-[8px] font-mono-code opacity-60">NO. 0084-2026</span>
                      </div>

                      {/* Geometric Chip Blueprint */}
                      <div className="my-auto flex items-center gap-4">
                        <div className="w-12 h-10 border border-current/30 rounded p-1 flex flex-col justify-between bg-black/10">
                          <div className="w-full h-1 bg-current/20" />
                          <div className="w-1/2 h-1 bg-current/20" />
                          <div className="w-3/4 h-1 bg-current/20" />
                        </div>
                        <div className="text-[9px] font-mono-code space-y-0.5 opacity-70">
                          <div>STATUS: ACCREDITED SENIOR</div>
                          <div>DISCIPLINE: BRAND &amp; PACKAGING</div>
                          <div>COPYRIGHT: ALL RIGHTS RESERVED</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-current/20 text-[8px] font-mono-code opacity-50 flex justify-between">
                        <span>AUTHENTIC DESIGNER ARTIFACT</span>
                        <span>SWISS GRID STANDARDS</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-8 text-center text-[10px] font-mono-code text-white/50">
                Active Finish: <span className="text-white font-bold">{foilFinish.toUpperCase()}</span> • Substrate: <span className="text-white font-bold">{paperStock.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
