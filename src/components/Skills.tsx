import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';

interface SkillsProps {
  onOpenProof?: (projectId: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onOpenProof }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Generative AI',
    'AI Agents',
    'Machine Learning',
    'Data Analytics',
    'Cloud & DevOps',
    'Programming',
    'Computer Vision & IoT',
    'Developer Tools',
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.featuredIn.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSeeProof = (projectName: string) => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Proof of Work Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            Skills Grounded in Verifiable Evidence
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            No arbitrary percentages. Every capability is anchored in production deliverables,
            reproducible code repositories, and deployed architectures.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#5E7067] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills, frameworks, or projects (e.g., LangGraph, RAG, Power BI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DCEBE1] text-xs font-mono text-[#18352A] placeholder-[#5E7067] focus:outline-none focus:border-[#7BCB9B] shadow-sm"
            />
          </div>

          {/* Clean Segmented Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#EEF7F1] border border-[#DCEBE1] rounded-2xl max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-[#18352A] border border-[#7BCB9B] shadow-sm font-bold'
                    : 'text-[#5E7067] hover:text-[#18352A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="light-card light-card-hover p-5 bg-white flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#18352A] tracking-tight">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E8F8EE] border border-[#A8E6C1] text-[#5BAF82]">
                    {skill.level}
                  </span>
                </div>

                <div className="text-xs text-[#5E7067] font-mono flex items-center gap-2 mb-2">
                  <span>{skill.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#18352A] font-semibold">{skill.projectsCount}+ Projects</span>
                </div>

                <p className="text-xs text-[#5E7067] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Proof of Work & Projects */}
              <div className="pt-3 border-t border-[#DCEBE1] space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#5E7067] font-semibold">
                  <span>Production Proof:</span>
                  <button
                    onClick={() => handleSeeProof(skill.featuredIn[0] || 'projects')}
                    className="text-[#5BAF82] hover:text-[#18352A] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>See Proof</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                  {skill.featuredIn.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-[#5E7067] text-xs font-mono">
            No technical skills found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};
