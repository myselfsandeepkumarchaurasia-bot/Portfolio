import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Workflow,
  Info
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { ProjectArchitectureModal } from './ProjectArchitectureModal';

interface ProjectsProps {
  onOpenLab: (labTabId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenLab }) => {
  const [selectedArchProject, setSelectedArchProject] = useState<ProjectItem | null>(null);

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
    <section id="projects" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Production Project Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            Flagship Engineering & AI Deployments
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            Each project features a complete problem-solution architecture, reproducible code repository,
            and an interactive demonstration directly runnable inside the AI Lab.
          </p>
        </div>

        {/* 4 Flagship Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="light-card light-card-hover p-6 sm:p-7 bg-white flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Category & Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5BAF82] font-bold">{project.category}</span>
                  <span className="text-[#5E7067] font-semibold text-[10px] uppercase">Production Deployment</span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-[#18352A] tracking-tight hover:text-[#5BAF82] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E7067] font-mono mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Problem Statement */}
                <div className="text-xs text-[#18352A] space-y-1">
                  <span className="font-bold text-[#18352A]">The Problem: </span>
                  <span className="text-[#5E7067]">{project.problem}</span>
                </div>

                {/* Solution */}
                <div className="text-xs text-[#18352A] space-y-1">
                  <span className="font-bold text-[#18352A]">The Solution: </span>
                  <span className="text-[#5E7067]">{project.solution}</span>
                </div>

                {/* Key Features */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono text-[#5E7067] uppercase font-semibold">
                    Core Technical Capabilities:
                  </div>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-[#18352A] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5BAF82] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEBE1] text-[11px] font-mono text-[#18352A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#DCEBE1] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] hover:border-[#7BCB9B] transition-colors flex items-center gap-1.5 text-xs font-mono font-medium"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <button
                    onClick={() => setSelectedArchProject(project)}
                    className="px-3 py-2 rounded-lg bg-[#EEF7F1] border border-[#DCEBE1] text-[#18352A] hover:bg-[#A8E6C1]/30 transition-colors text-xs font-mono font-semibold flex items-center gap-1.5"
                  >
                    <Workflow className="w-3.5 h-3.5 text-[#5BAF82]" />
                    <span>View Architecture</span>
                  </button>
                </div>

                {/* Test in Lab Button */}
                <button
                  onClick={() => {
                    const target = getLabTarget(project.id);
                    onOpenLab(target);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Lab</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Architecture Modal */}
        <ProjectArchitectureModal
          project={selectedArchProject}
          onClose={() => setSelectedArchProject(null)}
          onOpenLab={onOpenLab}
        />
      </div>
    </section>
  );
};
