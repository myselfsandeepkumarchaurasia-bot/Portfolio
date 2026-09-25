import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Terminal,
  RotateCcw
} from 'lucide-react';

export const CodeReviewer: React.FC = () => {
  const sampleCode = `def retrieve_and_answer(query, top_k=5):
    # Naive retrieval without similarity score filtering
    chunks = db.query(query, k=top_k)
    context = ""
    for c in chunks:
        context += c["text"] + "\\n"
    
    # Direct prompt without temperature control or validation
    prompt = f"Answer: {query} with context {context}"
    return llm.generate(prompt)`;

  const [code, setCode] = useState(sampleCode);
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRunReview = () => {
    if (!code.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setReview({
        qualityScore: 'B+ (Needs Optimization)',
        issues: [
          'Unbounded context string concatenation can easily exceed LLM token context limits.',
          'Missing threshold filtering on vector similarity scores, allowing irrelevant chunks to contaminate prompt.',
          'No Pydantic schema validation or hallucination check on the model generation output.',
        ],
        optimizations: [
          'Implement rolling token budget calculation with tiktoken or tokenizers before injecting context.',
          'Filter out chunks where cosine similarity is below a determined threshold (e.g. < 0.72).',
          'Use structured prompt templates with role segregation (system instruction vs retrieved context).',
        ],
        security: [
          'Ensure retrieved text is treated as untrusted user content to prevent indirect prompt injection.',
          'Add rate limiting and input length bounds on incoming queries.',
        ],
        suggestedCode: `def retrieve_and_answer(query: str, top_k: int = 3, threshold: float = 0.72) -> GroundedAnswer:
    chunks = vector_store.similarity_search_with_score(query, k=top_k)
    filtered_chunks = [c for c, score in chunks if score >= threshold]
    
    if not filtered_chunks:
        return GroundedAnswer(answer="No verified context found.", citations=[])
        
    context_str = "\\n\\n".join([f"[{c.metadata['source']}]: {c.page_content}" for c in filtered_chunks])
    return llm.invoke_with_schema(prompt=query, context=context_str, schema=GroundedAnswer)`,
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#5BAF82]" />
            <span>AI Code Reviewer ("AI Code Review")</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Evaluate Python and SQL snippets for performance bottlenecks, prompt injection risks, and MLOps best practices.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5BAF82]" />
          <span>Static Analysis & AI Review</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#5E7067]">
            <span>Code Input Console (Python / SQL):</span>
            <button
              onClick={() => {
                setCode(sampleCode);
                setReview(null);
              }}
              className="text-[#5BAF82] hover:text-[#18352A] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Load RAG Preset</span>
            </button>
          </div>

          <textarea
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] focus:outline-none focus:border-[#7BCB9B] leading-relaxed"
          />

          <button
            onClick={handleRunReview}
            disabled={loading || !code.trim()}
            className="w-full py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? <span className="animate-spin">⟳</span> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Run AI Code Review</span>
          </button>
        </div>

        {/* Output Review (6 Cols) */}
        <div className="lg:col-span-6 space-y-3 font-mono text-xs">
          {review ? (
            <div className="light-card p-5 bg-white border border-[#DCEBE1] space-y-4 shadow-sm animate-in fade-in-0">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCEBE1]">
                <span className="font-bold text-[#18352A] uppercase">Audit Summary</span>
                <span className="px-2.5 py-0.5 rounded bg-[#EEF7F1] border border-[#DCEBE1] text-[#5BAF82] font-bold">
                  {review.qualityScore}
                </span>
              </div>

              {/* Issues */}
              <div className="space-y-1">
                <div className="text-red-700 font-bold uppercase text-[10px] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Potential Issues:</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px] pl-3">
                  {review.issues.map((iss: string, i: number) => (
                    <li key={i}>• {iss}</li>
                  ))}
                </ul>
              </div>

              {/* Optimizations */}
              <div className="space-y-1 pt-2 border-t border-[#DCEBE1]/60">
                <div className="text-[#5BAF82] font-bold uppercase text-[10px] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Optimization Suggestions:</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px] pl-3">
                  {review.optimizations.map((opt: string, i: number) => (
                    <li key={i}>• {opt}</li>
                  ))}
                </ul>
              </div>

              {/* Security */}
              <div className="space-y-1 pt-2 border-t border-[#DCEBE1]/60">
                <div className="text-blue-700 font-bold uppercase text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security & Guardrails:</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px] pl-3">
                  {review.security.map((sec: string, i: number) => (
                    <li key={i}>• {sec}</li>
                  ))}
                </ul>
              </div>

              {/* Refactored Code */}
              <div className="space-y-1 pt-2 border-t border-[#DCEBE1]/60">
                <span className="text-[10px] uppercase font-bold text-[#18352A]">
                  Suggested Refactored Pattern:
                </span>
                <pre className="p-3 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[10px] text-[#18352A] overflow-x-auto">
                  {review.suggestedCode}
                </pre>
              </div>
            </div>
          ) : (
            <div className="light-card p-12 bg-white border border-[#DCEBE1] text-center text-[#5E7067] flex flex-col items-center justify-center h-[340px]">
              <Code2 className="w-8 h-8 text-[#A8E6C1] mb-2" />
              <span>Click "Run AI Code Review" to audit the code snippet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
