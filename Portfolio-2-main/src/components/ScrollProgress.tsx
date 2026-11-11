import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-white via-[#FFE4EC] to-[#FFB6C1] origin-left z-[999] pointer-events-none shadow-[0_0_12px_rgba(255,182,193,0.7)]"
    />
  );
};

export default ScrollProgress;
