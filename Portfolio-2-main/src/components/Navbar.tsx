import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Cpu, Layers, Radio, Compass } from 'lucide-react';

interface NavbarProps {
  activePresetId?: string;
  onSelectPreset?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: Compass, href: '#overview' },
    { label: 'Ecosystem', icon: Layers, href: '#ecosystem' },
    { label: 'Neural Core', icon: Cpu, href: '#core' },
    { label: 'Signals', icon: Radio, href: '#signals' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <a 
          href="#" 
          className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1px]">
            <div className="w-full h-full bg-[#07090e] rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#07090e] animate-pulse" />
          </div>
          <span className="font-semibold tracking-wider text-sm text-slate-100 font-mono flex items-center gap-1.5">
            JISHNU<span className="text-cyan-400 font-light">.DEV</span>
          </span>
        </a>
      </div>

      {/* Floating Pill Center Menu */}
      <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Action Menu */}
      <div className="hidden sm:flex items-center gap-3 pointer-events-auto">
        <button className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md text-xs font-medium text-cyan-300 hover:text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
          <span>Connect Node</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="flex md:hidden pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 p-4 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 pointer-events-auto md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 mt-1">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs uppercase tracking-wider">
              <span>Connect Node</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
