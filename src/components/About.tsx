import React from 'react';
import { 
  User, 
  Cpu, 
  Lightbulb, 
  Compass, 
  ShieldCheck, 
  Layers, 
  CheckCircle, 
  Sparkles
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <User className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Professional Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            Bridging Architecture, Data & Production Deployment
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            {PROFILE_DATA.bio}
          </p>
        </div>

        {/* 4 Pillars Grid: Who I Am, What I Build, How I Work, Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Who I Am */}
          <div className="light-card light-card-hover p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#18352A]">Who I Am</h3>
            <p className="text-[#5E7067] text-xs sm:text-sm leading-relaxed">
              I am an AI Engineer, Generative AI practitioner, and Data Scientist based in Mahrajganj, Uttar Pradesh, India.
              With over <strong>5+ years in IT software engineering</strong> and <strong>4+ years in technical training</strong>,
              I combine practical system development with the ability to articulate deep AI concepts to stakeholders and engineering teams.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#5E7067]">
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Mahrajganj, UP, India</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">5+ Yrs Industry</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">4+ Yrs Training</span>
            </div>
          </div>

          {/* What I Build */}
          <div className="light-card light-card-hover p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#18352A]">What I Build</h3>
            <p className="text-[#5E7067] text-xs sm:text-sm leading-relaxed">
              I engineer intelligent production systems: from <strong>privacy-centric local RAG pipelines</strong> with Ollama and ChromaDB,
              to <strong>multi-step LangGraph agents</strong> with dynamic tool execution, and <strong>predictive machine learning models</strong> (churn, forecasting)
              served via FastAPI and visualized in interactive Power BI dashboards.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#5E7067]">
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">LangGraph Agents</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Local & Cloud RAG</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">FastAPI Services</span>
            </div>
          </div>

          {/* How I Work */}
          <div className="light-card light-card-hover p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#18352A]">How I Work</h3>
            <p className="text-[#5E7067] text-xs sm:text-sm leading-relaxed">
              I treat AI as reliable engineering rather than stochastic magic. Every solution begins with data integrity,
              semantic chunking strategies, deterministic tool routing, and strict schema validation (Pydantic/TypeScript).
              I prioritize clean Docker containers, automated checks, and transparent execution traces.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#5E7067]">
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Deterministic Routing</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Pydantic Schemas</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Dockerized Labs</span>
            </div>
          </div>

          {/* Technology Philosophy */}
          <div className="light-card light-card-hover p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#18352A]">Technology Philosophy</h3>
            <p className="text-[#5E7067] text-xs sm:text-sm leading-relaxed">
              "Never ship an AI application that speculates without verifiable citations."
              I advocate for hybrid architectures that allow organizations to switch LLM backends (Gemini, local Ollama, Hugging Face)
              without breaking downstream enterprise tooling or leaking sensitive IP.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#5E7067]">
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Zero Hallucination Focus</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Model Agnostic</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F7FBF8] border border-[#DCEBE1]">Privacy First</span>
            </div>
          </div>
        </div>

        {/* Guiding Principles Deck */}
        <div className="light-card p-6 sm:p-8 bg-[#EEF7F1]/80 border border-[#DCEBE1]">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-[#5BAF82]" />
            <h3 className="text-lg font-bold text-[#18352A]">Core Architectural Principles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILE_DATA.philosophies.map((phil, i) => (
              <div key={i} className="space-y-1.5 border-l-2 border-[#7BCB9B] pl-4">
                <div className="text-xs font-mono text-[#5BAF82] uppercase font-semibold">
                  Principle 0{i + 1}
                </div>
                <h4 className="text-sm font-bold text-[#18352A]">{phil.title}</h4>
                <p className="text-xs text-[#5E7067] leading-relaxed">{phil.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
