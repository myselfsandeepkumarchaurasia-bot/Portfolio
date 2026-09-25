import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Code2, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';

export const LearnWithSandeep: React.FC = () => {
  const [topic, setTopic] = useState('RAG');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Interview Level'>('Intermediate');
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    'Python',
    'SQL',
    'Machine Learning',
    'Generative AI',
    'RAG',
    'LangChain',
    'LangGraph',
    'Power BI',
  ];

  const lessons: Record<string, Record<string, { explanation: string; code: string; question: string; answer: string }>> = {
    RAG: {
      Beginner: {
        explanation: 'Retrieval-Augmented Generation (RAG) grounds Large Language Models on private documents by retrieving relevant paragraphs first, then feeding them into the prompt as verified context.',
        code: `# Basic RAG Workflow Concept
query = "What were our Q3 sales figures?"
relevant_chunks = vector_db.search(query, top_k=3)
prompt = f"Using ONLY this context: {relevant_chunks}\\nAnswer: {query}"
response = llm.generate(prompt)`,
        question: 'What is the primary benefit of RAG over fine-tuning for internal documents?',
        answer: 'RAG provides immediate updates without retraining models, eliminates hallucinations through exact citations, and protects confidential document boundaries.',
      },
      Intermediate: {
        explanation: 'Semantic chunking with overlapping windows prevents factual cutoff at chunk borders, while dense vector embeddings (like all-MiniLM-L6-v2) capture contextual meaning over simple keyword matching.',
        code: `from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=100,
    separators=["\\n\\n", "\\n", " ", ""]
)
chunks = splitter.split_text(raw_document)`,
        question: 'Why is chunk overlap essential in high-dimensional vector retrieval?',
        answer: 'Chunk overlap ensures that sentences or facts spanning boundary transitions are not bifurcated, allowing the nearest neighbor search to preserve complete semantic phrases.',
      },
      'Interview Level': {
        explanation: 'Production RAG systems require hybrid retrieval (combining BM25 lexical search with dense vector HNSW search), semantic re-ranking with cross-encoders, and threshold gating to reject ungrounded queries.',
        code: `# Production Hybrid Retriever Pattern
dense_results = chroma_db.similarity_search(query, k=10)
sparse_results = bm25_retriever.get_relevant_documents(query)
merged_candidates = reciprocal_rank_fusion(dense_results, sparse_results)
top_reranked = cross_encoder.predict(query, merged_candidates)[:3]`,
        question: 'How do you handle queries where no retrieved chunk meets the confidence threshold?',
        answer: 'Implement deterministic gating: If the cosine similarity score of top chunks is below threshold (e.g. 0.70), return an explicit fallback ("No verified information available") to prevent model hallucination.',
      },
    },
    LangGraph: {
      Beginner: {
        explanation: 'LangGraph is a library for building stateful, multi-actor applications with LLMs using graph structures with nodes (actions) and edges (transitions).',
        code: `from langgraph.graph import StateGraph, START, END

builder = StateGraph(dict)
builder.add_node("agent", call_model)
builder.add_edge(START, "agent")
builder.add_edge("agent", END)`,
        question: 'What is the core difference between a graph and a linear chain?',
        answer: 'Graphs support cyclic loops, state persistence across multiple steps, and dynamic branching based on intermediate tool outputs.',
      },
      Intermediate: {
        explanation: 'LangGraph uses conditional edges to route execution between planning, tool invocation, and reflection nodes based on Pydantic output schemas.',
        code: `def router(state):
    if state.get("tool_needed"):
        return "tools"
    return "validator"

builder.add_conditional_edges("planner", router)`,
        question: 'Why are conditional edges crucial in agentic architectures?',
        answer: 'They allow the system to decide dynamically whether further information is needed, routing to a calculator, search engine, or validation node autonomously.',
      },
      'Interview Level': {
        explanation: 'In mission-critical agent workflows, LangGraph provides durable execution with checkpoints, allowing human-in-the-loop approvals and deterministic rollback upon tool errors.',
        code: `# Checkpointing & State Persistence
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
app = builder.compile(checkpointer=memory, interrupt_before=["execute_action"])`,
        question: 'How do you prevent infinite loops when an agent repeatedly fails a tool execution step?',
        answer: 'Configure a maximum retry counter in the graph state; when step_count > max_steps, trigger a deterministic fallback branch to human escalation.',
      },
    },
    Python: {
      Beginner: {
        explanation: 'Python is the de-facto language for AI and Data Science due to its clean syntax and comprehensive ecosystem (NumPy, Pandas, PyTorch).',
        code: `# Clean List Comprehension & Dict Filtering
records = [{"name": "A", "churn_risk": 0.8}, {"name": "B", "churn_risk": 0.2}]
high_risk = [r["name"] for r in records if r["churn_risk"] > 0.5]
print(high_risk) # ['A']`,
        question: 'What is the difference between a list and a tuple in Python?',
        answer: 'Lists are mutable (elements can be changed or appended), while tuples are immutable and hashable.',
      },
      Intermediate: {
        explanation: 'Generators and vectorized operations (via NumPy/Pandas) allow processing massive datasets without exhausting memory.',
        code: `import numpy as np

# Vectorized operation: 100x faster than for-loops
tenures = np.array([12, 24, 36, 48])
discounted_spend = np.where(tenures > 24, 800, 1000)`,
        question: 'How does NumPy achieve orders of magnitude faster execution than native Python lists?',
        answer: 'NumPy arrays use contiguous memory buffers and pre-compiled C-level vector SIMD instructions without Python dynamic typing overhead.',
      },
      'Interview Level': {
        explanation: 'Decorators, context managers, and async concurrency (asyncio in FastAPI) are required to build high-throughput AI API services.',
        code: `from functools import wraps
import time

def track_latency(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"{func.__name__} executed in {duration:.3f}s")
        return result
    return wrapper`,
        question: 'Why should CPU-bound tasks (like model inference) not be run directly inside the main asyncio event loop in FastAPI?',
        answer: 'CPU-bound tasks block the event loop, starving other concurrent asynchronous I/O requests. They should be offloaded to worker threads or Celery queues.',
      },
    },
  };

  const currentLesson =
    lessons[topic]?.[level] ||
    lessons.RAG[level];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#5BAF82]" />
            <span>Learn With Sandeep AI (Mentorship & Concepts)</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Drawing upon Sandeep's 4+ years of technical training experience across AI, Python, ML, and Data Analytics.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[#5BAF82]" />
          <span>4+ Years Technical Trainer</span>
        </span>
      </div>

      {/* Topic & Level Selectors */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTopic(t);
                setShowAnswer(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                topic === t
                  ? 'bg-[#7BCB9B] text-[#18352A] font-semibold shadow-sm'
                  : 'bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#5E7067] font-semibold uppercase">Level:</span>
          {(['Beginner', 'Intermediate', 'Interview Level'] as const).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLevel(l);
                setShowAnswer(false);
              }}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                level === l
                  ? 'bg-[#18352A] text-white font-semibold'
                  : 'bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Content Box */}
      <div className="light-card p-6 bg-white border border-[#DCEBE1] space-y-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-[#5E7067] pb-2 border-b border-[#DCEBE1]">
          <span className="font-bold text-[#5BAF82] uppercase">
            {topic} • {level} Concept Module
          </span>
          <span>Curated by Sandeep Kumar Chaurasiya</span>
        </div>

        {/* Explanation */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase font-bold text-[#18352A]">
            Core Concept & Architectural Intuition:
          </h4>
          <p className="text-xs sm:text-sm text-[#18352A] leading-relaxed">
            {currentLesson.explanation}
          </p>
        </div>

        {/* Code Snippet */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase font-bold text-[#18352A] flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#5BAF82]" />
            <span>Code Pattern & Production Implementation:</span>
          </h4>
          <pre className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] overflow-x-auto leading-relaxed">
            {currentLesson.code}
          </pre>
        </div>

        {/* Practice Question */}
        <div className="p-4 rounded-xl bg-[#EEF7F1] border border-[#DCEBE1] space-y-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-[#5BAF82] font-bold uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>Interview Practice Challenge:</span>
          </div>
          <p className="text-xs font-sans text-[#18352A] font-medium leading-relaxed">
            "{currentLesson.question}"
          </p>

          <div>
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#DCEBE1] text-[#5BAF82] hover:text-[#18352A] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Reveal Concept Solution</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-white border border-[#DCEBE1] text-[#18352A] text-xs font-sans leading-relaxed animate-in fade-in-0">
                <span className="font-bold text-[#5BAF82] font-mono block mb-1">Trainer's Breakdown:</span>
                {currentLesson.answer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
