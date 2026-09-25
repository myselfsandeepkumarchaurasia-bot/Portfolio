import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Terminal, 
  Command, 
  FileText, 
  Menu, 
  X, 
  Briefcase, 
  Cpu, 
  Sparkles, 
  ChevronRight,
  UserCheck,
  Mic
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface NavbarProps {
  technicalMode: boolean;
  setTechnicalMode: (val: boolean) => void;
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenAIModal: () => void;
  onOpenRecruiterQuickView: () => void;
  onOpenVoiceModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  technicalMode,
  setTechnicalMode,
  onOpenCommandPalette,
  onOpenTerminal,
  onOpenResume,
  onOpenAIModal,
  onOpenRecruiterQuickView,
  onOpenVoiceModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = technicalMode
    ? [
        { label: 'About', href: '#about' },
        { label: 'Capabilities', href: '#capabilities' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'AI Lab', href: '#ai-lab', highlight: true },
        { label: 'Methodology', href: '#methodology' },
        { label: 'Contact', href: '#contact' },
      ]
    : [
        { label: 'About', href: '#about' },
        { label: 'Capabilities', href: '#capabilities' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'AI Lab', href: '#ai-lab', highlight: true },
        { label: 'Contact', href: '#contact' },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#DCEBE1] py-3 shadow-sm'
          : 'bg-[#F7FBF8]/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82] group-hover:bg-[#7BCB9B] group-hover:text-white transition-all shadow-sm">
            <Cpu className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold tracking-tight text-[#18352A] group-hover:text-[#5BAF82] transition-colors flex items-center gap-1.5">
              <span>Sandeep Kumar Chaurasiya</span>
              <span className="w-2 h-2 rounded-full bg-[#5BAF82] animate-pulse" title="System Active" />
            </div>
            <div className="text-[11px] text-[#5E7067] font-mono hidden sm:block">
              AI Engineer • Generative AI • Data Scientist
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                link.highlight
                  ? 'text-[#18352A] font-bold flex items-center gap-1 bg-[#E8F8EE] border border-[#A8E6C1] rounded-lg'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#5BAF82]" />}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Mode Toggle */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Recruiter Quick View Button */}
          <button
            onClick={onOpenRecruiterQuickView}
            className="px-3 py-1.5 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] hover:bg-[#A8E6C1]/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            title="Open 60-Second Recruiter Summary"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#5BAF82]" />
            <span>Recruiter Quick View</span>
          </button>

          {/* Recruiter vs Technical Mode Switch */}
          <div className="flex items-center bg-[#EEF7F1] border border-[#DCEBE1] rounded-lg p-0.5 text-xs font-mono font-medium">
            <button
              onClick={() => setTechnicalMode(false)}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                !technicalMode
                  ? 'bg-white text-[#18352A] shadow-sm font-bold'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
              title="Recruiter View: Focused profile, impact, projects, and resume"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </button>
            <button
              onClick={() => setTechnicalMode(true)}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                technicalMode
                  ? 'bg-[#7BCB9B] text-[#18352A] font-bold shadow-sm'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
              title="Technical View: Interactive AI labs, architecture graphs & terminal"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical</span>
            </button>
          </div>

          {/* Quick Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#7BCB9B] transition-colors"
            title="Open Developer Terminal (~)"
            aria-label="Open Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="px-2 py-1.5 rounded-lg bg-white border border-[#DCEBE1] text-xs text-[#5E7067] hover:text-[#18352A] hover:border-[#7BCB9B] transition-colors flex items-center gap-1"
            title="Command Palette (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px]">⌘K</span>
          </button>

          {/* Resume Viewer */}
          <button
            onClick={onOpenResume}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#DCEBE1] text-xs font-mono font-medium text-[#18352A] hover:border-[#7BCB9B] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#5BAF82]" />
            <span>Resume</span>
          </button>

          {/* Unified Ask AI & Voice Assistant Button */}
          <button
            onClick={onOpenAIModal}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-sm flex items-center gap-2 transition-all border border-slate-700 group hover:border-emerald-500/50"
            title="Ask Sandeep AI & Voice Assistant (Chat & Spoken Audio)"
          >
            <Bot className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Ask AI & Voice</span>
            <div className="flex items-center gap-0.5 text-emerald-400 text-[10px] bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-600/40">
              <Mic className="w-3 h-3 animate-pulse" />
              <span>Live</span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenRecruiterQuickView}
            className="px-2.5 py-1 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] text-xs font-mono font-semibold"
          >
            Quick View
          </button>
          <button
            onClick={onOpenAIModal}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-1 shadow-sm"
            title="Ask AI & Voice"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white border border-[#DCEBE1] text-[#18352A]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCEBE1] px-4 pt-3 pb-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE1]">
            <span className="text-xs font-mono text-[#5E7067]">Mode:</span>
            <div className="flex items-center bg-[#EEF7F1] border border-[#DCEBE1] rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setTechnicalMode(false)}
                className={`px-3 py-1 rounded-md ${!technicalMode ? 'bg-white text-[#18352A] font-bold shadow-sm' : 'text-[#5E7067]'}`}
              >
                Recruiter
              </button>
              <button
                onClick={() => setTechnicalMode(true)}
                className={`px-3 py-1 rounded-md ${technicalMode ? 'bg-[#7BCB9B] text-[#18352A] font-bold shadow-sm' : 'text-[#5E7067]'}`}
              >
                Technical
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-xs text-[#18352A] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#5E7067]" />
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2 font-mono">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIModal();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Ask AI & Voice Assistant (बोलकर या लिखकर पूछें)</span>
              <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterQuickView();
              }}
              className="w-full py-2.5 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] text-xs font-bold text-[#18352A] flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#5BAF82]" />
              60-Second Recruiter Summary
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 rounded-lg bg-white border border-[#DCEBE1] text-xs font-medium text-[#18352A] flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#5BAF82]" />
              View & Download Resume
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2 rounded-lg bg-white border border-[#DCEBE1] text-xs font-medium text-[#18352A] flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#5BAF82]" />
              Developer CLI Terminal (~)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
