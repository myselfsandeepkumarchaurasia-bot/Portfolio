import React, { useState } from 'react';
import { 
  Lightbulb, 
  Target, 
  Workflow, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  Rocket, 
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HowIThink: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Problem Definition',
      icon: Target,
      principle: 'Start from business value, not model hype.',
      detail: 'Identify whether the challenge genuinely requires generative AI, classical machine learning, or simple deterministic rule systems. Avoid over-engineering when straightforward analytics suffices.',
    },
    {
      id: 2,
      title: 'Requirements & Constraints',
      icon: Lightbulb,
      principle: 'Establish privacy, latency, and budget boundaries.',
      detail: 'Define data confidentiality requirements (e.g., air-gapped local inference vs cloud APIs), acceptable inference latencies (<500ms for conversational UI), and hosting cost limits before writing code.',
    },
    {
      id: 3,
      title: 'System Architecture',
      icon: Workflow,
      principle: 'Design verifiable data flows before prompting.',
      detail: 'Map data ingestion, text preprocessing, chunking window geometries, embedding indices, state transitions, and downstream database checkpoints with explicit failure handling.',
    },
    {
      id: 4,
      title: 'Technology Selection',
      icon: Cpu,
      principle: 'Pick tools based on problem fit, not popularity.',
      detail: 'Select LLM backends (Ollama for on-premises confidentiality, Gemini for fast reasoning), vector stores (ChromaDB for lightweight local speed, pgvector for unified SQL), and orchestrators (LangGraph for cyclic agents).',
    },
    {
      id: 5,
      title: 'Modular Implementation',
      icon: Code2,
      principle: 'Enforce strict schema validation and typing.',
      detail: 'Implement endpoints using FastAPI and Pydantic schemas. Separate retrieval logic from generation to guarantee reproducible unit testing and deterministic error responses.',
    },
    {
      id: 6,
      title: 'Grounded Evaluation',
      icon: CheckCircle2,
      principle: 'Zero tolerance for unverified hallucinations.',
      detail: 'Benchmark retrieval context precision, answer relevance, and cite exact page excerpts. On ML classification, optimize precision/recall trade-offs over misleading overall accuracy.',
    },
    {
      id: 7,
      title: 'Containerized Deployment',
      icon: Rocket,
      principle: 'Reproducible builds from local dev to cloud.',
      detail: 'Package services inside multi-stage Docker containers on AWS EC2/S3. Ensure environment variables and secrets remain strictly segregated from client-side bundles.',
    },
    {
      id: 8,
      title: 'Telemetry & Monitoring',
      icon: Activity,
      principle: 'Continuous visibility into latency, drift, and errors.',
      detail: 'Monitor inference durations, token consumption rates, API status endpoints, and user feedback signals to catch model drift and semantic edge cases.',
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="methodology" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Engineering Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            How I Think About AI Systems
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            Treating Artificial Intelligence as disciplined software engineering with clear stages,
            verifiable evaluation, and deterministic guardrails.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border text-center font-mono transition-all flex flex-col items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#E8F8EE] border-[#7BCB9B] shadow-md shadow-[#7BCB9B]/20 text-[#18352A]'
                    : 'bg-white border-[#DCEBE1] text-[#5E7067] hover:border-[#A8E6C1] hover:text-[#18352A]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#7BCB9B] text-white' : 'bg-[#F7FBF8] text-[#5E7067]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-[10px] text-[#5E7067]">0{step.id}</div>
                <div className="text-[11px] font-semibold truncate w-full">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Inspector Card */}
        <div className="light-card p-6 sm:p-8 bg-white border border-[#DCEBE1] shadow-xl space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#DCEBE1] gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#E8F8EE] text-[#5BAF82] font-bold font-mono text-xs flex items-center justify-center border border-[#A8E6C1]">
                0{steps[activeStep].id}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#18352A]">
                  Stage {steps[activeStep].id}: {steps[activeStep].title}
                </h3>
                <div className="text-xs font-mono text-[#5BAF82] font-semibold">
                  Core Principle: "{steps[activeStep].principle}"
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                className="px-3 py-1 rounded bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#5E7067] hover:text-[#18352A]"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                className="px-3 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-xs font-mono text-[#18352A] font-semibold hover:bg-[#A8E6C1]/40"
              >
                Next Stage →
              </button>
            </div>
          </div>

          <p className="text-sm text-[#18352A] leading-relaxed">
            {steps[activeStep].detail}
          </p>
        </div>
      </div>
    </section>
  );
};
