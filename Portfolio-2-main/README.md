# ✨ Portfolio — Jishnu Mondal

A modern, high-performance, and immersive personal developer portfolio crafted with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a custom high-performance **32-Bit HTML5 Canvas Particle Engine**.

---

## 🚀 Key Features

- **⚡ 32,000+ Particle Portrait Engine**:
  - Direct 32-bit packed RGBA pixel buffer manipulation (`Uint32Array`) for 60/120fps fluid particle physics.
  - Interactive mouse gravity & dispersion physics with natural return easing and harmonic micro-breathing.
  - Viewport scroll culling and zero-allocation frame loops to prevent garbage collection hiccups.
- **🎨 Cinematic Hero Entrance**:
  - Smooth left-to-right sweep on desktop with one-shot metallic text shine across the *"Crafting"* typography.
  - Adaptive non-hover / touch detection (`@media (hover: none)`) that switches to an instant, subtle breathing state on mobile devices.
- **📱 Fully Responsive Across All Devices**:
  - Tailored typography and adaptive container scaling from 320px mobile screens to 4K ultra-wide monitors.
  - Mobile-optimized Tools section with dynamic vertical stacked cards and zero horizontal overflow.
- **🪄 Glassmorphism & UI Aesthetics**:
  - Staggered navigation menu with backdrop blur, smooth entrance transitions, and custom social link integrations.
  - Interactive Project cards with category filters, live links, and dynamic hover reveals.
  - Multi-language interactive preloader with seamless curtain reveal animations.
- **📬 Interactive Contact Section**:
  - Direct email messaging integration and interactive social links (GitHub, LinkedIn, Instagram).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern declarative UI component architecture |
| **TypeScript** | Strict type safety and robust code structure |
| **Vite** | Blazing-fast HMR and optimized production bundling |
| **Tailwind CSS v4** | Modern utility-first CSS and styling engine |
| **Framer Motion** | Physics-based animations, layout transitions, and choreography |
| **HTML5 Canvas 2D** | High-performance particle rendering with 32-bit pixel buffers |
| **Lucide Icons** | Clean, minimalist SVG iconography |

---

## 📂 Project Structure

```text
portfoli3/
├── public/
│   ├── fonts/               # Custom Cabinet Grotesk & Soiren web fonts
│   ├── portfolio/           # Project screenshots and preview assets
│   ├── hero-subject.png     # Clean portrait asset for particle generation
│   └── about-bg.png         # Aesthetic artistic backdrop
├── src/
│   ├── assets/              # Static assets and animation presets
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives (buttons, inputs, cards)
│   │   ├── AboutSection.tsx # Vision, bio & responsive Tools branching stack
│   │   ├── ContactSection.tsx # Contact form with email messaging
│   │   ├── Footer.tsx       # Bottom footer with social links & copyright
│   │   ├── MusicMarquee.tsx # Real-time listening marquee
│   │   ├── PageTransition.tsx # Smooth section & page transition wrapper
│   │   ├── ParticleImage.tsx # High-performance 32k particle canvas engine
│   │   ├── Preloader.tsx    # Multi-language animated preloader
│   │   ├── ProjectsSection.tsx # Interactive project showcase & filters
│   │   ├── SplitText.tsx    # Text staggering & split text animations
│   │   └── StaggeredMenu.tsx# Glassmorphism navigation & social links
│   ├── App.tsx              # Root application component & layout
│   ├── index.css            # Custom CSS animations, tokens & font imports
│   └── main.tsx             # Application entry point
├── index.html               # HTML document root with meta tags & SEO
├── package.json             # Dependencies and build scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration with Tailwind & path aliases
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jishnu09-siuu/Portfolio-2.git
   cd Portfolio-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Production Build

To compile and bundle the project for production:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## 👤 Author

- **Jishnu Mondal**
- **GitHub**: [@Jishnu09-siuu](https://github.com/Jishnu09-siuu)
- **LinkedIn**: [jishnu-mondal](https://www.linkedin.com/in/jishnu-mondal/)
- **Instagram**: [@jishnumondal__](https://www.instagram.com/jishnumondal__/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
