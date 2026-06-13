import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useGameStore } from "@/lib/gameStore";
import { GRADES } from "@/lib/gameData";

const OPTION_LABELS = ["A", "B", "C"];

export default function QuizGame() {
  const {
    selectedGradeId,
    quizQuestions,
    currentQuestionIndex,
    currentScore,
    currentStreak,
    showFeedback,
    lastAnswerCorrect,
    selectedAnswerIndex,
    answerQuestion,
    nextQuestion,
    goBack,
  } = useGameStore();

  const [showHint, setShowHint] = useState(false);

  const grade = GRADES.find((g) => g.id === selectedGradeId);
  const gradeColor = grade?.color || "#58CC02";

  const question = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progressPercent =
    totalQuestions > 0
      ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
      : 0;

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No hay preguntas disponibles</p>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setShowHint(false);
    answerQuestion(index);

    // Fire confetti on correct answer
    const state = useGameStore.getState();
    if (state.lastAnswerCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#58CC02", "#FFC800", "#1CB0F6", "#FF6B6B", "#CE82FF"],
      });
    }
  };

  const handleNext = () => {
    nextQuestion();
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return "bg-white border-2 border-gray-200 hover:border-gray-400 hover:shadow-md";
    }
    if (index === question.correctIndex) {
      return "bg-green-50 border-2 border-green-400";
    }
    if (index === selectedAnswerIndex && !lastAnswerCorrect) {
      return "bg-orange-50 border-2 border-orange-400";
    }
    return "bg-white border-2 border-gray-100 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={goBack}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Salir"
            >
              ✕
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-800">
                ⭐ {currentScore}
              </span>
              {currentStreak >= 2 && (
                <motion.span
                  className="text-sm font-bold text-orange-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  🔥 {currentStreak}
                </motion.span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: gradeColor }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </p>
        </div>
      </header>

      {/* Question area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{question.emoji}</span>
                <h2
                  className="text-xl font-bold text-gray-800 flex-1"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {question.text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${getOptionStyle(
                      index
                    )} ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                    whileTap={!showFeedback ? { scale: 0.97 } : undefined}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showFeedback && index === question.correctIndex
                          ? "bg-green-500 text-white"
                          : showFeedback &&
                            index === selectedAnswerIndex &&
                            !lastAnswerCorrect
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {showFeedback && index === question.correctIndex
                        ? "✅"
                        : showFeedback &&
                          index === selectedAnswerIndex &&
                          !lastAnswerCorrect
                        ? "❌"
                        : OPTION_LABELS[index]}
                    </span>
                    <span
                      className="text-lg font-semibold text-gray-700"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {option}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hint toggle */}
            {!showFeedback && (
              <motion.button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-amber-600 font-semibold mb-4 hover:text-amber-700 transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }}
                whileTap={{ scale: 0.95 }}
              >
                💡 Ver pista
              </motion.button>
            )}

            {/* Hint display */}
            <AnimatePresence>
              {showHint && !showFeedback && (
                <motion.div
                  className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p
                    className="text-amber-800 text-sm"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    💡 {question.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  className={`rounded-2xl p-5 ${
                    lastAnswerCorrect
                      ? "bg-green-50 border-2 border-green-300"
                      : "bg-orange-50 border-2 border-orange-300"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className={`text-lg font-bold mb-1 ${
                      lastAnswerCorrect ? "text-green-700" : "text-orange-700"
                    }`}
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {lastAnswerCorrect ? "✅ ¡Muy bien! +10 puntos" : "❌ ¡Inténtalo de nuevo!"}
                  </p>
                  {!lastAnswerCorrect && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-orange-600">
                        La respuesta correcta era:{" "}
                        <strong>{question.options[question.correctIndex]}</strong>
                      </p>
                      <p className="text-sm text-orange-500">
                        💡 {question.hint}
                      </p>
                    </div>
                  )}

                  <motion.button
                    onClick={handleNext}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {currentQuestionIndex < totalQuestions - 1
                      ? "Siguiente ➡️"
                      : "Ver Resultados 🏆"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
