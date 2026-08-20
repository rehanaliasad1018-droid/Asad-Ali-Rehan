import React from 'react';

interface SoftwareIconProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

// 1. Official Adobe Photoshop Icon (Ps)
export const PhotoshopIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Adobe Photoshop"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="ps-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0a2a4a" />
            <stop offset="100%" stopColor="#00182c" />
          </radialGradient>
          <filter id="ps-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#31A8FF" floodOpacity="0.45" />
          </filter>
        </defs>
        
        {/* Squircle App Background */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill="url(#ps-bg)"
          stroke="#31A8FF"
          strokeWidth="2"
        />

        {/* Inner subtle specular line */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="8"
          stroke="#31A8FF"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* 'Ps' Vector Letterforms */}
        {/* P */}
        <path
          d="M13 14H21.5C24.5 14 26.8 15.8 26.8 19.2C26.8 22.6 24.5 24.4 21.5 24.4H17.2V34H13V14ZM17.2 21.1H21C22.6 21.1 23.3 20.3 23.3 19.2C23.3 18.1 22.6 17.3 21 17.3H17.2V21.1Z"
          fill="#31A8FF"
        />
        {/* s */}
        <path
          d="M28.4 30.2C29.2 31.1 30.6 31.7 32.2 31.7C33.8 31.7 34.6 31 34.6 30C34.6 27.2 27.8 28.1 27.8 23.5C27.8 20.8 30.2 19 33.7 19C35.5 19 36.9 19.5 37.8 20.3L36.4 22.8C35.6 22.2 34.7 21.8 33.6 21.8C32.3 21.8 31.6 22.4 31.6 23.2C31.6 25.8 38.4 25 38.4 29.5C38.4 32.3 35.8 34.4 32.1 34.4C29.8 34.4 28 33.7 27 32.5L28.4 30.2Z"
          fill="#31A8FF"
        />
      </svg>
    </div>
  );
};

// 2. Official Adobe Illustrator Icon (Ai)
export const IllustratorIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Adobe Illustrator"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="ai-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3d1d00" />
            <stop offset="100%" stopColor="#200d00" />
          </radialGradient>
        </defs>

        {/* Squircle App Background */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill="url(#ai-bg)"
          stroke="#FF9A00"
          strokeWidth="2"
        />

        {/* Inner subtle specular line */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="8"
          stroke="#FF9A00"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* 'Ai' Vector Letterforms */}
        {/* A */}
        <path
          d="M17.5 14H21.5L27 34H23.2L21.9 29.5H16.8L15.5 34H12L17.5 14ZM21.1 26.3L19.4 19.8L17.6 26.3H21.1Z"
          fill="#FF9A00"
        />
        {/* i */}
        <path
          d="M30 15.5C30 14.1 31.1 13 32.5 13C33.9 13 35 14.1 35 15.5C35 16.9 33.9 18 32.5 18C31.1 18 30 16.9 30 15.5ZM30.7 20H34.3V34H30.7V20Z"
          fill="#FF9A00"
        />
      </svg>
    </div>
  );
};

// 3. Official Adobe InDesign Icon (Id)
export const InDesignIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Adobe InDesign"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="id-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#450020" />
            <stop offset="100%" stopColor="#250012" />
          </radialGradient>
        </defs>

        {/* Squircle App Background */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill="url(#id-bg)"
          stroke="#FF3366"
          strokeWidth="2"
        />

        {/* Inner subtle line */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="8"
          stroke="#FF3366"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* 'Id' Vector Letterforms */}
        {/* I */}
        <path
          d="M13 14H17.2V34H13V14Z"
          fill="#FF3366"
        />
        {/* d */}
        <path
          d="M32 14H36.2V34H32.2V31.5C31.2 33.3 29.2 34.4 26.6 34.4C22.2 34.4 19 30.7 19 26.3C19 21.8 22.2 18.2 26.6 18.2C29.2 18.2 31.2 19.3 32 21.1V14ZM27.6 21.4C24.8 21.4 23 23.4 23 26.3C23 29.1 24.8 31.2 27.6 31.2C30.4 31.2 32.2 29.1 32.2 26.3C32.2 23.4 30.4 21.4 27.6 21.4Z"
          fill="#FF3366"
        />
      </svg>
    </div>
  );
};

// 4. Official Figma Icon (5 Geometric Shapes)
export const FigmaIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 bg-[#1e1e1e] p-1.5 border border-white/15 ${className}`}
      style={{ width: size, height: size }}
      title="Figma"
    >
      <svg
        viewBox="0 0 38 57"
        width={size * 0.75}
        height={size * 0.75}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Top left - Red */}
        <path
          d="M19 0H9.5C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19H19V0Z"
          fill="#F24E1E"
        />
        {/* Top right - Orange */}
        <path
          d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z"
          fill="#FF7262"
        />
        {/* Middle left - Violet */}
        <path
          d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z"
          fill="#A259FF"
        />
        {/* Middle right - Cyan/Blue */}
        <path
          d="M19 19H28.5C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5V19Z"
          fill="#1ABCFE"
        />
        {/* Bottom left - Green */}
        <path
          d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
          fill="#0ACF83"
        />
      </svg>
    </div>
  );
};

