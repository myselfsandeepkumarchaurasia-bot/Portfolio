import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#EEF7F1]/40 border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Career Journey & Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            5+ Years of Industry Software & AI Engineering
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            From data analytics and DevOps automation to leading Generative AI architectures,
            RAG deployments, and LangGraph agent pipelines.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Spine */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#7BCB9B] via-[#A8E6C1] to-[#DCEBE1]" />

          <div className="space-y-8 relative">
            {EXPERIENCE_DATA.map((exp) => {
              const isCurrent = exp.period.includes('Present');

              return (
                <div key={exp.id} className="relative pl-10 sm:pl-16">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-2 sm:left-6 -translate-x-1/2 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#7BCB9B] border-white shadow-md'
                        : 'bg-white border-[#DCEBE1] text-[#5E7067]'
                    }`}
                  >
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </div>

                  {/* Card */}
                  <div
                    className={`light-card p-6 bg-white border transition-all ${
                      isCurrent
                        ? 'border-[#7BCB9B] shadow-md shadow-[#7BCB9B]/10'
                        : 'border-[#DCEBE1] hover:border-[#A8E6C1]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCEBE1]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#18352A] tracking-tight">
                            {exp.role}
                          </h3>
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E8F8EE] text-[#5BAF82] border border-[#A8E6C1]">
                              CURRENT ROLE
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-[#5BAF82] font-mono mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#5E7067] font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="pt-4 space-y-2">
                      <div className="text-xs font-mono uppercase text-[#5E7067] font-semibold">
                        Core Engineering Scope:
                      </div>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm text-[#18352A] flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#5BAF82] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Measured Outcomes */}
                    {exp.keyOutcomes.length > 0 && (
                      <div className="mt-4 p-3 rounded-xl bg-[#EEF7F1] border border-[#DCEBE1] space-y-1">
                        <div className="text-[11px] font-mono text-[#5BAF82] font-bold uppercase flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Production Impact:
                        </div>
                        <div className="space-y-0.5">
                          {exp.keyOutcomes.map((out, oIdx) => (
                            <div key={oIdx} className="text-xs text-[#18352A] font-medium">
                              • {out}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mt-4 pt-3 border-t border-[#DCEBE1] flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-[#5E7067] mr-1">Stack:</span>
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEBE1] text-[11px] font-mono text-[#18352A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
