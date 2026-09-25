import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Code2, 
  BookOpen,
  Info
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../../data/portfolioData';

export const SkillAssessment: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Interactive Technical Skill Assessment</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluate engineering concepts across RAG, LangGraph, Scikit-learn, and SQL query optimization.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          Demo Assessment Platform
        </span>
      </div>

      {!completed ? (
        <div className="p-6 rounded-2xl bg-[#0c101c] border border-slate-800 space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-3 border-b border-white/5">
            <span className="text-cyan-400 font-semibold uppercase">
              Question {currentIdx + 1} of {ASSESSMENT_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                {question.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {question.difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {question.question}
            </h4>

            {question.codeSnippet && (
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                {question.codeSnippet}
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5 font-mono text-xs">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctAnswer;

              let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/60 border-red-500/80 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 text-[10px] flex items-center justify-center font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-sans">{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Technical Explanation:</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                {question.explanation}
              </p>
              <div className="text-[10px] text-slate-500 pt-1">
                Concept Tested: {question.conceptTested}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>{currentIdx < ASSESSMENT_QUESTIONS.length - 1 ? 'Next Question' : 'View Scorecard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completed Scorecard */
        <div className="p-8 rounded-2xl bg-[#0c101c] border border-cyan-500/30 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white">Assessment Complete</h4>
            <p className="text-xs text-slate-400 font-mono">
              Evaluated across Generative AI, RAG, LangGraph, Machine Learning & SQL
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">CORRECT</div>
              <div className="text-xl font-bold text-emerald-400">{score}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">TOTAL</div>
              <div className="text-xl font-bold text-white">{ASSESSMENT_QUESTIONS.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">ACCURACY</div>
              <div className="text-xl font-bold text-cyan-400">
                {Math.round((score / ASSESSMENT_QUESTIONS.length) * 100)}%
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">MASTERY</div>
              <div className="text-xl font-bold text-purple-400">
                {score >= 5 ? 'High' : 'Proficient'}
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-slate-500 max-w-md mx-auto">
            Note: This interactive assessment is designed to demonstrate technical comprehension of production AI concepts.
          </p>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2 mx-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
};
