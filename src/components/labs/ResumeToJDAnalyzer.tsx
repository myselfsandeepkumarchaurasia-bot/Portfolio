import React, { useState } from 'react';
import { 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  AlertCircle, 
  Info,
  ArrowRight
} from 'lucide-react';

export const ResumeToJDAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState(
    `Looking for an AI / Generative AI Engineer with 4+ years of experience.
Must have hands-on experience building production RAG systems with LangChain and vector databases like ChromaDB or FAISS.
Experience with Python, LangGraph for autonomous agents, Scikit-learn, and deploying REST APIs using FastAPI on AWS or Docker containers is required.`
  );

  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setAnalyzed(true);
  };

  const sampleResults = {
    stronglyRelevant: [
      { skill: 'RAG Architecture & Retrieval', evidence: 'Built Local RAG PDF Chat App with ChromaDB and custom semantic chunking' },
      { skill: 'LangChain & LangGraph', evidence: 'Engineered cyclic state-machine agent for document intelligence with tool calling' },
      { skill: 'Python (5+ Years IT Experience)', evidence: 'Used in ML classification, FastAPI microservices, and automation at Aptus IT Solution' },
      { skill: 'Vector Databases (ChromaDB / FAISS)', evidence: 'Implemented in enterprise document intelligence pipelines at Aptus IT Solution' },
      { skill: 'FastAPI Backend Development', evidence: 'Constructed asynchronous microservices exposing model inference with Pydantic schemas' },
      { skill: 'AWS Cloud Services (EC2, S3)', evidence: 'Provisioned cloud compute and S3 object storage for model artifacts' },
      { skill: 'Docker Containerization', evidence: 'Created multi-stage container builds for isolated deployments' },
    ],
    related: [
      { skill: 'CI/CD & DevOps Automation', evidence: 'DevOps support experience at Zen Software Solutions with Jenkins & Linux' },
      { skill: 'Machine Learning (Scikit-learn)', evidence: 'Delivered customer churn prediction engine with SMOTE class balancing' },
      { skill: 'Power BI & SQL Analytics', evidence: 'Built enterprise HR attrition dashboard suite with star-schema modeling' },
    ],
    notEvidenced: [
      'Kubernetes Cluster Orchestration',
      'Apache Spark Distributed Big Data',
      'Go / Rust Systems Programming',
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCEBE1]">
        <div>
          <h3 className="text-lg font-bold text-[#18352A] flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#5BAF82]" />
            <span>Job Description Alignment Analyzer ("Resume-to-JD Demo")</span>
          </h3>
          <p className="text-xs text-[#5E7067] mt-0.5">
            Paste any job description to evaluate verified technical overlap against Sandeep's portfolio records.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5BAF82]" />
          <span>Evidence-Based Alignment</span>
        </span>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
          Paste Target Job Description:
        </label>
        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste requirements for AI Engineer, GenAI Specialist, Data Scientist, or ML Lead role..."
          className="w-full p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] text-xs font-mono text-[#18352A] focus:outline-none focus:border-[#7BCB9B] leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            className="px-5 py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Alignment Against Sandeep's Profile</span>
          </button>
        </div>
      </div>

      {/* Analysis Output Categorization */}
      {analyzed && (
        <div className="space-y-4 animate-in fade-in-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Strongly Relevant */}
            <div className="p-4 rounded-xl bg-white border border-[#A8E6C1] space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#5BAF82] font-bold pb-2 border-b border-[#DCEBE1]">
                <CheckCircle2 className="w-4 h-4 text-[#5BAF82]" />
                <span className="uppercase text-[11px]">Strongly Relevant ({sampleResults.stronglyRelevant.length})</span>
              </div>
              <div className="space-y-2.5">
                {sampleResults.stronglyRelevant.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold text-[#18352A]">{item.skill}</div>
                    <div className="text-[11px] text-[#5E7067] leading-tight">
                      Evidence: {item.evidence}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Experience */}
            <div className="p-4 rounded-xl bg-white border border-[#DCEBE1] space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#7E9BE8] font-bold pb-2 border-b border-[#DCEBE1]">
                <Layers className="w-4 h-4 text-[#7E9BE8]" />
                <span className="uppercase text-[11px]">Related Capabilities ({sampleResults.related.length})</span>
              </div>
              <div className="space-y-2.5">
                {sampleResults.related.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold text-[#18352A]">{item.skill}</div>
                    <div className="text-[11px] text-[#5E7067] leading-tight">
                      Evidence: {item.evidence}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Not Evidenced */}
            <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-3">
              <div className="flex items-center gap-2 text-[#5E7067] font-bold pb-2 border-b border-[#DCEBE1]">
                <AlertCircle className="w-4 h-4 text-[#5E7067]" />
                <span className="uppercase text-[11px]">Not Evidenced in Records</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#5E7067]">
                {sampleResults.notEvidenced.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-[10px] text-[#5E7067] leading-relaxed border-t border-[#DCEBE1]">
                Truthfulness policy: Only competencies backed by verified work history and projects are claimed.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
