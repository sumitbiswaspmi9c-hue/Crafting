import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay per character/unit in milliseconds (default: 40)
  duration?: number; // duration in seconds (default: 0.6)
  ease?: any; // easing function or string (default: [0.22, 1, 0.36, 1])
  splitType?: 'chars' | 'words';
  animationFrom?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    filter?: string;
    scale?: number;
    rotate?: number;
  };
  animationTo?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    filter?: string;
    scale?: number;
    rotate?: number;
  };
  from?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    filter?: string;
    scale?: number;
    rotate?: number;
  };
  to?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    filter?: string;
    scale?: number;
    rotate?: number;
  };
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties['textAlign'];
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 35,
  duration = 0.55,
  ease = [0.22, 1, 0.36, 1],
  splitType = 'chars',
  animationFrom,
  animationTo,
  from,
  to,
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign,
  style,
  tag = 'h2',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: threshold,
    margin: rootMargin as any,
  });

  const initialProps = animationFrom || from || { opacity: 0, y: 40 };
  const targetProps = animationTo || to || { opacity: 1, y: 0 };

  const words = text.split(' ');
  let charIndexCounter = 0;

  const Tag = motion[tag] || motion.h2;

  return (
    <Tag
      ref={ref}
      className={`inline-block select-none ${className}`}
      style={{
        ...style,
        textAlign,
        wordWrap: 'break-word',
      }}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIdx) => {
          const isLastWord = wordIdx === words.length - 1;

          if (splitType === 'words') {
            const currentDelay = (wordIdx * delay) / 1000;
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden py-1">
                <motion.span
                  className="inline-block"
                  initial={initialProps}
                  animate={isInView ? targetProps : initialProps}
                  transition={{
                    duration,
                    delay: currentDelay,
                    ease,
                  }}
                  onAnimationComplete={
                    isLastWord ? () => onLetterAnimationComplete?.() : undefined
                  }
                >
                  {word}
                </motion.span>
                {!isLastWord && <span className="inline-block">&nbsp;</span>}
              </span>
            );
          }

          // splitType === 'chars'
          const chars = Array.from(word);
          return (
            <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden py-1">
              {chars.map((char, charIdx) => {
                const currentIndex = charIndexCounter++;
                const isFinalChar = isLastWord && charIdx === chars.length - 1;
                const charDelay = (currentIndex * delay) / 1000;

                return (
                  <motion.span
                    key={charIdx}
                    className="inline-block transform-gpu will-change-transform"
                    initial={initialProps}
                    animate={isInView ? targetProps : initialProps}
                    transition={{
                      duration,
                      delay: charDelay,
                      ease,
                    }}
                    onAnimationComplete={
                      isFinalChar ? () => onLetterAnimationComplete?.() : undefined
                    }
                  >
                    {char}
                  </motion.span>
                );
              })}
              {!isLastWord && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </Tag>
  );
};

export default SplitText;
