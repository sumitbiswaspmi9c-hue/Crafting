// SVG data URI presets for particle visualization

export const PARTICLE_PRESETS = [
  {
    id: 'cyber-orb',
    name: 'Quantum Core',
    description: 'Bioluminescent quantum energy node',
    color: 'source' as const,
    generateSvg: () => {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%2338bdf8" />
            <stop offset="50%" stop-color="%23818cf8" />
            <stop offset="100%" stop-color="%23c084fc" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="%23f43f5e" />
            <stop offset="100%" stop-color="%23fb923c" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="130" fill="url(%23grad1)" fill-opacity="0.9" />
        <circle cx="200" cy="200" r="85" fill="%23050711" />
        <circle cx="200" cy="200" r="45" fill="url(%23grad2)" />
        <path d="M 120,200 Q 200,80 280,200 Q 200,320 120,200 Z" fill="none" stroke="%23ffffff" stroke-width="10" stroke-opacity="0.8" />
        <circle cx="200" cy="90" r="14" fill="%2338bdf8" />
        <circle cx="200" cy="310" r="14" fill="%23f43f5e" />
        <circle cx="90" cy="200" r="14" fill="%23c084fc" />
        <circle cx="310" cy="200" r="14" fill="%23fb923c" />
      </svg>`;
    }
  },
  {
    id: 'abstract-monogram',
    name: 'Nexus Glyph',
    description: 'High-tech parametric cyber icon',
    color: 'rainbow' as const,
    generateSvg: () => {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <linearGradient id="gradP" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="%2306b6d4" />
            <stop offset="100%" stop-color="%233b82f6" />
          </linearGradient>
        </defs>
        <polygon points="200,40 340,120 340,280 200,360 60,280 60,120" fill="none" stroke="url(%23gradP)" stroke-width="24" stroke-linejoin="round" />
        <polygon points="200,100 290,150 290,250 200,300 110,250 110,150" fill="url(%23gradP)" />
        <circle cx="200" cy="200" r="30" fill="%23ffffff" />
      </svg>`;
    }
  },
  {
    id: 'cyber-saturn',
    name: 'Celestial Orbit',
    description: 'Planetary ring particle physics',
    color: 'cyber' as const,
    generateSvg: () => {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <linearGradient id="satGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="%23ec4899" />
            <stop offset="100%" stop-color="%238b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="95" fill="url(%23satGrad)" />
        <!-- Rings -->
        <ellipse cx="200" cy="200" rx="170" ry="45" fill="none" stroke="%2338bdf8" stroke-width="18" transform="rotate(-25 200 200)" />
        <ellipse cx="200" cy="200" rx="140" ry="30" fill="none" stroke="%23f472b6" stroke-width="10" stroke-dasharray="10,6" transform="rotate(-25 200 200)" />
        <circle cx="200" cy="200" r="30" fill="%23ffffff" fill-opacity="0.9" />
      </svg>`;
    }
  }
];
