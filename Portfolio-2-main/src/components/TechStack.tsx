import React from 'react';
import { Layout, Server, Palette } from 'lucide-react';

export const TechStack: React.FC = () => {
  const categories = [
    {
      title: 'Frontend Tools',
      icon: Layout,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/20',
      badgeBg: 'bg-cyan-500/10 text-cyan-300',
      skills: [
        'JavaScript (ES6+)',
        'React',
        'Next.js',
        'TypeScript',
        'Prismic CMS',
        'Redux',
        'Redux Toolkit',
        'React Testing Library',
        'Vitest',
        'HTML5',
      ],
    },
    {
      title: 'Backend Tools',
      icon: Server,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-500/20',
      badgeBg: 'bg-indigo-500/10 text-indigo-300',
      skills: [
        'Node.js',
        'Express.js',
        'Supabase',
        'Firebase',
        'Prisma ORM',
        'PlanetScale',
        'REST APIs',
        'PostgreSQL',
        'MongoDB',
        'Stripe Integration',
      ],
    },
    {
      title: 'UI Libraries',
      icon: Palette,
      color: 'from-fuchsia-500 to-pink-600',
      borderColor: 'border-fuchsia-500/20',
      badgeBg: 'bg-fuchsia-500/10 text-fuchsia-300',
      skills: [
        'CSS3/SCSS/SASS',
        'Tailwind CSS',
        'Framer Motion',
        'GSAP',
        'Material UI',
        'Bootstrap',
        'Chart.js',
        'shadcn/ui',
      ],
    },
  ];

  return (
    <section id="tech-stack" className="relative w-full py-20 px-4 sm:px-8 max-w-6xl mx-auto z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
          <span>CAPABILITIES & ARSENAL</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Engineered With Modern Technologies
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
          Full-stack versatility optimized for scalable web applications, fluid animations, and high performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className={`p-6 rounded-3xl bg-[#1f1f1f]/70 border ${cat.borderColor} backdrop-blur-xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)] group`}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${cat.color} p-[1px] flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-[#181818] rounded-[15px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium ${cat.badgeBg} border border-white/5 group-hover:border-white/10 transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
