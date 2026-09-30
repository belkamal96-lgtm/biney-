import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Check, HelpCircle, Edit2, RotateCcw } from 'lucide-react';
import { ROMANTIC_DATA, QuizQuestion } from '../data/romanticContent';

const QUIZ_STORAGE_KEY = 'binita_love_quiz_questions';

export const LoveQuizSection: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ROMANTIC_DATA.quiz.questions;
  });

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showCelebrationHearts, setShowCelebrationHearts] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<QuizQuestion[]>(questions);

  // Sync questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(questions));
    } catch {}
  }, [questions]);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));

    // Auto advance or finish
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        setShowCelebrationHearts(true);
      }
    }, 1200);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsCompleted(false);
    setShowCelebrationHearts(false);
  };

  const handleSaveEditedQuiz = () => {
    setQuestions(editFormData);
    setShowEditModal(false);
    handleResetQuiz();
  };

  const handleResetDefaultQuiz = () => {
    if (window.confirm("Reset questions to original default love quiz?")) {
      setQuestions(ROMANTIC_DATA.quiz.questions);
      setEditFormData(ROMANTIC_DATA.quiz.questions);
      try {
        localStorage.removeItem(QUIZ_STORAGE_KEY);
      } catch {}
      handleResetQuiz();
    }
  };

  return (
    <section id="love-quiz" className="py-20 sm:py-28 px-4 relative bg-[#FFF7F9] border-t border-[#F5DFE6]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B76E79] uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Couple Game</span>
            <span aria-hidden="true">·</span>
            <span>Just For Us</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0D22] mb-3 text-balance">
            {ROMANTIC_DATA.quiz.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#7C4857] font-normal leading-relaxed">
            {ROMANTIC_DATA.quiz.subtitle}
          </p>

          {/* Boyfriend personalization button */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setEditFormData(questions);
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8B1E3F] hover:bg-[#FFE8EF] rounded-full border border-[#F3CBD5] transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Personalize Quiz Options</span>
            </button>
          </div>
        </div>

        {/* Quiz Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F1D6DF] shadow-romantic-lg relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F7E5EC]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#8B1E3F] px-2.5 py-1 bg-[#FFF0F4] rounded-md border border-[#FADCE4]">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentQIndex
                          ? 'w-6 bg-[#8B1E3F]'
                          : selectedAnswers[questions[idx].id] !== undefined
                          ? 'w-2 bg-[#E88CA6]'
                          : 'w-2 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question text */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#4A0D22] mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Answer Choices */}
              <div className="space-y-3.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswered}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#FFF0F4] border-[#8B1E3F] text-[#8B1E3F] shadow-sm font-semibold scale-[1.01]'
                          : isAnswered
                          ? 'bg-gray-50/70 border-gray-200 text-gray-400 cursor-default'
                          : 'bg-[#FFFAF8] hover:bg-[#FFF2F5] border-[#F2D7DF] text-[#4A1B28] hover:border-[#E88CA6] hover:scale-[1.005]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white border border-[#E8B4B8] text-xs font-bold text-[#8B1E3F] flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-sm sm:text-base">{option}</span>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center shrink-0 animate-in zoom-in">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sweet Note upon selecting */}
              {selectedAnswers[currentQ.id] !== undefined && (
                <div className="mt-6 p-4 rounded-xl bg-[#FFF0F4] border border-[#FADCE4] text-xs sm:text-sm text-[#8B1E3F] font-medium flex items-center gap-2 animate-in fade-in">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#C95370]" />
                  <span>{currentQ.sweetNote}</span>
                </div>
              )}
            </div>
          ) : (
            /* Celebration Screen when completed */
            <div className="text-center py-6 sm:py-8 animate-in zoom-in-95 duration-500">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#8B1E3F] to-[#D65D7A] flex items-center justify-center text-white shadow-glow mx-auto">
                  <Heart className="w-10 h-10 fill-current animate-bounce" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#FFD700]" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#541026] mb-4">
                Quiz Complete, My Love!
              </h3>

              {/* Exact user requirement quote */}
              <div className="bg-[#FFF5F8] border border-[#F7D2DE] rounded-2xl p-6 mb-8 max-w-lg mx-auto shadow-xs">
                <p className="font-serif italic text-lg sm:text-xl text-[#8B1E3F] font-semibold leading-relaxed">
                  "{ROMANTIC_DATA.quiz.finalMessage}"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#8B1E3F] hover:bg-[#741532] rounded-full shadow-romantic transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Quiz Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Boyfriend Quiz Customizer Modal */}
      {showEditModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowEditModal(false)}
        >
          <div 
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F2D6DF]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#F7E5EC] mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-[#541026]">
                  Personalize Quiz for Binita
                </h3>
                <p className="text-xs text-[#805060]">
                  Customize the question titles or choices with your personal memories!
                </p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {editFormData.map((q, qIndex) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#F3D7DE]">
                  <label className="block text-xs font-bold text-[#8B1E3F] mb-1">
                    Question {qIndex + 1}:
                  </label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...editFormData];
                      updated[qIndex].question = e.target.value;
                      setEditFormData(updated);
                    }}
                    className="w-full text-xs font-semibold p-2.5 mb-3 border border-gray-200 rounded-lg bg-white"
                  />

                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-500 w-5">
                          {String.fromCharCode(65 + optIndex)}:
                        </span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...editFormData];
                            updated[qIndex].options[optIndex] = e.target.value;
                            setEditFormData(updated);
                          }}
                          className="flex-1 text-xs p-2 border border-gray-200 rounded-lg bg-white"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Sweet note revealed after answering:
                    </label>
                    <input
                      type="text"
                      value={q.sweetNote}
                      onChange={(e) => {
                        const updated = [...editFormData];
                        updated[qIndex].sweetNote = e.target.value;
                        setEditFormData(updated);
                      }}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F7E5EC] flex items-center justify-between">
              <button
                onClick={handleResetDefaultQuiz}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Reset to Original
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditedQuiz}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#8B1E3F] hover:bg-[#741532] rounded-xl shadow-xs"
                >
                  Save Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
