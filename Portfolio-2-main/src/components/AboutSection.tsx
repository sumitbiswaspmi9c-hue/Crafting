import React, { useState, useEffect, useRef } from 'react';
import SplitText from './SplitText';

export const AboutSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            setIsOpen(true);
          }, 250);
        } else {
          clearTimeout(timer);
          setIsOpen(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-28 sm:py-36 bg-black text-white z-10">
      <style>{`
        .about-staggered-wrapper {
          position: relative;
          width: 100%;
          max-width: 660px;
          min-height: 600px;
          font-family: 'Cabinet Grotesk', 'CabinetGrotesk-Variable', system-ui, -apple-system, sans-serif;
        }

        .about-staggered-wrapper .trigger-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 30;
          pointer-events: auto;
        }

        .about-staggered-wrapper .merge-btn {
          background: rgba(18, 22, 34, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 14px 44px;
          border-radius: 9999px;
          cursor: pointer;
          font-size: 1.08rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .about-staggered-wrapper .merge-btn:hover {
          background: rgba(28, 35, 52, 0.85);
          border-color: rgba(255, 255, 255, 0.35);
          color: #ffffff;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .about-staggered-wrapper .branch-svg-canvas {
          position: absolute;
          inset: 0;
          width: 660px;
          height: 600px;
          z-index: 10;
          pointer-events: none;
          overflow: visible;
        }

        .about-staggered-wrapper .branch-line {
          fill: none;
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2.25px;
          stroke-linecap: round;
          stroke-linejoin: round;
          display: block;
          transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-staggered-wrapper .line-box1 {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
        }

        .about-staggered-wrapper .line-box2 {
          stroke-dasharray: 340;
          stroke-dashoffset: 340;
        }

        .about-staggered-wrapper .line-box3 {
          stroke-dasharray: 550;
          stroke-dashoffset: 550;
        }

        .about-staggered-wrapper .branch-dot {
          fill: #ffffff;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .about-staggered-wrapper .dot-box1 { transition-delay: 0.35s; }
        .about-staggered-wrapper .dot-box2 { transition-delay: 0.45s; }
        .about-staggered-wrapper .dot-box3 { transition-delay: 0.55s; }

        .about-staggered-wrapper .tooltip-content {
          position: absolute;
          background: linear-gradient(135deg, rgba(255, 182, 193, 0.18) 0%, rgba(244, 114, 182, 0.09) 45%, rgba(18, 14, 26, 0.82) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: none;
          padding: 18px 24px;
          border-radius: 22px;
          color: #f1f5f9;
          font-size: 0.925rem;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7), 0 0 32px rgba(255, 182, 193, 0.14);
          z-index: 20;
          opacity: 0;
          pointer-events: none;
        }

        .about-staggered-wrapper .box-1 {
          top: 76px;
          left: 210px;
          width: 380px;
          transform: translate(-14px, -10px) scale(0.95);
          clip-path: inset(0 100% 0 0);
          transition:
            opacity 0.35s ease 0.12s,
            transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.12s,
            clip-path 0.4s ease 0.12s,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .about-staggered-wrapper .box-2 {
          top: 245px;
          left: 15px;
          width: 385px;
          transform: translate(-14px, -10px) scale(0.95);
          clip-path: inset(0 100% 0 0);
          transition:
            opacity 0.35s ease 0.22s,
            transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.22s,
            clip-path 0.4s ease 0.22s,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .about-staggered-wrapper .box-3 {
          top: 415px;
          left: 240px;
          width: 385px;
          transform: translate(-14px, -10px) scale(0.95);
          clip-path: inset(0 100% 0 0);
          transition:
            opacity 0.35s ease 0.32s,
            transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.32s,
            clip-path 0.4s ease 0.32s,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .about-staggered-wrapper .tooltip-content:hover {
          background: linear-gradient(135deg, rgba(255, 182, 193, 0.26) 0%, rgba(244, 114, 182, 0.15) 45%, rgba(24, 17, 34, 0.88) 100%);
          border: none;
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 182, 193, 0.22);
        }

        .about-staggered-wrapper .tooltip-header {
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 1.08rem;
          color: #ffffff;
        }

        .about-staggered-wrapper .tooltip-info {
          color: #cbd5e1;
          font-size: 0.88rem;
          line-height: 1.6;
          white-space: normal;
        }

        .about-staggered-wrapper:hover .branch-line,
        .about-staggered-wrapper.is-open .branch-line {
          stroke-dashoffset: 0;
        }

        .about-staggered-wrapper:hover .branch-dot,
        .about-staggered-wrapper.is-open .branch-dot {
          opacity: 1;
        }

        .about-staggered-wrapper:hover .tooltip-content,
        .about-staggered-wrapper.is-open .tooltip-content {
          opacity: 1;
          transform: translate(0, 0) scale(1);
          clip-path: inset(0 0 0 0);
          pointer-events: auto;
        }

        @media (max-width: 768px) {
          .about-staggered-wrapper {
            position: relative;
            min-height: auto;
            width: 100%;
            max-width: 100%;
          }

          .about-staggered-wrapper .trigger-wrapper {
            position: relative;
            margin-bottom: 20px;
          }

          .about-staggered-wrapper .branch-svg-canvas {
            display: none !important;
          }

          .about-staggered-wrapper .tooltip-content {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 14px;
            padding: 16px 20px;
            border-radius: 18px;
            transform: translateY(14px) scale(0.98);
            clip-path: none !important;
            opacity: 0;
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .about-staggered-wrapper.is-open .tooltip-content,
          .about-staggered-wrapper:hover .tooltip-content {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            pointer-events: auto !important;
          }

          .about-staggered-wrapper .box-1 {
            transition-delay: 0.05s !important;
          }
          .about-staggered-wrapper .box-2 {
            transition-delay: 0.12s !important;
          }
          .about-staggered-wrapper .box-3 {
            transition-delay: 0.19s !important;
          }
        }
      `}</style>

      {/* Background Hands Artwork */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/about-bg.png"
          alt="Creation of Adam Hands Background"
          className="w-full h-full object-cover object-center opacity-55 sm:opacity-65 brightness-85 select-none pointer-events-none transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/45 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 z-10">

        {/* Top Main Heading */}
        <div className="mb-14 sm:mb-20 flex flex-col items-start" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          <SplitText
            text="I TURN VISION INTO"
            tag="h2"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] uppercase text-neutral-400"
            delay={25} duration={0.6}
            animationFrom={{ opacity: 0, y: 45 }}
            animationTo={{ opacity: 1, y: 0 }}
          />
          <SplitText
            text="DIGITAL REALITY."
            tag="h2"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] uppercase text-[#EAE6E1]"
            delay={25} duration={0.6}
            animationFrom={{ opacity: 0, y: 45 }}
            animationTo={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* 2-Column Content Grid: Upper Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* Left Column: Bio */}
          <div
            className="lg:col-span-6 space-y-6 text-slate-200 text-lg sm:text-xl lg:text-2xl leading-relaxed font-normal"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <p>
              I'm a 21-year-old web developer and a student at Jadavpur University, passionate about building modern, high-performance websites and immersive digital experiences. I combine creative thinking, clean design, and modern technologies to transform ideas into meaningful digital products. Constantly learning, experimenting, and pushing boundaries, I strive to create digital experiences that make an impact.
            </p>
            <p>
              Beyond client projects, I actively explore emerging technologies, refine my development expertise, and experiment with innovative ideas. I believe in continuous learning and thoughtful experimentation, constantly seeking opportunities to collaborate, tackle complex challenges, and create impactful digital solutions.
            </p>
          </div>

          {/* Right Column: Upper Aligned Tools Button & Staggered Branching Boxes */}
          <div className="lg:col-span-6 flex justify-start items-start pt-1 w-full">
            <div className={`about-staggered-wrapper ${isOpen ? 'is-open' : ''}`}>
              
              {/* Upper Tools Button */}
              <div className="trigger-wrapper">
                <button
                  className="merge-btn"
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                >
                  Tools
                </button>
              </div>

              {/* Node Branches from Tools button to the 3 staggered locations */}
              <svg className="branch-svg-canvas" viewBox="0 0 660 600">
                {/* Branch 1: to Box 1 */}
                <path
                  className="branch-line line-box1"
                  d="M62,48 C62,70 150,70 210,76"
                />
                <circle cx={210} cy={76} r={4} className="branch-dot dot-box1" />

                {/* Branch 2: to Box 2 */}
                <path
                  className="branch-line line-box2"
                  d="M62,48 C62,150 15,170 15,245"
                />
                <circle cx={15} cy={245} r={4} className="branch-dot dot-box2" />

                {/* Branch 3: to Box 3 */}
                <path
                  className="branch-line line-box3"
                  d="M62,48 C62,220 240,300 240,415"
                />
                <circle cx={240} cy={415} r={4} className="branch-dot dot-box3" />
              </svg>

              {/* Box 1: Frontend Tools */}
              <div className="tooltip-content box-1">
                <div className="tooltip-header">
                  <svg width={18} height={18} viewBox="0 0 16 16" fill="none" stroke="#ffffff" strokeWidth="1.8">
                    <rect x="2" y="2" width="12" height="12" rx="2" />
                    <path d="M2 6h12" />
                    <path d="M6 6v8" />
                  </svg>
                  <span>Frontend Tools</span>
                </div>
                <div className="tooltip-info">
                  JavaScript (ES6+), React, Next.js, TypeScript, Prismic CMS, Redux, Redux Toolkit, React Testing Library, Vitest, HTML5, Git/GitHub, NextAuth, Formik.
                </div>
              </div>

              {/* Box 2: Backend Tools */}
              <div className="tooltip-content box-2">
                <div className="tooltip-header">
                  <svg width={18} height={18} viewBox="0 0 16 16" fill="none" stroke="#ffffff" strokeWidth="1.8">
                    <rect x="2" y="2" width="12" height="5" rx="1.5" />
                    <rect x="2" y="9" width="12" height="5" rx="1.5" />
                    <circle cx="5" cy="4.5" r="0.8" fill="#ffffff" />
                    <circle cx="5" cy="11.5" r="0.8" fill="#ffffff" />
                  </svg>
                  <span>Backend Tools</span>
                </div>
                <div className="tooltip-info">
                  Node.js, Express.js, Supabase, Firebase, Prisma ORM, PlanetScale, REST APIs, PostgreSQL, MongoDB, Stripe Integration.
                </div>
              </div>

              {/* Box 3: UI Libraries */}
              <div className="tooltip-content box-3">
                <div className="tooltip-header">
                  <svg width={18} height={18} viewBox="0 0 16 16" fill="none" stroke="#ffffff" strokeWidth="1.8">
                    <path d="M8 2a6 6 0 1 0 6 6c0-1.5-1-2-2-2h-1a2 2 0 0 1-2-2V3a1 1 0 0 0-1-1Z" />
                  </svg>
                  <span>UI Libraries</span>
                </div>
                <div className="tooltip-info">
                  CSS3/SCSS/SASS, Tailwind CSS, Material UI, Framer Motion, GSAP, Bootstrap, Chart.js.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
