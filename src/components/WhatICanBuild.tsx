import React from 'react';
import { 
  Bot, 
  BarChart3, 
  Server, 
  Cpu, 
  Cloud, 
  ArrowRight, 
  Sparkles,
  Layers,
  Workflow
} from 'lucide-react';

interface WhatICanBuildProps {
  onOpenLab: (tabId: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const WhatICanBuild: React.FC<WhatICanBuildProps> = ({ onOpenLab, onNavigate }) => {
  const capabilities = [
    {
      title: 'AI Applications & Agents',
      icon: Bot,
      category: 'Generative AI',
      desc: 'End-to-end intelligent applications including privacy-preserving RAG on sensitive PDFs, cyclic LangGraph agents with dynamic tool dispatch, and voice assistants.',
      items: ['Local RAG Applications', 'AI Chatbots with Citations', 'LangGraph Multi-Step Agents', 'Document Intelligence (OCR)', 'Voice AI Interfaces'],
      technologies: ['LangChain', 'LangGraph', 'Ollama', 'ChromaDB', 'Gemini API'],
      labTarget: 'rag',
    },
    {
      title: 'Data Products & Analytics',
      icon: BarChart3,
      category: 'Predictive & BI',
      desc: 'Predictive machine learning pipelines and executive business intelligence suites transforming raw transactional records into actionable decision tools.',
      items: ['Customer Churn Prediction Models', 'Sales Forecasting Engines', 'HR & Attrition BI Dashboards', 'Automated ETL Pipelines'],
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Power BI', 'SQL', 'DAX'],
      labTarget: 'analytics',
    },
    {
      title: 'Backend Systems & APIs',
      icon: Server,
      category: 'Microservices',
      desc: 'High-performance asynchronous backend services exposing LLM inference, vector searches, and business logic with automated OpenAPI documentation.',
      items: ['FastAPI Asynchronous Services', 'Flask Application Proxies', 'Pydantic Runtime Schemas', 'Relational Database Interfacing'],
      technologies: ['FastAPI', 'Flask', 'Pydantic', 'PostgreSQL', 'SQLAlchemy'],
      labTarget: 'api',
    },
    {
      title: 'AI Infrastructure & RAG',
      icon: Cpu,
      category: 'System Engineering',
      desc: 'Architecting vector search indices, hybrid retrieval strategies, custom chunking algorithms, and deterministic prompt-engineering guardrails.',
      items: ['ChromaDB & FAISS Vector Stores', 'Semantic Recursive Chunking', 'Hybrid Dense/Sparse Search', 'Structured JSON Prompt Enforcers'],
      technologies: ['Hugging Face', 'all-MiniLM-L6-v2', 'FAISS', 'Prompt Engineering'],
      labTarget: 'agent',
    },
    {
      title: 'Cloud & Container Deployment',
      icon: Cloud,
      category: 'DevOps & MLOps',
      desc: 'Production-ready containerization and cloud orchestration ensuring seamless reproducibility between local development and AWS infrastructure.',
      items: ['Multi-Stage Docker Containers', 'AWS EC2 & S3 Object Storage', 'CI/CD Pipeline Automation', 'Linux Server Administration'],
      technologies: ['Docker', 'AWS EC2', 'AWS S3', 'Jenkins', 'Linux Bash'],
      labTarget: 'python',
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-[#EEF7F1]/50 border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Engineering Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            What I Can Build & Deliver
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            From zero-cloud-cost local RAG applications to enterprise predictive pipelines and cloud microservices.
          </p>
        </div>

        {/* 5 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="light-card light-card-hover p-6 flex flex-col justify-between space-y-5 bg-white"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#5E7067] uppercase font-semibold">
                      {cap.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18352A] tracking-tight">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-[#5E7067] leading-relaxed">
                    {cap.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#DCEBE1]/60">
                    <span className="text-[10px] font-mono uppercase text-[#5E7067] font-semibold">
                      Deliverables:
                    </span>
                    <ul className="space-y-1 text-xs text-[#18352A]">
                      {cap.items.slice(0, 3).map((item, iIdx) => (
                        <li key={iIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7BCB9B]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCEBE1] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cap.technologies.slice(0, 3).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEBE1] text-[10px] font-mono text-[#18352A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenLab(cap.labTarget)}
                    className="p-1.5 text-xs font-mono font-semibold text-[#5BAF82] hover:text-[#18352A] flex items-center gap-1 transition-colors"
                  >
                    <span>Try Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
