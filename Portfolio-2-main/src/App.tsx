import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Preloader } from './components/Preloader';
import { StaggeredMenu } from './components/StaggeredMenu';
import { ParticleImage } from './components/ParticleImage';
import { AboutSection } from './components/AboutSection';
import { MusicMarquee } from './components/MusicMarquee';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to hero section', link: '#hero' },
  { label: 'About', ariaLabel: 'About Syed Moinuddin and Tech Arsenal', link: '#about' },
  { label: 'Projects', ariaLabel: 'View selected projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/itz__sxmit?mdxt=Y3hzYm44cTZsNWIy',
  },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/sumit-biswas-b577a9298?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { label: 'GitHub', link: 'https://github.com/sumitbiswaspmi9c-hue' },
];

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const checkHover = () => {
      const match = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(match.matches);
    };
    checkHover();
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    mediaQuery.addEventListener('change', checkHover);
    return () => mediaQuery.removeEventListener('change', checkHover);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. React Bits Pro Preloader Screen with Multi-language Dynamic Greeting */}
      <Preloader
        variant="stairs"
        duration={2400}
        onComplete={() => setIsLoaded(true)}
      />

      {/* 2. React Bits StaggeredMenu Component (Unified Top-Left HYPER Logo + Menu Bars) */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#FFB6C1"
        accentColor="#FFB6C1"
        changeMenuColorOnOpen={true}
        colors={[]}
        linkedinUrl="https://www.linkedin.com/in/sumit-biswas-b577a9298?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        githubUrl="https://github.com/sumitbiswaspmi9c-hue"
        instagramUrl="https://www.instagram.com/itz__sxmit?mdxt=Y3hzYm44cTZsNWIy"
        isFixed={true}
      />

      {/* 3. Page Content Transition */}
      <PageTransition isLoaded={isLoaded}>
        {/* Hero Section with Cinematic Curtain Reveal Effect */}
        <div
          className="relative h-screen w-full z-0"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <section id="hero" className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black">
            {/* Left-Middle Hero Headline */}
            <div className="absolute left-4 xs:left-6 sm:left-8 md:left-12 lg:left-16 xl:left-[2.5em] top-1/2 -translate-y-1/2 z-40 pointer-events-none select-none max-w-[calc(100vw-2rem)] sm:max-w-none">
              <div className="inline-flex flex-col items-stretch max-w-full sm:max-w-fit">
                {/* 1. Crafting + Subtitle (Appears smoothly with reduced speed after bg image) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    duration: canHover ? 1.5 : 0.8,
                    delay: canHover ? 2.3 : 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h1
                    className="text-6xl xs:text-7xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13.5rem] 2xl:text-[15rem] font-bold leading-[0.85] text-shine-once hero-headline-mask bg-clip-text text-transparent origin-left mt-2 mb-0.5 sm:mt-3.5 sm:mb-1 drop-shadow-sm"
                    style={{
                      fontFamily: "'Cabinet Grotesk', 'CabinetGrotesk-Variable', 'CabinetGrotesk-Bold', sans-serif",
                      letterSpacing: '-0.04em',
                    }}
                  >
                    Crafting
                  </h1>

                  <div className="w-full flex items-center justify-between mt-0.5 sm:mt-1 px-0.5 translate-x-1.5 xs:translate-x-2 sm:translate-x-4 md:translate-x-6 hero-subtext-mask">
                    <span
                      className="w-full flex justify-between text-[0.54rem] xs:text-[0.64rem] sm:text-[0.74rem] md:text-[0.86rem] lg:text-[0.95rem] font-normal tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.18em] text-white uppercase whitespace-nowrap leading-none"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      IMMERSIVE DIGITAL EXPERIENCES
                    </span>
                  </div>
                </motion.div>

                {/* 2. Light Pink Glassmorphism Explore Projects Button (Appears at last) */}
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.95 }}
                  transition={{
                    duration: canHover ? 1.1 : 0.6,
                    delay: canHover ? 3.4 : 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-5 xs:mt-6 sm:mt-8 translate-x-1.5 xs:translate-x-2 sm:translate-x-4 md:translate-x-6 pointer-events-auto relative z-50"
                >
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const el = document.getElementById('projects');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white bg-[#FFB6C1]/20 hover:bg-[#FFB6C1]/30 active:scale-95 border border-[#FFB6C1]/40 hover:border-[#FFB6C1]/70 shadow-[0_4px_20px_rgba(255,182,193,0.15)] backdrop-blur-xl transition-all duration-300 group cursor-pointer pointer-events-auto relative z-50 select-auto"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <span className="bg-gradient-to-r from-white via-[#FFE4EC] to-[#FFB6C1] bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                      Explore projects
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB6C1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Desktop Particle Image Animation */}
            <div className="hidden md:block w-full h-full">
              <ParticleImage
                src="/hero-subject.png?v=2"
                maxParticles={32000}
                particleSize={2}
                mouseRadius={95}
                repelForce={26}
                returnSpeed={0.048}
                damping={0.942}
                isLoaded={isLoaded}
                canHover={canHover}
              />
            </div>

            {/* Mobile Static Hero Image - Zero animation for phones with high text contrast */}
            <div className="block md:hidden absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
              <img
                src="/hero-subject.png?v=2"
                alt="Hero Subject"
                className="w-full h-full object-cover object-center opacity-75"
              />
              {/* Dark overlay specifically on mobile to guarantee text pop */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35 pointer-events-none z-15" />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />
            </div>
          </section>
        </div>

        {/* 3. About & Tech Arsenal Section (Matching Screenshots 2 & 3) */}
        <AboutSection />

        {/* 4. Spotify Music Recommendations (Matching Screenshot 3) */}
        <MusicMarquee />

        {/* 5. My Projects (Matching Screenshots 1, 4, 5) */}
        <ProjectsSection />

        {/* 6. Contact & Socials */}
        <ContactSection />

        {/* 9. Footer */}
        <Footer />
      </PageTransition>
    </div>
  );
}

export default App;
