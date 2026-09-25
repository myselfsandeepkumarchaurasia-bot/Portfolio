import React from 'react';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  Linkedin, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  MapPin, 
  Phone,
  Layers
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface RecruiterQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenLab: (tabId: string) => void;
}

export const RecruiterQuickViewModal: React.FC<RecruiterQuickViewModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenLab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-0">
      <div className="light-card rounded-2xl max-w-2xl w-full border border-[#DCEBE1] bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#EEF7F1] border-b border-[#DCEBE1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7BCB9B]/20 border border-[#7BCB9B]/40 flex items-center justify-center text-[#18352A]">
              <Briefcase className="w-4 h-4 text-[#5BAF82]" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
                60-Second Recruiter Summary
              </span>
              <h3 className="text-base font-bold text-[#18352A]">
                Candidate Snapshot • Sandeep Kumar Chaurasiya
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5E7067] hover:text-[#18352A] hover:bg-[#DCEBE1]/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#18352A]">
          {/* Identity & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCEBE1]">
            <div>
              <h4 className="text-lg font-bold">{PROFILE_DATA.name}</h4>
              <p className="text-xs font-mono text-[#5BAF82] font-semibold mt-0.5">
                AI Engineer • Generative AI Specialist • Data Scientist
              </p>
              <div className="flex items-center gap-3 text-xs text-[#5E7067] mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7BCB9B]" />
                  {PROFILE_DATA.location}
                </span>
                <span>·</span>
                <span>Immediate / 30-day Availability</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-mono text-xs font-semibold">
                5+ Yrs IT Experience
              </span>
              <span className="px-3 py-1 rounded-full bg-[#EEF7F1] border border-[#DCEBE1] text-[#5E7067] font-mono text-xs">
                4+ Yrs Training
              </span>
            </div>
          </div>

          {/* Core Competency Stack */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
              Core Technical Stack:
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {[
                'Python',
                'LangChain',
                'LangGraph (Agents)',
                'RAG Architecture',
                'Ollama / Local LLMs',
                'ChromaDB / FAISS',
                'Scikit-learn',
                'FastAPI',
                'SQL',
                'Power BI',
                'AWS (EC2, S3)',
                'Docker',
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Most Relevant Flagship Projects */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
              Key Production Deliverables:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                <div className="font-bold text-[#18352A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82]" />
                  Local RAG PDF Chat App
                </div>
                <p className="text-[11px] text-[#5E7067]">
                  Air-gapped document intelligence with Ollama, ChromaDB, and Tesseract OCR.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                <div className="font-bold text-[#18352A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82]" />
                  Doc Intelligence AI Agent
                </div>
                <p className="text-[11px] text-[#5E7067]">
                  LangGraph cyclic workflow with dynamic tool routing (Python REPL, vector search).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                <div className="font-bold text-[#18352A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82]" />
                  Customer Churn Prediction
                </div>
                <p className="text-[11px] text-[#5E7067]">
                  Scikit-learn pipeline with SMOTE class balancing & 0.89 ROC-AUC.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                <div className="font-bold text-[#18352A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82]" />
                  HR Attrition BI Suite
                </div>
                <p className="text-[11px] text-[#5E7067]">
                  Automated SQL extraction views & Power BI star-schema DAX metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Current Focus & Target Roles */}
          <div className="p-3.5 rounded-xl bg-[#EEF7F1] border border-[#DCEBE1] text-xs text-[#18352A] space-y-1">
            <span className="font-mono font-semibold text-[#5BAF82] uppercase text-[10px]">
              Current Role & Engagement Focus:
            </span>
            <p className="text-[#18352A] leading-relaxed">
              Currently serving as <strong>Data Science / AI Engineer at Aptus IT Solution</strong> (May 2025–Present).
              Open for Senior AI Engineer, Generative AI Specialist, and Machine Learning Lead positions.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F7FBF8] border-t border-[#DCEBE1] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-mono text-[#5E7067] hover:text-[#18352A] transition-colors"
          >
            ← View Full Portfolio
          </button>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE_DATA.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#5BAF82] transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="p-2 rounded-lg bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#5BAF82] transition-colors"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="px-4 py-2 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-semibold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
