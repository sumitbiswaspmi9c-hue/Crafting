import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface ParticleImageProps {
  src: string;
  maxParticles?: number;
  particleSize?: number;
  mouseRadius?: number;
  repelForce?: number;
  returnSpeed?: number;
  damping?: number;
  offsetX?: number;
  scaleRatio?: number;
  brightness?: number;
  className?: string;
  interactive?: boolean;
  isLoaded?: boolean;
  canHover?: boolean;
  onLoaded?: () => void;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  color32: number;
}

export const ParticleImage: React.FC<ParticleImageProps> = ({
  src,
  maxParticles = 32000,
  particleSize = 2,
  mouseRadius = 95,
  repelForce = 26,
  returnSpeed = 0.048,
  damping = 0.942,
  offsetX = 90,
  scaleRatio = 0.84,
  brightness = 0.94,
  className = '',
  interactive = true,
  isLoaded = true,
  canHover = true,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    isHovered: boolean;
    isDown: boolean;
  }>({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    isHovered: false,
    isDown: false,
  });

  const initParticles = useCallback(
    (imageSrc: string, w: number, h: number) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageSrc;

      img.onload = () => {
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
        if (!offCtx) return;

        offCanvas.width = w;
        offCanvas.height = h;

        const responsiveScaleRatio = w < 640 ? 0.92 : w < 1024 ? 0.88 : scaleRatio;
        const scale = Math.min((w * responsiveScaleRatio) / img.width, (h * responsiveScaleRatio) / img.height);
        const iw = img.width * scale;
        const ih = img.height * scale;
        const responsiveOffset = w > 1024 ? offsetX : w > 640 ? offsetX * 0.45 : offsetX * 0.12;
        const ix = (w - iw) / 2 + responsiveOffset;
        const iy = (h - ih) / 2;

        offCtx.clearRect(0, 0, w, h);
        offCtx.drawImage(img, ix, iy, iw, ih);

        const imgData = offCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        let validPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const isBackground = r < 45 && g < 45 && b < 45;
          if (a > 15 && !isBackground) {
            validPixels++;
          }
        }

        const step = Math.max(1, Math.floor(Math.sqrt(validPixels / maxParticles)));
        const newParticles: Particle[] = [];

        // 32-bit RGBA packing with brightness & visibility boost
        const isLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;

        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            const index = (y * w + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];

            const isBackground = r < 45 && g < 45 && b < 45;

            if (a > 15 && !isBackground) {
              // Scaled color brightness for subtle atmospheric particle rendering
              const br = Math.min(255, Math.floor(r * brightness));
              const bg = Math.min(255, Math.floor(g * brightness));
              const bb = Math.min(255, Math.floor(b * brightness));
              const alphaClamped = 255;

              const color32 = isLittleEndian
                ? (alphaClamped << 24) | (bb << 16) | (bg << 8) | br
                : (br << 24) | (bg << 16) | (bb << 8) | alphaClamped;

              newParticles.push({
                x,
                y,
                originX: x,
                originY: y,
                vx: 0,
                vy: 0,
                color32,
              });
            }
          }
        }

        particlesRef.current = newParticles;
        if (onLoaded) onLoaded();
      };
    },
    [maxParticles, onLoaded, offsetX, scaleRatio, brightness]
  );

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimensionsRef.current = { width: w, height: h };

      if (canvasRef.current) {
        canvasRef.current.width = w;
        canvasRef.current.height = h;
      }
      if (w >= 768) {
        initParticles(src, w, h);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [src, initParticles]);

  // Ultra-Fast 60FPS Direct Framebuffer Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let lastTime = performance.now();
    const maxSpeed = 7.5;

    let cachedW = 0;
    let cachedH = 0;
    let imgData: ImageData | null = null;
    let data32: Uint32Array | null = null;

    const render = (currentTime: number) => {
      const deltaMs = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;
      const dt = deltaMs / 16.667;

      const { width: w, height: h } = dimensionsRef.current;
      if (w <= 0 || h <= 0) return;

      // On mobile screens (< 768px) or when scrolled past hero, skip 32k particle physics
      if (typeof window !== 'undefined' && (w < 768 || window.scrollY > h * 1.05)) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Reuse framebuffer to eliminate GC pauses
      if (!imgData || cachedW !== w || cachedH !== h) {
        cachedW = w;
        cachedH = h;
        imgData = ctx.createImageData(w, h);
        data32 = new Uint32Array(imgData.data.buffer);
      }

      if (!data32) return;

      // Transparent framebuffer so text and background layers behind particles remain visible
      data32.fill(0);

      const mouse = mouseRef.current;
      const mouseLerpFactor = 1 - Math.pow(1 - 0.32, dt);
      mouse.x += (mouse.targetX - mouse.x) * mouseLerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * mouseLerpFactor;

      const particles = particlesRef.current;
      const len = particles.length;

      const radius = mouse.isDown ? mouseRadius * 1.35 : mouseRadius;
      const radiusSq = radius * radius;
      const forcePower = mouse.isDown ? repelForce * 1.7 : repelForce;

      const effectiveDamping = Math.pow(damping, dt);
      const draw2x2 = particleSize >= 1.5;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Return force towards origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;

        p.vx += dxOrigin * returnSpeed * dt;
        p.vy += dyOrigin * returnSpeed * dt;

        // Subtle organic shimmering particle movement
        const t = currentTime * 0.0025;
        p.vy += Math.sin(p.originX * 0.01 + p.originY * 0.015 + t) * 0.16 * dt;
        p.vx += Math.cos(p.originY * 0.01 + t) * 0.11 * dt;

        // Hover physics with fast bounding-box cull
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;

        if (
          interactive &&
          mouse.isHovered &&
          Math.abs(dxMouse) < radius &&
          Math.abs(dyMouse) < radius
        ) {
          const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const normalized = dist / radius;
            const smoothFactor = 0.5 * (1 + Math.cos(Math.PI * normalized));
            const force = smoothFactor * forcePower * dt;
            const angle = Math.atan2(dyMouse, dxMouse);

            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;

            const tangentAngle = angle + Math.PI / 2;
            const gentleSwirl = smoothFactor * (forcePower * 0.22) * dt;
            p.vx += Math.cos(tangentAngle) * gentleSwirl;
            p.vy += Math.sin(tangentAngle) * gentleSwirl;
          }
        }

        // Clamp speed
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > maxSpeed * maxSpeed) {
          const scale = maxSpeed / Math.sqrt(speedSq);
          p.vx *= scale;
          p.vy *= scale;
        }

        p.vx *= effectiveDamping;
        p.vy *= effectiveDamping;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // High visibility direct pixel write
        const px = Math.floor(p.x);
        const py = Math.floor(p.y);

        if (px >= 0 && px < w && py >= 0 && py < h) {
          const baseIdx = py * w + px;
          data32[baseIdx] = p.color32;

          // 2x2 solid pixel cluster for sharp, high visibility
          if (draw2x2) {
            if (px + 1 < w) data32[baseIdx + 1] = p.color32;
            if (py + 1 < h) {
              data32[baseIdx + w] = p.color32;
              if (px + 1 < w) data32[baseIdx + w + 1] = p.color32;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mouseRadius, repelForce, returnSpeed, damping, interactive, particleSize]);

  // Pointer & touch handlers with bounding box offset
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseRef.current.targetX = clientX;
      mouseRef.current.targetY = clientY;
      if (mouseRef.current.x === -9999) {
        mouseRef.current.x = clientX;
        mouseRef.current.y = clientY;
      }
      mouseRef.current.isHovered =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    const onMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovered = false;
      mouseRef.current.targetX = -9999;
      mouseRef.current.targetY = -9999;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches[0].clientX - rect.left;
      const clientY = e.touches[0].clientY - rect.top;

      mouseRef.current.targetX = clientX;
      mouseRef.current.targetY = clientY;
      if (mouseRef.current.x === -9999) {
        mouseRef.current.x = clientX;
        mouseRef.current.y = clientY;
      }
      mouseRef.current.isHovered = true;
    };

    const onTouchEnd = () => {
      mouseRef.current.isHovered = false;
      mouseRef.current.isDown = false;
      mouseRef.current.targetX = -9999;
      mouseRef.current.targetY = -9999;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onMouseDown);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <motion.div
      initial={canHover ? { x: '-95vw', opacity: 0 } : { x: 0, opacity: 0 }}
      animate={isLoaded ? { x: 0, opacity: 1 } : (canHover ? { x: '-95vw', opacity: 0 } : { x: 0, opacity: 0 })}
      transition={
        canHover
          ? { duration: 2.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
          : { duration: 0.9, ease: 'easeOut', delay: 0.05 }
      }
      className={`relative w-full h-full min-h-screen overflow-hidden select-none bg-transparent z-10 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-default relative z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Smooth bottom merge overlay into background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-black via-black/65 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default ParticleImage;
