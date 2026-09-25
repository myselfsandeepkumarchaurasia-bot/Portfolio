import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhatICanBuild } from './components/WhatICanBuild';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { TechGraph } from './components/TechGraph';
import { Projects } from './components/Projects';
import { ArchitectureSection } from './components/ArchitectureSection';
import { HowIThink } from './components/HowIThink';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { TerminalModal } from './components/TerminalModal';
import { ResumeModal } from './components/ResumeModal';
import { AIChatModal } from './components/AIChatModal';
import { VoiceChatModal } from './components/VoiceChatModal';
import { RecruiterQuickViewModal } from './components/RecruiterQuickViewModal';
import { FloatingAIButton } from './components/FloatingAIButton';
import { AILabHub } from './components/labs/AILabHub';
import { Cpu, ArrowRight, Sparkles, Terminal, Mic, Bot } from 'lucide-react';

export default function App() {
  // Recruiter vs Technical Mode toggle (persisted locally)
  const [technicalMode, setTechnicalMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sandeep_portfolio_mode');
      if (saved) return saved === 'technical';
    }
    return false; // Recruiter mode default for fast evaluation
  });

  // Modals state
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [voiceChatOpen, setVoiceChatOpen] = useState(false);
  const [recruiterQuickViewOpen, setRecruiterQuickViewOpen] = useState(false);

  // Current active tab in AI Lab
  const [activeLabTab, setActiveLabTab] = useState('chat');

  // Sync mode changes to localStorage
  const handleToggleTechnicalMode = (val: boolean) => {
    setTechnicalMode(val);
    try {
      localStorage.setItem('sandeep_portfolio_mode', val ? 'technical' : 'recruiter');
    } catch {
      // ignore localStorage quotas
    }
  };

  // Global key listener for Ctrl+K and ~
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenLab = (tabId: string) => {
    setActiveLabTab(tabId);
    handleToggleTechnicalMode(true);
    setTimeout(() => {
      const element = document.getElementById('ai-lab');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-emerald-200 selection:text-slate-900">
      {/* Navigation */}
      <Navbar
        technicalMode={technicalMode}
        setTechnicalMode={handleToggleTechnicalMode}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAIModal={() => setAiChatOpen(true)}
        onOpenVoiceModal={() => setVoiceChatOpen(true)}
        onOpenRecruiterQuickView={() => setRecruiterQuickViewOpen(true)}
      />

      {/* Main Content Stream */}
      <main className="flex-1">
        {/* Cinematic Light Hero */}
        <Hero
          onOpenAIModal={() => setAiChatOpen(true)}
          onOpenVoiceModal={() => setVoiceChatOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          onOpenRecruiterQuickView={() => setRecruiterQuickViewOpen(true)}
        />

        {/* RECRUITER MODE VIEW */}
        {!technicalMode && (
          <>
            {/* About Section */}
            <About />

            {/* What I Can Build (Engineering & Business Capabilities) */}
            <WhatICanBuild
              onOpenLab={handleOpenLab}
              onNavigate={handleNavigate}
            />

            {/* Experience Timeline */}
            <Experience />

            {/* Skills Ecosystem with Proof of Work */}
            <Skills onOpenProof={() => handleNavigate('projects')} />

            {/* Flagship Projects Showcase */}
            <Projects onOpenLab={handleOpenLab} />

            {/* Academic Foundation */}
            <Education />

            {/* Recruiter-to-Technical Mode Banner Card */}
            <section className="py-14 bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/50 border-y border-slate-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="light-card p-6 sm:p-8 bg-white border border-slate-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Deep Technical Evaluation</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Want to inspect the RAG pipelines & agent state graphs?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                      Switch to <strong>Technical Mode</strong> to interact with the full Sandeep AI Lab, test the Python sandbox, query live SQL tables, inspect LangGraph traces, and open the system developer terminal.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button
                      onClick={() => setAiChatOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono shadow-sm flex items-center gap-2 transition-all border border-slate-700"
                    >
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <span>Ask AI & Voice 🎙️</span>
                    </button>
                    <button
                      onClick={() => handleToggleTechnicalMode(true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono shadow-sm flex items-center gap-2 transition-all"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Switch to Technical Mode</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTerminalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                      title="Launch Terminal"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terminal (~)</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Consultation */}
            <Contact onOpenResume={() => setResumeOpen(true)} />
          </>
        )}

        {/* TECHNICAL MODE VIEW */}
        {technicalMode && (
          <>
            {/* What I Can Build (Engineering Capabilities) */}
            <WhatICanBuild
              onOpenLab={handleOpenLab}
              onNavigate={handleNavigate}
            />

            {/* Skills Ecosystem with Proof of Work */}
            <Skills onOpenProof={() => handleNavigate('projects')} />

            {/* Interactive Technology Ecosystem Graph */}
            <TechGraph />

            {/* Flagship Projects Showcase */}
            <Projects onOpenLab={handleOpenLab} />

            {/* Master AI Lab (The centerpiece platform) */}
            <AILabHub initialTab={activeLabTab} />

            {/* System Architecture Section */}
            <ArchitectureSection />

            {/* Engineering Methodology (How I Think) */}
            <HowIThink />

            {/* Professional Background & Experience */}
            <Experience />

            {/* Academic Foundation */}
            <Education />

            {/* Contact & Consultation */}
            <Contact onOpenResume={() => setResumeOpen(true)} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeOpen(true)}
        onOpenAIModal={() => setAiChatOpen(true)}
      />

      {/* Modals & Overlays */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenLab={handleOpenLab}
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAIModal={() => setAiChatOpen(true)}
        onOpenVoiceModal={() => setVoiceChatOpen(true)}
        onOpenRecruiterQuickView={() => setRecruiterQuickViewOpen(true)}
        technicalMode={technicalMode}
        setTechnicalMode={handleToggleTechnicalMode}
      />

      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenLab={handleOpenLab}
        onOpenResume={() => setResumeOpen(true)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <AIChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onOpenVoiceModal={() => setVoiceChatOpen(true)}
      />

      <VoiceChatModal
        isOpen={voiceChatOpen}
        onClose={() => setVoiceChatOpen(false)}
        onOpenLab={handleOpenLab}
      />

      <RecruiterQuickViewModal
        isOpen={recruiterQuickViewOpen}
        onClose={() => setRecruiterQuickViewOpen(false)}
        onOpenResume={() => {
          setRecruiterQuickViewOpen(false);
          setResumeOpen(true);
        }}
        onOpenLab={handleOpenLab}
      />

      {/* Persistent Floating AI & Voice Chat Button */}
      <FloatingAIButton 
        onOpen={() => setAiChatOpen(true)} 
        onOpenVoice={() => setVoiceChatOpen(true)}
      />
    </div>
  );
}
