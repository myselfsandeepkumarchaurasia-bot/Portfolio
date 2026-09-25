import React from 'react';
import { Cpu, Linkedin, Github, Mail, FileText, ArrowUp } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAIModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenAIModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#DCEBE1] py-12 relative overflow-hidden">
      {/* Subtle animated green line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7BCB9B] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#DCEBE1]">
          {/* Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-[#18352A] tracking-tight">
                {PROFILE_DATA.name}
              </div>
              <div className="text-xs text-[#5E7067] font-mono">
                {PROFILE_DATA.title}
              </div>
            </div>
          </div>

          {/* Direct Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#5E7067]">
            <a
              href={PROFILE_DATA.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5BAF82] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5BAF82] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-[#5BAF82] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-[#5BAF82] transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button
              onClick={onOpenAIModal}
              className="hover:text-[#18352A] font-bold transition-colors text-[#5BAF82]"
            >
              Ask My AI
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#7BCB9B] transition-colors shadow-sm"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5E7067] text-center sm:text-left">
          <div>
            © 2026 Sandeep Kumar Chaurasiya. Mahrajganj, Uttar Pradesh, India.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Python, AI & curiosity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
