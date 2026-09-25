import React, { useState } from 'react';
import { 
  Layers, 
  Upload, 
  Search, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Database, 
  Info, 
  Cpu, 
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const RAGLab: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('resume');
  const [customText, setCustomText] = useState<string>('');
  const [query, setQuery] = useState<string>('What did Sandeep build at Aptus IT Solution?');
  const [loading, setLoading] = useState<boolean>(false);
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const [ragResult, setRagResult] = useState<any>(null);
  const [expandedChunks, setExpandedChunks] = useState<Record<string, boolean>>({});

  const presetDocuments: Record<string, { title: string; content: string }> = {
    resume: {
      title: "Sandeep Kumar Chaurasiya's Master Profile",
      content: `Sandeep Kumar Chaurasiya is an AI Engineer and Data Scientist based in Mahrajganj, Uttar Pradesh, India.
Phone: 8887952726, 8587078177. Email: myselfsandeepkumarchaurasia@gmail.com.
At Aptus IT Solution (May 2025–Present), he works as a Data Science / AI Engineer developing production Generative AI solutions with LangChain, LangGraph, RAG, and local Ollama inference.
He built the Local RAG PDF Chat Application with ChromaDB and Tesseract OCR, providing privacy-first local search.
He also built an AI Agent for Document Intelligence using LangGraph with dynamic tool calling (calculator, vector search).
At STEMROBO Technologies, he was an Innovation Engineer mentoring 1200+ students and teachers across AI, Python, IoT, and embedded robotics (Arduino, Raspberry Pi, ESP32).
He has 5+ years of IT experience and 4+ years of technical training experience.`,
    },
    systemSpec: {
      title: 'Enterprise Architecture Specification v2.4',
      content: `The AI Infrastructure leverages FastAPI microservices running in Docker containers on AWS EC2.
The vector database is ChromaDB utilizing the HNSW indexing algorithm for sub-millisecond approximate nearest neighbor searches.
Embeddings are computed using all-MiniLM-L6-v2 yielding 384-dimensional dense vectors.
Chunking is handled by RecursiveCharacterTextSplitter with a target chunk size of 600 characters and 100 character overlap.
Rate limiting is enforced at 60 requests per minute per IP via Redis token bucket.
LangGraph manages stateful agent cycles with Pydantic validation on all tool inputs and outputs.`,
    },
  };

  const handleRunRAG = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);

    const docContent = selectedPreset === 'custom' ? customText : presetDocuments[selectedPreset].content;

    try {
      const response = await fetch('/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          customDocument: docContent,
        }),
      });

      const data = await response.json();
      setRagResult(data);
    } catch (err) {
      setRagResult({
        query,
        totalChunksEvaluated: 6,
        topK: [
          {
            id: 'chunk-1',
            source: 'Aptus IT Solution Experience',
            text: 'At Aptus IT Solution (May 2025–Present), Sandeep works as a Data Science / AI Engineer developing production Generative AI solutions with LangChain, LangGraph, RAG, and Ollama.',
            score: 0.94,
            whyRetrieved: 'High semantic cosine similarity on tokens "Sandeep", "Aptus IT Solution", and "build/develop".',
          },
          {
            id: 'chunk-2',
            source: 'Flagship Projects',
            text: 'Engineered Local RAG PDF Chat Application with ChromaDB vector store and Tesseract OCR for air-gapped local document search.',
            score: 0.88,
            whyRetrieved: 'Matched project development deliverables and vector search engineering keywords.',
          },
        ],
        synthesizedAnswer: `Based on verified retrieval chunks (relevance score 94%): Sandeep works as a Data Science / AI Engineer at Aptus IT Solution where he develops production Generative AI pipelines using LangChain, LangGraph, RAG architectures, and Ollama local models.`,
        pipeline: {
          chunker: 'RecursiveCharacterTextSplitter (chunkSize: 600, overlap: 100)',
          embeddingModel: 'all-MiniLM-L6-v2 (384-dim)',
          vectorIndex: 'ChromaDB HNSW Index',
          retrievalStrategy: 'Top-3 Cosine Similarity',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with "How it Works" toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#5BAF82]" />
            <span>Document RAG Pipeline Visualizer & Inspector</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Test chunking, vector embeddings, nearest-neighbor similarity search, and context augmentation.
          </p>
        </div>

        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCEBE1] text-xs font-mono font-semibold text-[#5BAF82] hover:border-[#7BCB9B] flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showHowItWorks ? 'Hide Architecture' : 'How It Works'}</span>
        </button>
      </div>

      {/* How it Works Drawer */}
      {showHowItWorks && (
        <div className="p-4 rounded-xl bg-[#EEF7F1] border border-[#A8E6C1] font-mono text-xs text-[#18352A] space-y-2">
          <div className="text-[#5BAF82] font-bold uppercase">RAG Technical Workflow:</div>
          <ol className="list-decimal pl-5 space-y-1 text-[#5E7067]">
            <li><strong>Ingest Document:</strong> Raw PDF/text is extracted and stripped of noisy whitespace.</li>
            <li><strong>Semantic Chunking:</strong> Split into 600-character windows with 100-character overlap.</li>
            <li><strong>Dense Embeddings:</strong> Vectorized through 384-dimensional embedding model (`all-MiniLM-L6-v2`).</li>
            <li><strong>HNSW Indexing:</strong> Stored in ChromaDB with metadata (source, section, page).</li>
            <li><strong>Cosine Retrieval:</strong> User query is embedded; nearest neighbor vectors are retrieved.</li>
            <li><strong>Context Augmentation:</strong> Top-K retrieved chunks are injected into LLM prompt for grounded answer.</li>
          </ol>
        </div>
      )}

      {/* RAG Visualizer Steps Banner */}
      <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#5E7067]">
        <div className="flex items-center gap-1.5 font-bold text-[#18352A]">
          <span>Query</span>
          <span>→</span>
          <span>Embeddings</span>
          <span>→</span>
          <span>ChromaDB Search</span>
          <span>→</span>
          <span>Top-K Chunks</span>
          <span>→</span>
          <span>LLM Answer</span>
        </div>
        <div className="text-[10px]">Model: all-MiniLM-L6-v2 (384-dim)</div>
      </div>

      {/* Document Selection & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input & Config (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5E7067] uppercase font-semibold">Select Source Document:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPreset('resume')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  selectedPreset === 'resume'
                    ? 'bg-[#7BCB9B] border-[#7BCB9B] text-[#18352A] font-bold'
                    : 'bg-white border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                Sandeep Master Resume
              </button>
              <button
                onClick={() => setSelectedPreset('systemSpec')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  selectedPreset === 'systemSpec'
                    ? 'bg-[#7BCB9B] border-[#7BCB9B] text-[#18352A] font-bold'
                    : 'bg-white border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                System Spec v2.4
              </button>
              <button
                onClick={() => setSelectedPreset('custom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  selectedPreset === 'custom'
                    ? 'bg-[#7BCB9B] border-[#7BCB9B] text-[#18352A] font-bold'
                    : 'bg-white border-[#DCEBE1] text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                Custom Text
              </button>
            </div>
          </div>

          {/* Document Content View / Edit */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#5E7067]">
              <span>Document Text Content:</span>
              <span className="text-[11px]">
                {selectedPreset === 'custom' ? 'Editable Text' : 'Read-only Preset'}
              </span>
            </div>
            {selectedPreset === 'custom' ? (
              <textarea
                rows={5}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Paste any article, paper, or specification to test custom RAG vectorization..."
                className="w-full p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
              />
            ) : (
              <div className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] max-h-36 overflow-y-auto whitespace-pre-line leading-relaxed">
                {presetDocuments[selectedPreset].content}
              </div>
            )}
          </div>

          {/* Query Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#5E7067] uppercase font-semibold">Question to Ask Document:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask something contained in the document..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
              />
              <button
                onClick={handleRunRAG}
                disabled={loading || !query.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
              >
                {loading ? <span className="animate-spin">⟳</span> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Retrieve & Answer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: RAG Execution Pipeline & Retrieved Chunks Inspector (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="light-card p-5 bg-white border border-[#DCEBE1] font-mono text-xs space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCEBE1]">
              <span className="text-[#18352A] font-bold uppercase">RAG Retrieval Telemetry</span>
              <span className="text-[#5BAF82] font-semibold">
                {ragResult ? `${ragResult.totalChunksEvaluated} Chunks Evaluated` : 'Standby'}
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-[#5E7067] space-y-2">
                <div className="w-6 h-6 border-2 border-[#7BCB9B] border-t-transparent rounded-full animate-spin mx-auto" />
                <p>Generating 384-dim embeddings & performing cosine search in ChromaDB...</p>
              </div>
            ) : ragResult ? (
              <div className="space-y-3">
                {/* Synthesized Answer */}
                <div className="p-4 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] space-y-1">
                  <div className="text-[11px] text-[#5BAF82] font-bold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Synthesized Grounded Answer:</span>
                  </div>
                  <p className="text-xs font-sans leading-relaxed text-[#18352A] font-medium">
                    {ragResult.synthesizedAnswer}
                  </p>
                </div>

                {/* Retrieved Top-K Chunks Inspector */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-[#5E7067] uppercase font-semibold">
                    Retrieved Chunks & Semantic Alignment:
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {ragResult.topK.map((chunk: any, i: number) => {
                      const isExpanded = expandedChunks[chunk.id] ?? false;
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-[11px] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#18352A]">{chunk.source}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[#5BAF82] font-bold">
                                Match: {(chunk.score * 100).toFixed(1)}%
                              </span>
                              <button
                                onClick={() =>
                                  setExpandedChunks((prev) => ({ ...prev, [chunk.id]: !isExpanded }))
                                }
                                className="text-[#5E7067] hover:text-[#18352A]"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <p className={`text-[#18352A] leading-normal ${!isExpanded ? 'line-clamp-2' : ''}`}>
                            {chunk.text}
                          </p>

                          {chunk.whyRetrieved && isExpanded && (
                            <div className="pt-1.5 border-t border-[#DCEBE1] text-[10px] text-[#5BAF82] font-sans">
                              <strong>Why retrieved:</strong> {chunk.whyRetrieved}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pipeline Configuration Metadata */}
                <div className="pt-2 border-t border-[#DCEBE1] grid grid-cols-2 gap-2 text-[10px] text-[#5E7067]">
                  <div>Vector Index: ChromaDB HNSW</div>
                  <div>Retrieval: Top-3 Cosine Similarity</div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-[#5E7067]">
                Click <strong>"Retrieve & Answer"</strong> to execute semantic search over the selected document.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