// 5. Official Adobe After Effects Icon (Ae)
export const AfterEffectsIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Adobe After Effects"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="ae-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1a0a38" />
            <stop offset="100%" stopColor="#0b001d" />
          </radialGradient>
        </defs>

        {/* Squircle App Background */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill="url(#ae-bg)"
          stroke="#9999FF"
          strokeWidth="2"
        />

        {/* Inner subtle line */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="8"
          stroke="#9999FF"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* 'Ae' Vector Letterforms */}
        {/* A */}
        <path
          d="M16 14H20L25.2 34H21.5L20.2 29.5H15.6L14.4 34H11L16 14ZM19.4 26.3L17.9 19.8L16.3 26.3H19.4Z"
          fill="#9999FF"
        />
        {/* e */}
        <path
          d="M30.4 19C34.3 19 36.8 21.8 36.8 26.2C36.8 26.8 36.7 27.5 36.6 27.9H29.1C29.3 30.3 30.9 31.7 33.1 31.7C34.5 31.7 35.7 31.1 36.4 30.2L38 32.1C36.8 33.6 35 34.4 32.8 34.4C28.7 34.4 25.5 31.4 25.5 26.6C25.5 21.8 28.5 19 30.4 19ZM33.2 25.3C33.2 23.3 32.1 21.8 30.4 21.8C28.9 21.8 27.8 23.2 27.6 25.3H33.2Z"
          fill="#9999FF"
        />
      </svg>
    </div>
  );
};

// 6. Official Adobe Premiere Pro Icon (Pr)
export const PremiereProIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Adobe Premiere Pro"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="pr-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2b003a" />
            <stop offset="100%" stopColor="#14001c" />
          </radialGradient>
        </defs>

        {/* Squircle App Background */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill="url(#pr-bg)"
          stroke="#EA77FF"
          strokeWidth="2"
        />

        {/* Inner subtle line */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="8"
          stroke="#EA77FF"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* 'Pr' Vector Letterforms */}
        {/* P */}
        <path
          d="M12.5 14H20.5C23.5 14 25.8 15.8 25.8 19.2C25.8 22.6 23.5 24.4 20.5 24.4H16.5V34H12.5V14ZM16.5 21.1H20C21.6 21.1 22.3 20.3 22.3 19.2C22.3 18.1 21.6 17.3 20 17.3H16.5V21.1Z"
          fill="#EA77FF"
        />
        {/* r */}
        <path
          d="M27.5 20H31V23.1C32.1 20.9 34 19.7 36.2 19.7C37 19.7 37.6 19.9 38.1 20.2L36.9 23.6C36.4 23.4 35.8 23.3 35.2 23.3C33 23.3 31.5 24.9 31.5 27.6V34H27.5V20Z"
          fill="#EA77FF"
        />
      </svg>
    </div>
  );
};

// 7. Blender / 3D Icon
export const BlenderIcon: React.FC<SoftwareIconProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-lg select-none transition-transform group-hover:scale-105 bg-[#141414] p-1 border border-white/15 ${className}`}
      style={{ width: size, height: size }}
      title="Blender 3D"
    >
      <svg
        viewBox="0 0 48 48"
        width={size * 0.8}
        height={size * 0.8}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.5 8L16.2 18.8C16.8 19.4 17.3 20 17.7 20.8L28.8 14.5L21.5 8Z"
          fill="#EA7600"
        />
        <path
          d="M32.5 17.2L20.8 23.2C21 23.8 21.1 24.4 21.1 25.1C21.1 25.5 21 25.9 21 26.2L36.8 27.8C37 26.9 37.1 26 37.1 25.1C37.1 21.9 35.3 19.2 32.5 17.2Z"
          fill="#EA7600"
        />
        <path
          d="M24 25C24 20.6 20.4 17 16 17C11.6 17 8 20.6 8 25C8 29.4 11.6 33 16 33C20.4 33 24 29.4 24 25Z"
          fill="#EA7600"
        />
        <circle cx="16" cy="25" r="4.5" fill="#225796" />
        <circle cx="16" cy="25" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

// Master dynamic lookup component
export const ToolBrandIcon: React.FC<{
  toolName: string;
  size?: number;
  className?: string;
}> = ({ toolName, size = 36, className = '' }) => {
  const name = toolName.toLowerCase();

  if (name.includes('photoshop')) {
    return <PhotoshopIcon size={size} className={className} />;
  }
  if (name.includes('illustrator')) {
    return <IllustratorIcon size={size} className={className} />;
  }
  if (name.includes('indesign')) {
    return <InDesignIcon size={size} className={className} />;
  }
  if (name.includes('figma')) {
    return <FigmaIcon size={size} className={className} />;
  }
  if (name.includes('after effect')) {
    return <AfterEffectsIcon size={size} className={className} />;
  }
  if (name.includes('premiere')) {
    return <PremiereProIcon size={size} className={className} />;
  }
  if (name.includes('blender') || name.includes('3d')) {
    return <BlenderIcon size={size} className={className} />;
  }

  return (
    <div
      className={`w-9 h-9 border border-white/20 bg-white/5 rounded-md flex items-center justify-center font-display font-bold text-xs text-white ${className}`}
      style={{ width: size, height: size }}
    >
      CC
    </div>
  );
};
