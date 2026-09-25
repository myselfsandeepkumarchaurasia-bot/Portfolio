import React from 'react';
import { X, Workflow, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectArchitectureModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenLab: (tabId: string) => void;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  project,
  onClose,
  onOpenLab,
}) => {
  if (!project) return null;

  const getLabTarget = (projectId: string) => {
    switch (projectId) {
      case 'local-rag-pdf-chat':
        return 'rag';
      case 'ai-agent-doc-intelligence':
        return 'agent';
      case 'customer-churn-prediction':
        return 'ml';
      case 'hr-workforce-analytics':
        return 'analytics';
      default:
        return 'chat';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-0">
      <div className="light-card rounded-2xl max-w-2xl w-full border border-[#DCEBE1] bg-white shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#DCEBE1]">
          <div>
            <span className="text-xs font-mono font-semibold text-[#5BAF82] uppercase">
              Architecture Blueprint • {project.category}
            </span>
            <h3 className="text-xl font-bold text-[#18352A] mt-1">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#5E7067] hover:text-[#18352A] hover:bg-[#EEF7F1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage-by-Stage Flow Diagram */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
            Stage-by-Stage Architecture Flow:
          </div>
          <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] font-mono text-xs text-[#18352A] leading-relaxed">
            {project.architecture}
          </div>
        </div>

        {/* Pipeline Components Grid */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
            Pipeline Stages & Dependencies:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {project.technicalDetails.pipeline.map((stage, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#EEF7F1]/60 border border-[#DCEBE1] flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-md bg-[#7BCB9B]/20 text-[#5BAF82] font-bold text-[10px] flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-[#18352A] font-medium">{stage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Models & Performance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#5E7067] font-semibold">
              Models & Frameworks:
            </span>
            <div className="font-medium text-[#18352A]">
              {project.technicalDetails.modelsUsed.join(', ')}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#DCEBE1] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#5E7067] font-semibold">
              Measured Performance:
            </span>
            <div className="font-mono text-[#5BAF82] font-bold">
              {project.technicalDetails.performanceMetric}
            </div>
          </div>
        </div>

        {/* Key Engineering Challenge Solved */}
        <div className="p-4 rounded-xl bg-[#EEF7F1] border border-[#A8E6C1] space-y-1">
          <div className="text-xs font-mono uppercase text-[#18352A] font-bold">
            Key Challenge Solved:
          </div>
          <p className="text-xs text-[#5E7067] leading-relaxed">
            {project.technicalDetails.keyChallenge}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#DCEBE1] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-[#DCEBE1] text-xs font-mono text-[#5E7067] hover:text-[#18352A]"
          >
            Close
          </button>
          <button
            onClick={() => {
              const target = getLabTarget(project.id);
              onClose();
              onOpenLab(target);
            }}
            className="px-4 py-2 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Launch Interactive Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
