import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="journey" className="py-20 bg-slate-50/70 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Education & Computer Science Foundation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Formal technical degrees and academic milestones grounding advanced computing, software engineering, and algorithmic problem-solving.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EDUCATION_DATA.map((item, idx) => {
            const isPursuing = item.period.toLowerCase().includes('pursuing');
            return (
              <div
                key={idx}
                className={`light-card p-6 bg-white border transition-all ${
                  isPursuing
                    ? 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                    : 'border-slate-300 hover:border-emerald-400'
                } space-y-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {item.degree}
                      </h3>
                      {isPursuing ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                          CURRENT / PURSUING
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-700 font-mono mt-1">
                      {item.institution}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {item.period}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wide">Key Focus & Core Subjects:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-[11px] font-mono font-medium text-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
