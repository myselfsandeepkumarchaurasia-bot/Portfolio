import React, { useState } from 'react';
import { 
  GitFork, 
  Workflow, 
  Cpu, 
  Layers, 
  Database, 
  Cloud, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  category: 'core' | 'ml' | 'genai' | 'backend' | 'cloud' | 'iot';
  whatItIs: string;
  howSandeepUsedIt: string;
  relatedProjects: string[];
  relatedSkills: string[];
}

export const TechGraph: React.FC = () => {
  const nodes: TechNode[] = [
    {
      id: 'python',
      name: 'Python (Ecosystem Anchor)',
      category: 'core',
      whatItIs: 'Primary programming language for modern AI, Generative AI agent workflows, and data pipelines.',
      howSandeepUsedIt: 'Served as the core language for all AI services at Aptus IT Solution, writing custom RAG chunking algorithms, LangGraph nodes, Scikit-learn churn models, and REST APIs.',
      relatedProjects: ['Local RAG PDF Chat', 'AI Agent for Document Intelligence', 'Customer Churn Prediction'],
      relatedSkills: ['LangChain', 'FastAPI', 'Pandas', 'Scikit-learn', 'PyTorch'],
    },
    {
      id: 'langchain',
      name: 'LangChain',
      category: 'genai',
      whatItIs: 'Framework designed to simplify the creation of applications using large language models (LLMs).',
      howSandeepUsedIt: 'Implemented document loaders, recursive text splitters, vector store retrievers, and prompt templates for local and cloud RAG pipelines.',
      relatedProjects: ['Local RAG PDF Chat Application', 'Doc Intel Agent'],
      relatedSkills: ['ChromaDB', 'Ollama', 'Hugging Face', 'Prompt Engineering'],
    },
    {
      id: 'langgraph',
      name: 'LangGraph',
      category: 'genai',
      whatItIs: 'Cyclic state-machine framework for building agentic and multi-agent workflows with human-in-the-loop controls.',
      howSandeepUsedIt: 'Architected the autonomous Document Intelligence Agent with cyclic feedback loops, tool selection nodes (math, vector search), and Pydantic response validators.',
      relatedProjects: ['AI Agent for Document Intelligence'],
      relatedSkills: ['LangChain', 'Agentic AI', 'Tool Calling', 'FastAPI'],
    },
    {
      id: 'rag',
      name: 'RAG (Retrieval-Augmented Generation)',
      category: 'genai',
      whatItIs: 'Architectural pattern combining external knowledge retrieval with LLM generation to prevent hallucinations and ground answers.',
      howSandeepUsedIt: 'Built enterprise-grade semantic search with hybrid indexing, chunk overlap tuning, citation tracking, and sub-second local inference.',
      relatedProjects: ['Local RAG PDF Chat', 'Enterprise Knowledge Search'],
      relatedSkills: ['ChromaDB', 'FAISS', 'Embeddings', 'Ollama'],
    },
    {
      id: 'ollama',
      name: 'Ollama & Local LLMs',
      category: 'genai',
      whatItIs: 'Tool for running open-source large language models (Llama 3, Mistral, Qwen) locally on CPU/GPU hardware.',
      howSandeepUsedIt: 'Deployed privacy-preserving offline inference for sensitive organizational documents without external API costs or cloud data transmission.',
      relatedProjects: ['Local RAG PDF Chat Application'],
      relatedSkills: ['Hugging Face', 'Quantization', 'Prompt Engineering'],
    },
    {
      id: 'scikit-learn',
      name: 'Scikit-learn',
      category: 'ml',
      whatItIs: 'Fundamental Python library for classical machine learning algorithms, model evaluation, and preprocessing.',
      howSandeepUsedIt: 'Trained, tuned, and evaluated customer churn classification models (Random Forest, Logistic Regression) with SMOTE balancing and ROC-AUC analysis.',
      relatedProjects: ['Customer Churn Prediction Engine'],
      relatedSkills: ['Python', 'Pandas', 'NumPy', 'Feature Engineering'],
    },
    {
      id: 'pandas-numpy',
      name: 'Pandas & NumPy',
      category: 'ml',
      whatItIs: 'Foundational data analysis and array computing libraries for high-throughput data manipulation.',
      howSandeepUsedIt: 'Engineered feature pipelines, automated data cleaning routines, and aggregated telemetry datasets at Zen Solutions and Aptus IT Solution.',
      relatedProjects: ['Customer Churn Prediction', 'HR Attrition Analytics'],
      relatedSkills: ['Python', 'SQL', 'EDA', 'Data Modeling'],
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'backend',
      whatItIs: 'Modern, high-performance web framework for building REST APIs with Python based on standard type hints.',
      howSandeepUsedIt: 'Constructed asynchronous microservices exposing model inference, RAG question-answering endpoints, and agent traces with automatic OpenAPI docs.',
      relatedProjects: ['AI Backend Microservices', 'RAG API'],
      relatedSkills: ['Python', 'Pydantic', 'Docker', 'AWS EC2'],
    },
    {
      id: 'aws',
      name: 'AWS Cloud Services',
      category: 'cloud',
      whatItIs: 'Cloud infrastructure platform providing scalable compute (EC2), storage (S3), and managed relational databases (RDS).',
      howSandeepUsedIt: 'Provisioned EC2 virtual machines for hosting API services and model inference pipelines; configured S3 buckets for storing raw document artifacts and embeddings.',
      relatedProjects: ['Production Deployment Stack'],
      relatedSkills: ['Docker', 'Linux', 'FastAPI'],
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'cloud',
      whatItIs: 'Platform for containerizing applications to ensure seamless consistency between development and production environments.',
      howSandeepUsedIt: 'Created isolated multi-stage Docker containers packaging Python, ChromaDB, and backend dependencies for reproducible one-command deployment.',
      relatedProjects: ['Containerized AI Lab', 'Zen DevOps Deployments'],
      relatedSkills: ['Linux', 'Jenkins', 'CI/CD'],
    },
    {
      id: 'powerbi',
      name: 'Power BI & SQL',
      category: 'core',
      whatItIs: 'Enterprise business intelligence and relational query stack for transforming raw records into interactive dashboards.',
      howSandeepUsedIt: 'Created star schema analytical models, automated SQL extraction pipelines, and designed executive KPI reports tracking attrition and departmental performance.',
      relatedProjects: ['HR & Workforce Attrition Analytics'],
      relatedSkills: ['SQL', 'DAX', 'Power Query', 'Excel'],
    },
  ];

  const [selectedNode, setSelectedNode] = useState<TechNode>(nodes[0]);

  return (
    <section id="tech-graph" className="py-20 bg-[#EEF7F1]/30 border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Interactive Technology Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            How Technologies Connect Across Sandeep's Work
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            Click any node below to inspect how it anchors Sandeep's real-world engineering,
            which projects feature it, and its exact production implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Hierarchy Tree (7 Cols) */}
          <div className="lg:col-span-7 light-card p-6 bg-white border border-[#DCEBE1] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE1] text-xs font-mono text-[#5E7067]">
              <span className="font-semibold uppercase">EXPLORE NODE CONNECTIONS</span>
              <span className="text-[#5BAF82] font-semibold">Click a node to inspect</span>
            </div>

            {/* Tree Structure */}
            <div className="space-y-4 font-mono text-xs">
              {/* Python Anchor */}
              <div
                onClick={() => setSelectedNode(nodes.find((n) => n.id === 'python')!)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedNode.id === 'python'
                    ? 'bg-[#E8F8EE] border-[#7BCB9B] shadow-sm font-bold text-[#18352A]'
                    : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#18352A] hover:border-[#A8E6C1]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#5BAF82]" />
                  <span className="font-bold text-sm">Python (Primary Anchor)</span>
                </div>
                <span className="text-[11px] text-[#5BAF82] font-semibold">Core Language</span>
              </div>

              {/* Branch 1: Generative AI */}
              <div className="pl-6 border-l-2 border-[#7BCB9B]/40 space-y-2">
                <div className="text-[#18352A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#5BAF82]" />
                  ├── Generative AI & Agents
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {['langchain', 'langgraph', 'rag', 'ollama'].map((id) => {
                    const node = nodes.find((n) => n.id === id)!;
                    const isSelected = selectedNode.id === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-[#E8F8EE] border-[#7BCB9B] text-[#18352A] font-bold'
                            : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#A8E6C1]'
                        }`}
                      >
                        <div className="font-semibold truncate">{node.name.split(' ')[0]}</div>
                        <div className="text-[10px] text-[#5E7067]">GenAI</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 2: Machine Learning */}
              <div className="pl-6 border-l-2 border-[#7E9BE8]/40 space-y-2">
                <div className="text-[#18352A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#7E9BE8]" />
                  ├── Machine Learning & Data Science
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {['scikit-learn', 'pandas-numpy'].map((id) => {
                    const node = nodes.find((n) => n.id === id)!;
                    const isSelected = selectedNode.id === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-[#EEF7F1] border-[#7BCB9B] text-[#18352A] font-bold'
                            : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#A8E6C1]'
                        }`}
                      >
                        <div className="font-semibold truncate">{node.name}</div>
                        <div className="text-[10px] text-[#5E7067]">Predictive Modeling & EDA</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 3: Backend & Cloud */}
              <div className="pl-6 border-l-2 border-[#5BAF82]/30 space-y-2">
                <div className="text-[#18352A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-[#5BAF82]" />
                  ├── Backend, Cloud & Containers
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {['fastapi', 'aws', 'docker'].map((id) => {
                    const node = nodes.find((n) => n.id === id)!;
                    const isSelected = selectedNode.id === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-[#E8F8EE] border-[#7BCB9B] text-[#18352A] font-bold'
                            : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#A8E6C1]'
                        }`}
                      >
                        <div className="font-semibold truncate">{node.name.split(' ')[0]}</div>
                        <div className="text-[10px] text-[#5E7067]">Infra</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 4: Data Analytics */}
              <div className="pl-6 border-l-2 border-[#7BCB9B]/40 space-y-2">
                <div className="text-[#18352A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#5BAF82]" />
                  └── Enterprise BI & SQL Pipelines
                </div>
                <div className="pt-1">
                  {['powerbi'].map((id) => {
                    const node = nodes.find((n) => n.id === id)!;
                    const isSelected = selectedNode.id === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedNode(node)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-[#E8F8EE] border-[#7BCB9B] text-[#18352A] font-bold'
                            : 'bg-[#F7FBF8] border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A] hover:border-[#A8E6C1]'
                        }`}
                      >
                        <div className="font-semibold">{node.name}</div>
                        <div className="text-[10px] text-[#5E7067]">Star Schemas, DAX, KPI Modeling</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Node Inspector Card (5 Cols) */}
          <div className="lg:col-span-5 light-card p-6 bg-white border border-[#DCEBE1] shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEBE1]">
              <span className="text-xs font-mono text-[#5BAF82] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Node Inspector
              </span>
              <span className="text-xs font-mono text-[#5E7067]">ID: {selectedNode.id}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#18352A] mb-1.5">{selectedNode.name}</h3>
              <p className="text-xs text-[#5E7067] leading-relaxed">{selectedNode.whatItIs}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1.5">
              <div className="text-xs font-mono text-[#18352A] font-bold uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5BAF82]" />
                How Sandeep Used It in Production:
              </div>
              <p className="text-xs text-[#18352A] leading-relaxed">{selectedNode.howSandeepUsedIt}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-[#5E7067] uppercase font-semibold">
                Featured Production Projects:
              </div>
              <div className="space-y-1">
                {selectedNode.relatedProjects.map((p, i) => (
                  <div key={i} className="text-xs text-[#18352A] font-mono flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-[#5BAF82]" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#DCEBE1] space-y-1">
              <div className="text-[11px] font-mono text-[#5E7067] uppercase font-semibold">
                Associated Stack Nodes:
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.relatedSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#EEF7F1] border border-[#DCEBE1] text-[11px] font-mono text-[#18352A]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
