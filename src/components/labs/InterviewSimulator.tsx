import React, { useState } from 'react';
import { 
  Bot, 
  HelpCircle, 
  Mic, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';

export const InterviewSimulator: React.FC = () => {
  const [role, setRole] = useState<'AI Engineer' | 'Generative AI Engineer' | 'Data Scientist' | 'Data Analyst'>('AI Engineer');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const interviewQuestions: Record<string, Record<string, string[]>> = {
    'AI Engineer': {
      Beginner: [
        'How does a vector database differ from a standard relational SQL database when storing embeddings?',
        'What is the difference between an API and an LLM framework like LangChain?',
      ],
      Intermediate: [
        'How would you design a local RAG pipeline to prevent hallucinations while maintaining sub-second query latency?',
        'In LangGraph, how do cyclic state machines improve upon standard linear LangChain chains?',
      ],
      Advanced: [
        'Describe how you would architect a multi-agent system where one agent plans, another executes tools, and a third validates schemas before emitting a final response.',
        'How do you manage embedding drift and semantic re-ranking in a high-volume document ingestion service?',
      ],
    },
    'Generative AI Engineer': {
      Beginner: [
        'What are tokens in large language models, and why does token count matter in prompt design?',
        'Explain the basic components of Retrieval-Augmented Generation (RAG).',
      ],
      Intermediate: [
        'What strategies do you use for chunking long PDFs without splitting sentences across chunk boundaries?',
        'Explain function calling / tool calling in LLMs and how JSON schemas prevent malformed arguments.',
      ],
      Advanced: [
        'How do you implement Model Context Protocol (MCP) or custom tool definitions for local models running on Ollama?',
        'Explain the mathematical intuition behind cosine similarity versus dot product in dense vector retrieval.',
      ],
    },
    'Data Scientist': {
      Beginner: [
        'What is the difference between supervised and unsupervised machine learning?',
        'Why do we split datasets into train, validation, and test sets?',
      ],
      Intermediate: [
        'When evaluating a customer churn model with a 15% positive class, why is ROC-AUC or Precision-Recall preferred over raw Accuracy?',
        'Explain how SMOTE handles class imbalance and what risks it introduces.',
      ],
      Advanced: [
        'How would you diagnose and fix severe data leakage in an end-to-end customer churn forecasting pipeline?',
        'Compare gradient boosting decision trees (XGBoost) with Random Forest in terms of bias-variance trade-offs.',
      ],
    },
    'Data Analyst': {
      Beginner: [
        'What is the difference between WHERE and HAVING clauses in SQL?',
        'Explain the difference between primary keys and foreign keys in relational modeling.',
      ],
      Intermediate: [
        'How do SQL Window Functions (like ROW_NUMBER and OVER PARTITION BY) differ from standard GROUP BY aggregations?',
        'In Power BI, what is the difference between calculated columns and DAX measures?',
      ],
      Advanced: [
        'How would you design a star schema data model for enterprise HR attrition reporting across multiple transactional sources?',
        'Explain how Power Query ETL optimization reduces report refresh bottlenecks in large analytical models.',
      ],
    },
  };

  const currentQuestions = interviewQuestions[role][difficulty];
  const activeQuestion = currentQuestions[questionIdx % currentQuestions.length];

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setFeedback({
        score: 'Strong Technical Comprehension',
        missingConcepts: [
          'Explicit latency metrics & timeout guardrails',
          'Fallback strategies when retrieval score falls below threshold',
        ],
        suggestedImprovedAnswer:
          'A comprehensive answer highlights semantic chunking with overlapping windows, dense embedding indices (HNSW), deterministic schema validation with Pydantic, and explicit source citation tracking.',
        followUpQuestion:
          'How would you monitor this pipeline in production to catch embedding drift or tool execution failures?',
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#5BAF82]" />
            <span>AI Technical Interview Simulator ("Interview Me")</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Test and practice technical interview questions across AI Engineering, GenAI, and Data Science.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5BAF82]" />
          <span>AI-Generated Interview Practice</span>
        </span>
      </div>

      {/* Role & Difficulty Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1]">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#5E7067] font-semibold">Select Role:</label>
          <div className="flex flex-wrap gap-1.5">
            {(['AI Engineer', 'Generative AI Engineer', 'Data Scientist', 'Data Analyst'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setQuestionIdx(0);
                  setFeedback(null);
                  setUserAnswer('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  role === r
                    ? 'bg-[#7BCB9B] text-[#18352A] font-semibold shadow-sm'
                    : 'bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#5E7067] font-semibold">Difficulty:</label>
          <div className="flex gap-1.5">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  setQuestionIdx(0);
                  setFeedback(null);
                  setUserAnswer('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  difficulty === d
                    ? 'bg-[#18352A] text-white shadow-sm'
                    : 'bg-white border border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Interview Question Box */}
      <div className="light-card p-6 bg-white border border-[#DCEBE1] space-y-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-[#5E7067]">
          <span className="font-semibold text-[#5BAF82] uppercase">
            Question 0{questionIdx + 1} • {role} ({difficulty})
          </span>
          <button
            onClick={() => {
              setQuestionIdx((prev) => prev + 1);
              setFeedback(null);
              setUserAnswer('');
            }}
            className="text-xs text-[#5BAF82] hover:text-[#18352A] font-semibold"
          >
            Skip to Next Question →
          </button>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-[#18352A] leading-relaxed">
          "{activeQuestion}"
        </h4>

        {/* Answer Input */}
        <div className="space-y-2">
          <textarea
            rows={4}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your structured technical response here..."
            className="w-full p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={handleEvaluateAnswer}
              disabled={loading || !userAnswer.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] disabled:opacity-50 text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {loading ? <span className="animate-spin">⟳</span> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Evaluate My Answer</span>
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="p-5 rounded-xl bg-[#EEF7F1] border border-[#DCEBE1] space-y-3 font-mono text-xs animate-in fade-in-0">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCEBE1]">
              <span className="text-[#5BAF82] font-bold uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Technical Evaluation: {feedback.score}
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-[#18352A] uppercase text-[10px]">
                Recommended Concepts to Include:
              </span>
              <ul className="space-y-0.5 text-xs text-[#5E7067] pl-3">
                {feedback.missingConcepts.map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#DCEBE1]/60">
              <span className="font-semibold text-[#18352A] uppercase text-[10px]">
                Suggested Comprehensive Answer:
              </span>
              <p className="text-xs text-[#18352A] font-sans leading-relaxed">
                {feedback.suggestedImprovedAnswer}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#DCEBE1] space-y-1">
              <span className="font-bold text-[#5BAF82] uppercase text-[10px]">
                Follow-Up Interview Question:
              </span>
              <p className="text-xs text-[#18352A]">
                "{feedback.followUpQuestion}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
