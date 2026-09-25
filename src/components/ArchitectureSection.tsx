import React, { useState } from 'react';
import { 
  Network, 
  Workflow, 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'agent' | 'production'>('rag');

  return (
    <section id="architecture" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>System Blueprints & Topologies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            Production AI & Cloud Architectures
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            Detailed engineering topologies demonstrating how data flows through ingestion, vectorization,
            stateful agent graphs, and scalable AWS cloud infrastructure.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="p-1 rounded-2xl bg-[#EEF7F1] border border-[#DCEBE1] flex flex-wrap gap-1 shadow-sm">
            <button
              onClick={() => setActiveTab('rag')}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 ${
                activeTab === 'rag'
                  ? 'bg-white text-[#18352A] border border-[#7BCB9B] shadow-sm font-bold'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>01. RAG Pipeline Topology</span>
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 ${
                activeTab === 'agent'
                  ? 'bg-white text-[#18352A] border border-[#7BCB9B] shadow-sm font-bold'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>02. LangGraph Agent Workflow</span>
            </button>
            <button
              onClick={() => setActiveTab('production')}
              className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-2 ${
                activeTab === 'production'
                  ? 'bg-white text-[#18352A] border border-[#7BCB9B] shadow-sm font-bold'
                  : 'text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>03. Production Cloud Infra</span>
            </button>
          </div>
        </div>

        {/* Diagram Card Container */}
        <div className="light-card p-6 sm:p-8 bg-white border border-[#DCEBE1] shadow-xl">
          {/* TAB 1: RAG Architecture */}
          {activeTab === 'rag' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCEBE1] gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
                    <span className="text-[#5BAF82] font-mono">RAG Pipeline:</span>
                    <span>Document Ingestion to Context Augmentation</span>
                  </h3>
                  <p className="text-xs text-[#5E7067] mt-0.5">
                    Deterministic text parsing, vector indexing with ChromaDB/FAISS, and low-latency synthesis.
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold">
                  Sub-500ms End-to-End
                </span>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 items-center text-center font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 01</div>
                  <div className="font-bold text-[#18352A]">Documents</div>
                  <div className="text-[10px] text-[#5E7067]">PDF, DOCX, TXT</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 02</div>
                  <div className="font-bold text-[#5BAF82]">Parser & OCR</div>
                  <div className="text-[10px] text-[#5E7067]">Tesseract OCR</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 03</div>
                  <div className="font-bold text-[#5BAF82]">Chunking</div>
                  <div className="text-[10px] text-[#5E7067]">Recursive Split</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 04</div>
                  <div className="font-bold text-[#7E9BE8]">Embeddings</div>
                  <div className="text-[10px] text-[#5E7067]">all-MiniLM-L6-v2</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 05</div>
                  <div className="font-bold text-[#5BAF82]">Vector Store</div>
                  <div className="text-[10px] text-[#5E7067]">ChromaDB / FAISS</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 06</div>
                  <div className="font-bold text-[#18352A]">Retriever</div>
                  <div className="text-[10px] text-[#5E7067]">Top-K Cosine</div>
                </div>
                <div className="hidden sm:flex justify-center text-[#5E7067]">→</div>

                <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="text-[10px] text-[#5E7067]">STAGE 07</div>
                  <div className="font-bold text-amber-700">LLM Synthesis</div>
                  <div className="text-[10px] text-[#5E7067]">Ollama / Gemini</div>
                </div>
              </div>

              {/* Technical Description Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#DCEBE1] text-xs text-[#18352A]">
                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="font-mono text-[#5BAF82] font-bold">Semantic Boundary Preservation</div>
                  <p className="text-[#5E7067]">
                    Avoids naive token splitting; retains paragraph coherence with 100-character rolling overlaps to guarantee uninterrupted factual sentences.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="font-mono text-[#7E9BE8] font-bold">Metadata & Citations</div>
                  <p className="text-[#5E7067]">
                    Every stored vector contains page index, section headers, and document hashes so that output generation always displays exact source citations.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
                  <div className="font-mono text-[#18352A] font-bold">Local Privacy Guarantee</div>
                  <p className="text-[#5E7067]">
                    Quantized Ollama models run 100% on-premises without transmitting tokens to external APIs, fulfilling enterprise confidentiality standards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LangGraph Agent Architecture */}
          {activeTab === 'agent' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCEBE1] gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
                    <span className="text-[#5BAF82] font-mono">LangGraph State Machine:</span>
                    <span>Cyclic Agentic Reasoning & Tool Dispatch</span>
                  </h3>
                  <p className="text-xs text-[#5E7067] mt-0.5">
                    Dynamic routing between Knowledge Search, Calculator, Database Inspector, and Schema Validator.
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold">
                  Cyclic State Graph
                </span>
              </div>

              {/* State Machine Visual */}
              <div className="p-5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] font-mono text-xs text-[#18352A] space-y-3">
                <div className="flex items-center gap-2 text-[#5BAF82] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5BAF82]" />
                  <span>START Node → Input Validation & State Setup</span>
                </div>
                <div className="pl-6 border-l-2 border-[#A8E6C1] space-y-3">
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCEBE1] text-[#18352A] font-semibold">
                    ↓ Planner Node (Goal Decomposition & Context Assembly)
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCEBE1] text-[#5BAF82] font-semibold">
                    ↓ Conditional Router Node (Selects specialized tool via JSON function calling)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white border border-[#DCEBE1] text-[#5E7067]">
                      • Knowledge Search (RAG)
                    </div>
                    <div className="p-2 rounded bg-white border border-[#DCEBE1] text-[#5E7067]">
                      • Python REPL Calculator
                    </div>
                    <div className="p-2 rounded bg-white border border-[#DCEBE1] text-[#5E7067]">
                      • SQL DB Inspector
                    </div>
                    <div className="p-2 rounded bg-white border border-[#DCEBE1] text-[#5E7067]">
                      • Web Search Tool
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCEBE1] text-[#18352A] font-semibold">
                    ↓ Validator Node (Pydantic Schema Verification & Hallucination Check)
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#E8F8EE] border border-[#7BCB9B] text-[#18352A] font-bold">
                    ↓ Final Synthesizer → Structured JSON / Grounded Answer
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Production Cloud Infrastructure */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCEBE1] gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
                    <span className="text-[#5BAF82] font-mono">Production Cloud Infra:</span>
                    <span>Scalable Microservices on AWS</span>
                  </h3>
                  <p className="text-xs text-[#5E7067] mt-0.5">
                    FastAPI backend, Docker orchestration, PostgreSQL, ChromaDB, and CI/CD automation.
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold">
                  Containerized & Monitored
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-2">
                  <div className="text-[#5BAF82] font-bold flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    <span>Application Layer</span>
                  </div>
                  <ul className="text-[#5E7067] space-y-1 text-[11px]">
                    <li>• React SPA / Vite Frontend</li>
                    <li>• FastAPI / Express REST Proxy</li>
                    <li>• Pydantic Request Validation</li>
                    <li>• Swagger OpenAPI Documentation</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-2">
                  <div className="text-[#7E9BE8] font-bold flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Data & Vector Storage</span>
                  </div>
                  <ul className="text-[#5E7067] space-y-1 text-[11px]">
                    <li>• ChromaDB Vector Store</li>
                    <li>• PostgreSQL / RDS Relational Data</li>
                    <li>• Redis Session & Cache Store</li>
                    <li>• S3 Object Store for Blobs & Models</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-2">
                  <div className="text-[#18352A] font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5BAF82]" />
                    <span>DevOps & Security</span>
                  </div>
                  <ul className="text-[#5E7067] space-y-1 text-[11px]">
                    <li>• Docker Multi-Stage Builds</li>
                    <li>• Jenkins / GitHub Actions CI/CD</li>
                    <li>• AWS EC2 Deployment</li>
                    <li>• Rate Limiting & Prompt Injection Guards</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
