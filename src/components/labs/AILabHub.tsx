import React, { useState } from 'react';
import { 
  Bot, 
  Layers, 
  Workflow, 
  Mic, 
  Database, 
  Terminal, 
  TrendingUp, 
  BarChart3, 
  FileCheck, 
  HelpCircle,
  Sparkles,
  FlaskConical,
  Code2,
  GraduationCap,
  Server
} from 'lucide-react';
import { ChatbotLab } from './ChatbotLab';
import { RAGLab } from './RAGLab';
import { AgentLab } from './AgentLab';
import { VoiceLab } from './VoiceLab';
import { SQLLab } from './SQLLab';
import { PythonLab } from './PythonLab';
import { MLPlayground } from './MLPlayground';
import { AnalyticsLab } from './AnalyticsLab';
import { ResumeAnalyzer } from './ResumeAnalyzer';
import { SkillAssessment } from './SkillAssessment';
import { InterviewSimulator } from './InterviewSimulator';
import { ResumeToJDAnalyzer } from './ResumeToJDAnalyzer';
import { CodeReviewer } from './CodeReviewer';
import { LearnWithSandeep } from './LearnWithSandeep';
import { ApiPlayground } from './ApiPlayground';

interface AILabHubProps {
  initialTab?: string;
}

export const AILabHub: React.FC<AILabHubProps> = ({ initialTab = 'chat' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'chat', label: 'AI & Voice Assistant (Chat + Voice)', icon: Bot, highlight: true },
    { id: 'rag', label: 'Document RAG Lab', icon: Layers },
    { id: 'agent', label: 'Agentic AI', icon: Workflow },
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
    { id: 'interview', label: 'Interview Simulator', icon: HelpCircle },
    { id: 'jd_match', label: 'Resume-to-JD Demo', icon: FileCheck },
    { id: 'review', label: 'AI Code Review', icon: Code2 },
    { id: 'learn', label: 'Learn With Sandeep', icon: GraduationCap },
    { id: 'sql', label: 'SQL Query Lab', icon: Database },
    { id: 'python', label: 'Python Sandbox', icon: Terminal },
    { id: 'ml', label: 'ML Benchmarks', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'api', label: 'API Playground', icon: Server },
    { id: 'assessment', label: 'Skill Quiz', icon: HelpCircle },
  ];

  return (
    <section id="ai-lab" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      {/* Background soft mint accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#A8E6C1]/20 via-[#7BCB9B]/15 to-[#7E9BE8]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Interactive Engineering Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#18352A] tracking-tight">
            Sandeep AI Lab
          </h2>
          <p className="text-[#5BAF82] font-mono text-sm sm:text-base font-semibold">
            "Don't just read about my skills. Interact with them."
          </p>
          <p className="text-[#5E7067] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Test live RAG retrieval, inspect LangGraph agent traces, practice technical interview questions,
            review code with AI, execute analytical SQL, or test live FastAPI endpoints.
          </p>
        </div>

        {/* Tab Selection Bar (Scrollable segmented button bar) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EEF7F1] border border-[#DCEBE1] rounded-2xl max-w-full overflow-x-auto mb-8 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-[#18352A] border border-[#7BCB9B] shadow-sm font-bold'
                    : 'text-[#5E7067] hover:text-[#18352A] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#5BAF82]' : 'text-[#5E7067]'}`} />
                <span>{tab.label}</span>
                {tab.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BAF82] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Container */}
        <div className="light-card p-6 sm:p-8 bg-white border border-[#DCEBE1] shadow-xl rounded-2xl">
          {activeTab === 'chat' && <ChatbotLab />}
          {activeTab === 'rag' && <RAGLab />}
          {activeTab === 'agent' && <AgentLab />}
          {activeTab === 'voice' && <VoiceLab />}
          {activeTab === 'interview' && <InterviewSimulator />}
          {activeTab === 'jd_match' && <ResumeToJDAnalyzer />}
          {activeTab === 'review' && <CodeReviewer />}
          {activeTab === 'learn' && <LearnWithSandeep />}
          {activeTab === 'sql' && <SQLLab />}
          {activeTab === 'python' && <PythonLab />}
          {activeTab === 'ml' && <MLPlayground />}
          {activeTab === 'analytics' && <AnalyticsLab />}
          {activeTab === 'api' && <ApiPlayground />}
          {activeTab === 'assessment' && <SkillAssessment />}
        </div>
      </div>
    </section>
  );
};
