import React, { useState } from 'react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, Github, FileText, CheckCircle2, QrCode } from 'lucide-react';
import { PROFILE_DATA, EXPERIENCE_DATA, PROJECTS_DATA, EDUCATION_DATA, SKILLS_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [onePageMode, setOnePageMode] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sandeep-ai.app';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(currentUrl)}&color=24-53-42&bgcolor=238-247-241`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in-0">
      <div className="light-card rounded-2xl max-w-4xl w-full border border-[#DCEBE1] bg-white shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#EEF7F1] border-b border-[#DCEBE1] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#18352A] font-bold">
            <FileText className="w-4 h-4 text-[#5BAF82]" />
            <span>Sandeep_Kumar_Chaurasiya_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnePageMode(!onePageMode)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors ${
                onePageMode
                  ? 'bg-[#7BCB9B] border-[#7BCB9B] text-[#18352A] font-bold'
                  : 'bg-white border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              {onePageMode ? 'Full View' : 'One Page Recruiter View'}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#DCEBE1] text-[#18352A] hover:border-[#7BCB9B] transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Printer className="w-3.5 h-3.5 text-[#5BAF82]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5E7067] hover:text-[#18352A] hover:bg-[#DCEBE1]/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-7 bg-white text-[#18352A] font-sans print:p-0 print:m-0">
          {/* Header */}
          <div className="border-b-2 border-[#18352A] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18352A]">
                {PROFILE_DATA.name}
              </h1>
              <p className="text-sm font-semibold text-[#5BAF82] font-mono">
                AI Engineer • Generative AI Specialist • Data Scientist
              </p>
              <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-[#5E7067] font-mono pt-1">
                <span>📍 {PROFILE_DATA.location}</span>
                <span>📞 +91 {PROFILE_DATA.phonePrimary} / {PROFILE_DATA.phoneSecondary}</span>
                <span>✉️ {PROFILE_DATA.email}</span>
                <span>🔗 linkedin.com/in/sandeep-kumar-chaurasiya-08b596302</span>
              </div>
            </div>

            {/* Resume QR Code */}
            <div className="hidden sm:flex flex-col items-center p-2 rounded-xl bg-[#EEF7F1] border border-[#A8E6C1] shrink-0 text-center">
              <img src={qrApiUrl} alt="QR Code" className="w-16 h-16 rounded object-contain mb-1" />
              <span className="text-[9px] font-mono text-[#5E7067]">Live AI Portfolio</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold font-mono uppercase text-[#18352A] tracking-wider border-b border-[#DCEBE1] pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#18352A] leading-relaxed">
              {PROFILE_DATA.bio} 5+ years of IT engineering experience and 4+ years of technical training experience.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase text-[#18352A] tracking-wider border-b border-[#DCEBE1] pb-1">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#18352A]">
              <div>
                <strong>Generative AI & Agents:</strong> LangChain, LangGraph, RAG, Ollama, Hugging Face, ChromaDB, FAISS, Prompt Engineering, MCP.
              </div>
              <div>
                <strong>Machine Learning:</strong> Python, Scikit-learn, Pandas, NumPy, PyTorch, TensorFlow, MLflow, DVC, SMOTE, Classification, Regression.
              </div>
              <div>
                <strong>Data Analytics & BI:</strong> Power BI, DAX, Power Query, Advanced Excel, SQL, Star Schema, ETL Pipelines, KPI Reporting.
              </div>
              <div>
                <strong>Backend & Cloud:</strong> FastAPI, Flask, REST APIs, AWS (EC2, S3), Docker, Linux, Git/GitHub, CI/CD, Computer Vision (OpenCV), IoT.
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold font-mono uppercase text-[#18352A] tracking-wider border-b border-[#DCEBE1] pb-1">
              Professional Work History (5+ Years IT Experience)
            </h2>
            <div className="space-y-4">
              {(onePageMode ? EXPERIENCE_DATA.slice(0, 3) : EXPERIENCE_DATA).map((exp) => (
                <div key={exp.id} className="space-y-1 text-xs text-[#18352A]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-sm">
                    <div>
                      {exp.role} — <span className="text-[#5BAF82]">{exp.company}</span>
                    </div>
                    <div className="text-xs font-mono font-normal text-[#5E7067]">
                      {exp.period} | {exp.location}
                    </div>
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-[#5E7067]">
                    {exp.responsibilities.slice(0, onePageMode ? 2 : 4).map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase text-[#18352A] tracking-wider border-b border-[#DCEBE1] pb-1">
              Featured Production Projects
            </h2>
            <div className="space-y-2 text-xs text-[#18352A]">
              {(onePageMode ? PROJECTS_DATA.slice(0, 2) : PROJECTS_DATA).map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="font-bold text-[#18352A]">
                    {proj.title} <span className="font-normal text-[#5E7067]">({proj.technologies.join(', ')})</span>
                  </div>
                  <p className="text-[#5E7067] text-[11px]">{proj.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold font-mono uppercase text-[#18352A] tracking-wider border-b border-[#DCEBE1] pb-1">
              Education & Degrees
            </h2>
            <div className="space-y-1 text-xs text-[#18352A]">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <span className="font-bold">{edu.degree}</span> — {edu.institution} ({edu.location})
                  </div>
                  <div className="font-mono text-[#5E7067]">{edu.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
