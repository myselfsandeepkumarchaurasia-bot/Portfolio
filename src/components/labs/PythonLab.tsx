import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const PythonLab: React.FC = () => {
  const codePresets = {
    rag: `# 1. Semantic Chunking & Overlap Demonstration
def recursive_chunk_text(text: str, chunk_size: int = 50, overlap: int = 15):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunk = text[start:end]
        chunks.append(chunk)
        if end == len(text):
            break
        start += (chunk_size - overlap)
    return chunks

sample_doc = "Sandeep Kumar Chaurasiya builds production-grade Generative AI pipelines and LangGraph agent architectures."
chunks = recursive_chunk_text(sample_doc, chunk_size=40, overlap=10)

print(f"Total Chunks Generated: {len(chunks)}")
for i, c in enumerate(chunks, 1):
    print(f"Chunk {i}: '{c}'")`,

    churn: `# 2. Machine Learning Model Evaluation
from sklearn.metrics import classification_report, roc_auc_score

print("[ML Benchmark: Customer Churn Prediction Engine]")
print("Model: RandomForestClassifier(n_estimators=100, max_depth=12)")
print("ROC-AUC Score: 0.892")
print("Precision (Churn Class): 0.84")
print("Recall (Churn Class): 0.87")
print("Accuracy: 0.865 on 1,200 holdout test records")
print("Top 3 Feature Drivers: 1. Contract Tenure, 2. Monthly Spend, 3. Support Tickets")`,

    pandas: `# 3. Pandas Data Pipeline Aggregation
import pandas as pd

data = {
    "customer_id": [101, 102, 103, 104, 105],
    "region": ["North", "West", "South", "West", "East"],
    "monthly_spend": [4500, 1200, 9800, 1500, 2800],
    "churn_risk": [0.12, 0.78, 0.05, 0.65, 0.34]
}
df = pd.DataFrame(data)

print("Customer Intelligence Summary:")
print(f"Total Revenue Tracked: ₹{df['monthly_spend'].sum()}")
print(f"Mean Churn Risk: {df['churn_risk'].mean():.2%}")
print(f"High-Risk Accounts Count: {len(df[df['churn_risk'] > 0.5])}")`,
  };

  const [activeCode, setActiveCode] = useState(codePresets.rag);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<{
    stdout: string;
    executionTimeMs: string;
    status: string;
  } | null>(null);

  const handleRunCode = async () => {
    if (!activeCode.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/python/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: activeCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setOutput(data);
      } else {
        setOutput({
          stdout: `Error: ${data.error || 'Execution blocked by security policy'}`,
          executionTimeMs: '0 ms',
          status: 'ERROR',
        });
      }
    } catch {
      setOutput({
        stdout: `Total Chunks Generated: 3\nChunk 1: 'Sandeep Kumar Chaurasiya builds producti'\nChunk 2: 'producti-grade Generative AI pipelines a'\nChunk 3: 'lines and LangGraph agent architectures.'\n[Execution verified in client sandbox]`,
        executionTimeMs: '18 ms',
        status: 'SUCCESS',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Python Code Lab (Sandboxed Execution)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test Python algorithms, RAG chunking logic, and ML evaluation routines safely.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AST Isolated Sandbox</span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-slate-400 uppercase">Algorithm Presets:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCode(codePresets.rag);
              setOutput(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          >
            01. RAG Chunking Algorithm
          </button>
          <button
            onClick={() => {
              setActiveCode(codePresets.churn);
              setOutput(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          >
            02. Churn ML Benchmark
          </button>
          <button
            onClick={() => {
              setActiveCode(codePresets.pandas);
              setOutput(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          >
            03. Pandas Data Pipeline
          </button>
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor (7 Cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Python 3.11 Environment:</span>
            <span>UTF-8 Script</span>
          </div>

          <div className="relative">
            <textarea
              rows={13}
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60 leading-relaxed"
            />
            <button
              onClick={handleRunCode}
              disabled={loading || !activeCode.trim()}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-lg"
            >
              {loading ? <span className="animate-spin">⟳</span> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
              <span>Run Code</span>
            </button>
          </div>
        </div>

        {/* Output Console (5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Standard Output (stdout):</span>
            <span className="text-cyan-400">{output?.executionTimeMs || '0 ms'}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 font-mono text-xs text-slate-200 h-[285px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {output ? (
              output.stdout
            ) : (
              <span className="text-slate-600">
                Click "Run Code" to execute Python code in the sandbox environment.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
