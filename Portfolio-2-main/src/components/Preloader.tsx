import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicText } from './DynamicText';

export interface PreloaderProps {
  variant?: 'stairs' | 'circle' | 'shutter';
  duration?: number;
  position?: 'fixed' | 'absolute';
  onComplete?: () => void;
  className?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  variant = 'stairs',
  duration = 2400,
  position = 'fixed',
  onComplete,
  className = '',
}) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const nbOfColumns = 5;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => onComplete?.()}>
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.7, duration: 0.3 } }}
          className={`${
            position === 'fixed' ? 'fixed inset-0' : 'absolute inset-0'
          } z-50 pointer-events-none flex items-center justify-center overflow-hidden ${className}`}
        >
          {/* Variant 1: Stairs (Staggered Column Wipe) */}
          {variant === 'stairs' && (
            <div className="absolute inset-0 flex w-full h-full">
              {[...Array(nbOfColumns)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative h-full flex-1 bg-[#FFB6C1] border-r border-black/5 last:border-none shadow-2xl"
                  initial={{ y: 0 }}
                  exit={{
                    y: '-100%',
                    transition: {
                      duration: 0.8,
                      delay: (nbOfColumns - 1 - i) * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }}
                />
              ))}
            </div>
          )}

          {/* Variant 2: Circle (Expanding Portal Iris Wipe) */}
          {variant === 'circle' && (
            <motion.div
              className="absolute inset-0 bg-[#FFB6C1]"
              initial={{ clipPath: 'circle(150% at 50% 50%)' }}
              exit={{
                clipPath: 'circle(0% at 50% 50%)',
                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
              }}
            />
          )}

          {/* Variant 3: Shutter (Split Screen Doors) */}
          {variant === 'shutter' && (
            <>
              <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#FFB6C1] border-b border-black/5"
                initial={{ y: 0 }}
                exit={{
                  y: '-100%',
                  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FFB6C1] border-t border-black/5"
                initial={{ y: 0 }}
                exit={{
                  y: '100%',
                  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                }}
              />
            </>
          )}

          {/* Dynamic Rapid Multi-language Greetings - Only Text in Website Default Font */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              y: -15,
              transition: { duration: 0.35, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <DynamicText intervalMs={250} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
