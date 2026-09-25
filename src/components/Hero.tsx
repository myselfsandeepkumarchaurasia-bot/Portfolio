import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  ArrowRight, 
  FileText, 
  Linkedin, 
  Github, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  Code2, 
  Layers, 
  Workflow, 
  Server,
  UserCheck,
  Mic
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenAIModal: () => void;
  onOpenResume: () => void;
  onOpenRecruiterQuickView: () => void;
  onOpenVoiceModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenAIModal, 
  onOpenResume,
  onOpenRecruiterQuickView,
  onOpenVoiceModal
}) => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [systemStatus, setSystemStatus] = useState({
    aiAssistant: 'Online (Grounded AI)',
    ragEngine: 'Ready',
    agentEngine: 'Ready',
    fastApiBackend: 'Online',
    vectorSearch: 'Ready',
  });

  useEffect(() => {
    fetch('/api/system/status')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSystemStatus({
            aiAssistant: data.aiAssistant || 'Online',
            ragEngine: data.ragEngine || 'Ready',
            agentEngine: data.agentEngine || 'Ready',
            fastApiBackend: data.fastApiBackend || 'Online',
            vectorSearch: data.vectorSearch || 'Ready',
          });
        }
      })
      .catch(() => {
        // graceful status
      });

    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 6);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const pipelineNodes = [
    { label: 'USER QUERY', icon: Bot, desc: 'Natural language or multi-modal prompt' },
    { label: 'AI ORCHESTRATOR', icon: Cpu, desc: 'Gemini / Ollama model inference' },
    { label: 'RAG RETRIEVER', icon: Layers, desc: 'Semantic search via ChromaDB / FAISS' },
    { label: 'AGENT WORKFLOW', icon: Workflow, desc: 'LangGraph stateful planning & routing' },
    { label: 'TOOL EXECUTION', icon: Code2, desc: 'Python REPL, SQL engine & APIs' },
    { label: 'DATA REPOSITORY', icon: Database, desc: 'Vector indices & relational tables' },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#F7FBF8]">
      {/* Background soft ambient accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#A8E6C1]/25 via-[#E8F8EE] to-[#7E9BE8]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#7BCB9B]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8EE] border border-[#A8E6C1] text-xs font-mono text-[#18352A]">
              <span className="w-2 h-2 rounded-full bg-[#5BAF82] animate-pulse" />
              <span className="font-semibold tracking-wide">ENTERPRISE AI SYSTEMS & PRODUCTION DATA PLATFORMS</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#18352A] leading-tight">
                <span className="block">Sandeep Kumar</span>
                <span className="text-[#5BAF82]">Chaurasiya</span>
              </h1>
              <p className="text-base sm:text-lg font-mono font-medium text-[#5E7067]">
                AI Engineer • Generative AI Engineer • Data Scientist
              </p>
            </div>

            {/* Concise Statement */}
            <p className="text-base sm:text-lg text-[#18352A] max-w-2xl leading-relaxed">
              Building intelligent AI systems, data products and production-ready applications.
              Specializing in privacy-first local RAG pipelines, LangGraph agent workflows, and predictive analytics.
            </p>

            {/* Quick Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#DCEBE1]">
              {PROFILE_DATA.metrics.map((metric, i) => (
                <div key={i} className="px-2 py-1">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#18352A]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-[#18352A]">{metric.label}</div>
                  <div className="text-[11px] text-[#5E7067] truncate">{metric.sub}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono shadow-sm flex items-center gap-2 transition-all group"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenAIModal}
                className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono shadow-md flex items-center gap-2.5 transition-all hover:scale-102 active:scale-98 group border border-slate-700"
                title="Ask Sandeep AI & Voice Assistant: Chat with text or speak naturally in Hindi & English"
              >
                <div className="w-5 h-5 rounded-md bg-emerald-600/30 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span>Ask AI & Voice Assistant</span>
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-600/40">
                  <Mic className="w-3 h-3 animate-pulse" />
                  <span>Voice 🎙️</span>
                </div>
              </button>

              <button
                onClick={onOpenRecruiterQuickView}
                className="px-4 py-2.5 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] hover:bg-[#A8E6C1]/40 text-[#18352A] font-semibold text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#5BAF82]" />
                <span>Recruiter Quick View</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-3.5 py-2.5 rounded-lg bg-white border border-[#DCEBE1] hover:border-[#A8E6C1] text-[#5E7067] hover:text-[#18352A] font-medium text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>

              <div className="flex items-center gap-1 pl-1">
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
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#5BAF82] transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Visual Console: Live AI System Status + Pipeline Flow (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live AI Status Card */}
            <div className="light-card p-4 bg-white border border-[#DCEBE1] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE1]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#5BAF82]" />
                  <span className="text-xs font-mono font-bold tracking-wider text-[#18352A] uppercase">
                    AI System Status
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#5BAF82]">
                  <span className="w-2 h-2 rounded-full bg-[#5BAF82] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 text-xs font-mono">
                <div className="p-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] flex items-center justify-between">
                  <span className="text-[#5E7067]">AI Assistant</span>
                  <span className="text-[#18352A] font-bold">Online</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] flex items-center justify-between">
                  <span className="text-[#5E7067]">RAG Engine</span>
                  <span className="text-[#5BAF82] font-bold">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] flex items-center justify-between">
                  <span className="text-[#5E7067]">Agent Engine</span>
                  <span className="text-[#7E9BE8] font-bold">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] flex items-center justify-between">
                  <span className="text-[#5E7067]">Vector Search</span>
                  <span className="text-[#18352A] font-bold">Ready</span>
                </div>
              </div>
            </div>

            {/* Interactive Architecture Flow Visualizer (Light Theme) */}
            <div className="light-card p-5 bg-white border border-[#DCEBE1] shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCEBE1]">
                <span className="text-xs font-mono text-[#5E7067] uppercase font-bold flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-[#5BAF82]" />
                  Execution Flow Topology
                </span>
                <span className="text-[11px] font-mono text-[#5E7067]">Node {activeNode + 1} of 6</span>
              </div>

              {/* Node Sequence List */}
              <div className="space-y-1.5 font-mono text-xs">
                {pipelineNodes.map((node, idx) => {
                  const Icon = node.icon;
                  const isActive = idx === activeNode;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveNode(idx)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-[#E8F8EE] border-[#7BCB9B] text-[#18352A] font-bold shadow-sm'
                          : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#5E7067] hover:border-[#A8E6C1]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center ${
                            isActive ? 'bg-[#7BCB9B] text-white' : 'bg-white text-[#5E7067] border border-[#DCEBE1]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className={`text-xs ${isActive ? 'text-[#18352A] font-bold' : 'text-[#18352A]'}`}>
                            {node.label}
                          </div>
                          <div className="text-[10px] text-[#5E7067] truncate max-w-[200px] font-sans">
                            {node.desc}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono">
                        {isActive ? (
                          <span className="text-[#5BAF82] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82] animate-ping" />
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[#5E7067]">0{idx + 1}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#DCEBE1] flex items-center justify-between text-[11px] font-mono text-[#5E7067]">
                <span>Deterministic State Graph</span>
                <a href="#ai-lab" className="text-[#5BAF82] hover:text-[#18352A] font-bold flex items-center gap-1">
                  Test In Lab →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
