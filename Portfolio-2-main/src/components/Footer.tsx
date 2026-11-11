
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

/* ── Inline SVG social icons (lucide-react has no brand icons in this version) ── */
const GitHubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
  </svg>
);
const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const InstagramSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const XSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.928l4.258 5.63 4.808-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const VercelSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L24 22H0L12 2Z" />
  </svg>
);

const GlobeSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Home',     href: '#hero' },
      { title: 'About',    href: '#about' },
      { title: 'Projects', href: '#projects' },
      { title: 'Contact',  href: '#contact' },
    ],
  },
  {
    label: 'Work',
    links: [
      { title: 'Portfolio Website', href: '', icon: VercelSVG },
      { title: 'Design Studio',     href: 'https://hyper-design-studio.vercel.app/', icon: VercelSVG },
      { title: 'Cafe Management',   href: 'https://mochaandmiso.web.app/', icon: GlobeSVG },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'GitHub',    href: 'https://github.com/sumitbiswaspmi9c-hue',    icon: GitHubSVG },
      { title: 'LinkedIn',  href: 'https://www.linkedin.com/in/sumit-biswas-b577a9298?utm_source=share_via&utm_content=profile&utm_medium=member_android',  icon: LinkedInSVG },
      { title: 'Instagram', href: 'https://www.instagram.com/itz__sxmit?mdxt=Y3hzYm44cTZsNWIy', icon: InstagramSVG },
      { title: 'Twitter / X', href: 'https://x.com/MrStrange123456', icon: XSVG },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-[2.5rem] border-t border-white/8 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.06),transparent)] px-6 py-14 lg:py-20 z-10" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>

      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-1/3 rounded-full bg-white/20 blur-sm" />

      <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">

        {/* Brand column */}
        <AnimatedContainer className="space-y-5">
          <div>
            <span className="text-3xl font-extrabold tracking-tight text-white">HYPER</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Full-Stack Web Developer &amp; Creative Technologist — engineering fast, immersive, and motion-driven digital products.
          </p>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Sumit Biswas. All rights reserved.
          </p>
        </AnimatedContainer>

        {/* Link columns */}
        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
                  {section.label}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.icon && <link.icon className="w-3.5 h-3.5 shrink-0" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <AnimatedContainer delay={0.5} className="mt-14 w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-600">
          Full-Stack Developer • Available for freelance
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500">Open to work</span>
        </div>
      </AnimatedContainer>

    </footer>
  );
};

/* ── Animated wrapper ── */
type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Footer;
