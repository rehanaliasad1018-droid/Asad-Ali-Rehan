import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/CustomizerContext';

export const Toast: React.FC = () => {
  const { copyToastMessage, accentTheme } = usePortfolio();

  return (
    <AnimatePresence>
      {copyToastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 px-5 py-3 bg-[#141414] border border-white/20 text-white text-[11px] font-mono-code tracking-wider shadow-2xl backdrop-blur-md"
        >
          <div
            className="w-4 h-4 flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: accentTheme.hex }}
          >
            <Check size={11} strokeWidth={3} />
          </div>
          <span>{copyToastMessage}</span>
          <Sparkles size={12} className="text-white/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
