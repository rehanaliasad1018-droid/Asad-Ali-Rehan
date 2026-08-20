import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/CustomizerContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant, accentTheme } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setIsTouch(checkTouch());

    if (checkTouch()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isTextCursor = cursorVariant === 'view' || cursorVariant === 'project' || cursorVariant === 'drag' || cursorVariant === 'copy' || cursorText.length > 0;

  return (
    <>
      {/* Precision Point Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isTextCursor ? 0 : 1,
          scale: cursorVariant === 'pointer' ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.1,
        }}
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
        }}
      />

      {/* Trailing Outer Ring / Capsule */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full font-mono text-[10px] font-bold tracking-widest uppercase shadow-2xl transition-colors duration-200 backdrop-blur-[2px]"
        animate={{
          x: mousePosition.x - (isTextCursor ? 42 : 18),
          y: mousePosition.y - (isTextCursor ? 42 : 18),
          width: isTextCursor ? 84 : cursorVariant === 'pointer' ? 44 : 36,
          height: isTextCursor ? 84 : cursorVariant === 'pointer' ? 44 : 36,
          backgroundColor: isTextCursor ? accentTheme.hex : 'rgba(255, 255, 255, 0.06)',
          borderColor: isTextCursor ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
          color: isTextCursor ? '#000000' : '#ffffff',
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.35,
        }}
        style={{
          borderWidth: 1,
        }}
      >
        {isTextCursor && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-center font-bold tracking-wider leading-none"
          >
            {cursorText || (cursorVariant === 'project' ? 'VIEW' : cursorVariant === 'drag' ? 'DRAG' : cursorVariant === 'copy' ? 'COPY' : 'EXPLORE')}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
