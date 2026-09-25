import React, { useState, useEffect } from 'react';
import { 
  Command, 
  Search, 
  Bot, 
  Layers, 
  Workflow, 
  Database, 
  Terminal, 
  FileText, 
  Mail, 
  Briefcase, 
  Cpu, 
  TrendingUp, 
  BarChart3, 
  HelpCircle,
  X,
  Code2,
  GraduationCap,
  Server,
  UserCheck,
  Mic
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenLab: (tabId: string) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenAIModal: () => void;
  onOpenRecruiterQuickView: () => void;
  onOpenVoiceModal?: () => void;
  technicalMode: boolean;
  setTechnicalMode: (val: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenLab,
  onOpenResume,
  onOpenTerminal,
  onOpenAIModal,
  onOpenRecruiterQuickView,
  onOpenVoiceModal,
  technicalMode,
  setTechnicalMode,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'quick_view',
      label: 'Recruiter Quick View (60s Summary)',
      desc: 'Instant candidate profile summary for hiring managers',
      icon: UserCheck,
      category: 'Recruiter',
      action: () => {
        onClose();
        onOpenRecruiterQuickView();
      },
    },
    {
      id: 'ai_voice_assistant',
      label: 'Ask Sandeep AI & Voice Assistant (बोलकर या लिखकर पूछें)',
      desc: 'Interactive chat & live spoken voice conversation with verified citations',
      icon: Bot,
      category: 'AI Assistant',
      action: () => {
        onClose();
        onOpenAIModal();
      },
    },
    {
      id: 'rag',
      label: 'Open Document RAG Lab',
      desc: 'Test semantic text chunking & vector search',
      icon: Layers,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('rag');
      },
    },
    {
      id: 'agent',
      label: 'Open Agentic AI Playground',
      desc: 'Inspect LangGraph cyclic state machine traces',
      icon: Workflow,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('agent');
      },
    },
    {
      id: 'interview',
      label: 'AI Interview Simulator ("Interview Me")',
      desc: 'Practice technical interview questions across AI/ML roles',
      icon: HelpCircle,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('interview');
      },
    },
    {
      id: 'jd_match',
      label: 'Resume-to-JD Matcher Demo',
      desc: 'Evaluate job description alignment against verified skills',
      icon: FileText,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('jd_match');
      },
    },
    {
      id: 'code_review',
      label: 'AI Code Reviewer',
      desc: 'Audit Python & SQL for performance, security, and prompt hygiene',
      icon: Code2,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('review');
      },
    },
    {
      id: 'learn',
      label: 'Learn With Sandeep AI',
      desc: 'Interactive concepts from 4+ years of technical training',
      icon: GraduationCap,
      category: 'AI Lab',
      action: () => {
        onClose();
        onOpenLab('learn');
      },
    },
    {
      id: 'sql',
      label: 'Open SQL Query Lab',
      desc: 'Run analytical SELECT queries against sample DB',
      icon: Database,
      category: 'Developer Labs',
      action: () => {
        onClose();
        onOpenLab('sql');
      },
    },
    {
      id: 'python',
      label: 'Open Python Sandbox',
      desc: 'Execute Python algorithms and ML metrics',
      icon: Terminal,
      category: 'Developer Labs',
      action: () => {
        onClose();
        onOpenLab('python');
      },
    },
    {
      id: 'ml',
      label: 'Open ML Benchmark Playground',
      desc: 'Tune hyperparameters and evaluate confusion matrix',
      icon: TrendingUp,
      category: 'Developer Labs',
      action: () => {
        onClose();
        onOpenLab('ml');
      },
    },
    {
      id: 'api',
      label: 'Live FastAPI Playground',
      desc: 'Invoke FastAPI microservice endpoints live',
      icon: Server,
      category: 'Developer Labs',
      action: () => {
        onClose();
        onOpenLab('api');
      },
    },
    {
      id: 'resume',
      label: 'View & Download Resume',
      desc: 'Open formatted professional resume viewer',
      icon: FileText,
      category: 'Career',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'terminal',
      label: 'Launch Developer CLI Terminal (~)',
      desc: 'Open interactive CLI with whoami, skills, projects',
      icon: Terminal,
      category: 'System',
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'projects',
      label: 'Jump to Flagship Projects',
      desc: 'Local RAG, LangGraph Agent, Churn Engine, HR Analytics',
      icon: Briefcase,
      category: 'Navigation',
      action: () => {
        onClose();
        onNavigate('projects');
      },
    },
    {
      id: 'contact',
      label: 'Contact Sandeep',
      desc: 'Direct email, phone, location, and message form',
      icon: Mail,
      category: 'Navigation',
      action: () => {
        onClose();
        onNavigate('contact');
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="light-card rounded-2xl max-w-xl w-full border border-[#DCEBE1] bg-white shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DCEBE1] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5E7067] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search (e.g., Quick View, RAG, Interview, SQL, Resume)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-mono text-[#18352A] placeholder-[#5E7067] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#5E7067] hover:text-[#18352A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-2.5 rounded-xl hover:bg-[#EEF7F1] text-left transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] flex items-center justify-center text-[#5E7067] group-hover:text-[#5BAF82] group-hover:border-[#7BCB9B]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18352A] font-mono">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#5E7067] truncate max-w-sm">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#5E7067] uppercase px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEBE1]">
                  {item.category}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs font-mono text-[#5E7067]">
              No matching actions found for "{query}".
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="p-3 bg-[#EEF7F1]/80 border-t border-[#DCEBE1] flex items-center justify-between text-[11px] font-mono text-[#5E7067]">
          <span>Navigation: Press ESC to close</span>
          <span>Sandeep AI Command Hub</span>
        </div>
      </div>
    </div>
  );
};
