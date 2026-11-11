import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const AgencyBanner: React.FC = () => {
  return (
    <section id="agency" className="relative w-full py-20 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="relative rounded-[32px] bg-[#161922] border border-white/10 overflow-hidden p-8 sm:p-14 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#EAE6E1]"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Partner With Us. Launch Fast.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                I run <span className="text-white font-semibold">Zenith Studio</span>, an AI-powered
                agency helping founders go from zero to launch — fast. We're gifting 4 months of
                post-launch support to the first 10 signups.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://hyper-design-studio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2"
              >
                <span>Book A Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://hyper-design-studio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-[#1b1e2a] hover:bg-[#232738] border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                <span>Hyper Studio</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyBanner;
