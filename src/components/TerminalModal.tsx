import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLab: (tabId: string) => void;
  onOpenResume: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenLab,
  onOpenResume,
}) => {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'init',
      output: `Sandeep Kumar Chaurasiya [AI & GenAI Engineer CLI v2.4]
Type 'help' to inspect available shell commands.`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let output = '';

    switch (lower) {
      case 'help':
        output = `Available Shell Commands:
• whoami       : Print professional identity and career summary
• skills       : List core AI, ML, Data Analytics and Cloud technologies
• projects     : Display flagship production projects
• experience   : Display 5+ years chronological work history
• education    : Academic qualifications (MCA, BCA, Polytechnic CSE)
• contact      : Output direct phone, email, and LinkedIn details
• rag          : Launch Local RAG Pipeline Explorer
• agent        : Launch LangGraph Agentic AI Playground
• resume       : Open interactive resume viewer
• sudo hire sandeep : Unlock direct contact details & interview scheduler
• clear        : Clear terminal console
• exit         : Close developer terminal`;
        break;

      case 'whoami':
        output = `${PROFILE_DATA.name}
Role: ${PROFILE_DATA.title}
Location: ${PROFILE_DATA.location}
Summary: 5+ Years IT Experience, 4+ Years Technical Training.
Specializes in RAG pipelines, LangGraph cyclic agents, and predictive ML models.`;
        break;

      case 'skills':
        output = `Core Technical Competencies:
[Generative AI] LangChain, LangGraph, RAG, Ollama, Hugging Face, ChromaDB, FAISS
[Machine Learning] Python, Scikit-learn, Pandas, NumPy, PyTorch, TensorFlow
[Data Analytics] Power BI, DAX, Power Query, Advanced Excel, SQL, ETL
[Cloud & DevOps] FastAPI, Flask, AWS (EC2, S3), Docker, Linux, Git`;
        break;

      case 'projects':
        output = `Flagship Production Projects:
1. Local RAG PDF Chat Application (Ollama + LangChain + ChromaDB + OCR)
2. AI Agent for Document Intelligence (LangGraph cyclic multi-step reasoning)
3. Customer Churn Prediction Engine (Scikit-learn + SMOTE + Flask)
4. HR & Workforce Attrition Analytics (Power BI + SQL Star Schema + DAX)`;
        break;

      case 'experience':
        output = `Career History:
• Aptus IT Solution (May 2025–Present): Data Science / AI Engineer
• STEMROBO Technologies (Jun 2024–Mar 2025): Innovation Engineer
• Zen Software Solutions (Mar 2022–May 2024): Data Analyst & DevOps Support
• Hallmark World School (Sep 2018–Apr 2022): Computer Science Teacher
• Zen Software Solutions (Nov 2016–Apr 2018): Data Analyst`;
        break;

      case 'education':
        output = `Academic Qualifications:
• MCA (Master of Computer Applications) — Pursuing, Kurukshetra University
• BCA (Bachelor of Computer Applications) — Mahatma Gandhi Kashi Vidyapith, Varanasi
• Diploma in Polytechnic CSE — BTE, Lucknow
• High School & Intermediate — MGI Siswa Bajar, Mahrajganj`;
        break;

      case 'contact':
        output = `Direct Contact Records:
Phone Primary   : +91 ${PROFILE_DATA.phonePrimary}
Phone Secondary : +91 ${PROFILE_DATA.phoneSecondary}
Email           : ${PROFILE_DATA.email}
LinkedIn        : ${PROFILE_DATA.linkedInUrl}
GitHub          : ${PROFILE_DATA.githubUrl}`;
        break;

      case 'rag':
        onClose();
        onOpenLab('rag');
        return;

      case 'agent':
        onClose();
        onOpenLab('agent');
        return;

      case 'resume':
        onClose();
        onOpenResume();
        return;

      case 'sudo hire sandeep':
        output = `[AUTHORIZED] Access granted: Initiating recruitment workflow.
Contact Email: ${PROFILE_DATA.email}
Phone: +91 ${PROFILE_DATA.phonePrimary}
Status: Ready for technical interviews and production AI roles.`;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0">
      <div className="light-card rounded-2xl max-w-3xl w-full h-[520px] border border-[#DCEBE1] bg-white shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        {/* Title Bar in Light Theme */}
        <div className="p-3 bg-[#EEF7F1] border-b border-[#DCEBE1] flex items-center justify-between text-[#18352A] select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#7BCB9B] inline-block" />
            </div>
            <span className="text-xs text-[#18352A] font-bold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#5BAF82]" />
              sandeep@engineer-ai: ~ (Light Terminal Mode)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#5E7067] hover:text-[#18352A] hover:bg-[#DCEBE1]/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Output Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 leading-relaxed text-[#18352A] bg-[#F7FBF8]">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="text-[#5BAF82] font-bold flex items-center gap-2">
                <span className="text-[#5E7067]">$</span>
                <span>{h.cmd}</span>
              </div>
              <div className="text-[#18352A] whitespace-pre-wrap pl-4 border-l-2 border-[#DCEBE1]">
                {h.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-white border-t border-[#DCEBE1] flex items-center gap-2"
        >
          <span className="text-[#5BAF82] font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'whoami', 'skills', 'projects', 'rag', 'sudo hire sandeep'..."
            className="flex-1 bg-transparent text-[#18352A] text-xs focus:outline-none placeholder-[#5E7067]"
          />
        </form>
      </div>
    </div>
  );
};
