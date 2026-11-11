import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SplitText from './SplitText';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 'ayo-remi',
    title: 'Portfolio Website',
    description:
      'A personal portfolio crafted to showcase skills, projects, and creative work — built for speed, smooth animations, and a bold first impression.',
    image: '/portfolio/jishnu-portfolio.png',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'FRAMER MOTION'],
    liveUrl: 'https://jishnu-mondal-portfolio.vercel.app/',
  },
  {
    id: 'mechx-ai',
    title: 'Design Studio',
    description:
      'A bold design studio website built to showcase creative services, brand identity, and digital experiences — crafted with precision and visual impact.',
    image: '/portfolio/echo-studio.png',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'GSAP'],
    liveUrl: 'https://echo-design-studio-ex.vercel.app/',
  },
  {
    id: 'zenith-solar',
    title: 'Cafe Management',
    description:
      'A full-stack cafe management system with an admin portal for orders, menu, and reservations — built for seamless day-to-day cafe operations.',
    image: '/portfolio/mocha-miso.jpg',
    tags: ['REACT', 'FIREBASE', 'NODE.JS'],
    liveUrl: 'https://mochaandmiso.web.app/',
  },
];

interface ProjectCardProps {
  project: Project;
  idx: number;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, total }) => {
  const isEven = idx % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[32px] bg-white/[0.04] border border-white/20 backdrop-blur-3xl overflow-hidden px-8 sm:px-12 lg:px-14 py-9 sm:py-12 lg:py-14 min-h-[460px] sm:min-h-[500px] lg:min-h-[530px] flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_24px_rgba(255,255,255,0.03)] transform-gpu"
    >
      {/* Ambient Glass Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Subtle Gradient Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
          isEven ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 45 : -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 flex flex-col justify-between h-full space-y-6 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Action Circle Icons (GitHub & Link) */}
          <div className="flex items-center gap-3.5">
            {idx !== 0 && idx !== 1 && idx !== 2 && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                title="GitHub Repo"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.25)] group"
                title="Live Website"
              >
                {/* Logo before live site link */}
                <svg className="w-3.5 h-3.5 fill-black group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2L24 22H0L12 2Z" />
                </svg>
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-black stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            )}

            <span className="ml-auto text-xs font-mono text-slate-400 font-bold tracking-widest uppercase">
              0{idx + 1} / 0{total}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2.5 pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-white uppercase bg-white/[0.06] border border-white/15 backdrop-blur-lg shadow-sm"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Laptop Mockup Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 flex items-center justify-center ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/20 bg-white/[0.03] backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] p-2 sm:p-3 group">
            {/* Laptop Screen Header Mockup Bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.05] border-b border-white/10 rounded-t-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-b-xl group-hover:scale-[1.02] transition-transform duration-500 transform-gpu"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative w-full py-24 sm:py-36 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <SplitText
            text="SELECTED PROJECTS"
            tag="h1"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#EAE6E1] uppercase mb-4 whitespace-nowrap"
            delay={40}
            duration={0.65}
            animationFrom={{ opacity: 0, y: 50, scale: 0.95 }}
            animationTo={{ opacity: 1, y: 0, scale: 1 }}
          />
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C4C4C8] uppercase max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            FROM HIGH-CONVERSION LANDING PAGES TO AI-POWERED DASHBOARDS — EVERY BUILD HERE SOLVES A
            REAL-WORLD PROBLEM WITH STYLE AND SPEED.
          </p>
        </div>

        {/* Project Cards in clean sequential flow */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
