"use client";

/**
 * @author: @dorianbaffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
  */

import React, { useEffect, useState } from "react";  
import { AnimatePresence, motion } from "framer-motion";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "こんにちは", language: "Japanese" },
];

export interface DynamicTextProps {
  onComplete?: () => void;
  intervalMs?: number;
  className?: string;
}

export const DynamicText: React.FC<DynamicTextProps> = ({
  onComplete,
  intervalMs = 250,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          if (onComplete) onComplete();
          return prevIndex;
        }

        return nextIndex;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAnimating, intervalMs, onComplete]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -35, opacity: 0 },
  };

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className={`flex items-center justify-center p-4 select-none ${className}`}
    >
      <div className="relative flex h-16 min-w-[260px] items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.h1
              animate={textVariants.visible}
              aria-live="off"
              className="absolute text-center font-normal text-2xl sm:text-3xl md:text-4xl text-zinc-950 tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
              exit={textVariants.exit}
              initial={textVariants.hidden}
              key={currentIndex}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {greetings[currentIndex].text}
            </motion.h1>
          </AnimatePresence>
        ) : (
          <h1
            className="text-center font-normal text-2xl sm:text-3xl md:text-4xl text-zinc-950 tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]"
            style={{ fontFamily: "'Josefin Sans', system-ui, sans-serif" }}
          >
            {greetings[currentIndex].text}
          </h1>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
