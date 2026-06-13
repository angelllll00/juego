'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/mategame-store';
import { getGradeById, getWorldById, getMissionById, type Question } from '@/lib/mategame-data';
import { PointsCounter, ProgressBar, SuccessFeedback, ErrorFeedback, fireConfetti } from './FeedbackComponents';

interface QuizViewProps {
  gradeId: string;
  worldId: string;
  missionId: string;
  onBack: () => void;
  onComplete: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepareQuestions(questions: Question[]) {
  const shuffled = shuffleArray(questions);
  const optionMaps = shuffled.map(q => {
    const indices = q.options.map((_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    const newOptions = shuffledIndices.map(i => q.options[i]);
    const newCorrectIndex = shuffledIndices.indexOf(q.correctAnswer);
    return { options: newOptions, correctIndex: newCorrectIndex };
  });
  return { shuffledQuestions: shuffled, shuffledOptions: optionMaps };
}

export function QuizView({ gradeId, worldId, missionId, onBack, onComplete }: QuizViewProps) {
  const grade = getGradeById(gradeId);
  const world = getWorldById(gradeId, worldId);
  const mission = getMissionById(gradeId, worldId, missionId);

  const { totalPoints, streak, addPoints, incrementStreak, resetStreak, completeMission } = useGameStore();

  // Use a key to force re-mount on restart
  const [quizKey, setQuizKey] = useState(0);

  if (!grade || !world || !mission) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <p className="text-gray-400">Cargando misión...</p>
      </div>
    );
  }

  return (
    <QuizInner
      key={quizKey}
      grade={grade}
      world={world}
      mission={mission}
      missionId={missionId}
      totalPoints={totalPoints}
      streak={streak}
      addPoints={addPoints}
      incrementStreak={incrementStreak}
      resetStreak={resetStreak}
      completeMission={completeMission}
      onBack={onBack}
      onComplete={onComplete}
      onRestart={() => setQuizKey(k => k + 1)}
    />
  );
}

// Inner component that handles the actual quiz logic
interface QuizInnerProps {
  grade: NonNullable<ReturnType<typeof getGradeById>>;
  world: NonNullable<ReturnType<typeof getWorldById>>;
  mission: NonNullable<ReturnType<typeof getMissionById>>;
  missionId: string;
  totalPoints: number;
  streak: number;
  addPoints: (p: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeMission: (id: string, correct: number, total: number) => void;
  onBack: () => void;
  onComplete: () => void;
  onRestart: () => void;
}

function QuizInner({
  grade, world, mission, missionId,
  totalPoints, streak, addPoints, incrementStreak, resetStreak, completeMission,
  onBack, onComplete, onRestart,
}: QuizInnerProps) {
  const { shuffledQuestions, shuffledOptions } = useMemo(
    () => prepareQuestions(mission.questions),
    [mission.questions]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = shuffledQuestions[currentIndex];
  const currentOptions = shuffledOptions[currentIndex];
  const progressValue = Math.round((currentIndex / shuffledQuestions.length) * 100);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentOptions.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      const points = currentQuestion.difficulty === 1 ? 10 : currentQuestion.difficulty === 2 ? 20 : 30;
      const newCorrectCount = correctCount + 1;
      addPoints(points);
      incrementStreak();
      setCorrectCount(newCorrectCount);
      setShowSuccess(true);
      fireConfetti();

      setTimeout(() => {
        setShowSuccess(false);
        if (currentIndex < shuffledQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          completeMission(missionId, newCorrectCount, shuffledQuestions.length);
          setIsFinished(true);
        }
      }, 1500);
    } else {
      resetStreak();
      setShowError(true);
    }
  }, [selectedAnswer, currentOptions, currentQuestion, currentIndex, shuffledQuestions.length, correctCount, missionId, addPoints, incrementStreak, resetStreak, completeMission]);

  const handleRetryFromError = useCallback(() => {
    setShowError(false);
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      completeMission(missionId, correctCount, shuffledQuestions.length);
      setIsFinished(true);
    }
  }, [currentIndex, shuffledQuestions.length, correctCount, missionId, completeMission]);

  // Finished screen
  if (isFinished) {
    const percentage = Math.round((correctCount / shuffledQuestions.length) * 100);
    const isPassed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#58CC02]/10 via-white to-[#1CB0F6]/10 flex flex-col items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.span
            className="text-7xl block mb-4"
            animate={isPassed ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 1, repeat: isPassed ? Infinity : 0 }}
          >
            {isPassed ? '🏆' : '💪'}
          </motion.span>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isPassed ? '¡Misión Completada!' : '¡Sigue Practicando!'}
          </h2>

          <p className="text-gray-500 mb-4">
            {isPassed
              ? '¡Increíble trabajo! Has demostrado que eres un genio.'
              : 'No te rindas, cada intento te hace más fuerte.'}
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-3xl font-bold" style={{ color: isPassed ? '#58CC02' : '#FF9600' }}>
                  {correctCount}/{shuffledQuestions.length}
                </span>
                <p className="text-xs text-gray-400">Correctas</p>
              </div>
              <div>
                <span className="text-3xl font-bold" style={{ color: isPassed ? '#58CC02' : '#FF9600' }}>
                  {percentage}%
                </span>
                <p className="text-xs text-gray-400">Aciertos</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="w-full bg-[#1CB0F6] hover:bg-[#0FA3E8] text-white font-bold rounded-2xl py-3 text-lg shadow-lg shadow-blue-200 transition-colors"
            >
              Jugar de nuevo 🔄
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold rounded-2xl py-3 text-lg shadow-lg shadow-green-200 transition-colors"
            >
              Volver a misiones 🗺️
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 text-xl p-1"
            aria-label="Cerrar quiz"
          >
            ✕
          </motion.button>
          <div className="flex-1 mx-4">
            <ProgressBar
              value={progressValue}
              color={grade.color}
              showLabel={false}
              size="sm"
            />
          </div>
          <PointsCounter points={totalPoints} showStreak streak={streak} />
        </div>
      </header>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-6"
          >
            {/* Mission & question counter */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-medium">
                {mission.icon} {mission.name} • Pregunta {currentIndex + 1} de {shuffledQuestions.length}
              </span>
            </div>

            {/* Question card */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg text-center"
              style={{ borderTopColor: world.color, borderTopWidth: '4px' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-3">
              {currentOptions.options.map((option, index) => {
                let btnStyle = 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md';

                if (selectedAnswer !== null) {
                  if (index === currentOptions.correctIndex) {
                    btnStyle = 'bg-[#58CC02]/10 border-2 border-[#58CC02] text-[#58CC02]';
                  } else if (index === selectedAnswer && !isCorrect) {
                    btnStyle = 'bg-[#FF4B4B]/10 border-2 border-[#FF4B4B] text-[#FF4B4B]';
                  } else {
                    btnStyle = 'bg-gray-50 border-2 border-gray-100 text-gray-300';
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`${btnStyle} rounded-2xl p-4 text-lg font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback overlays */}
      <SuccessFeedback
        show={showSuccess}
        points={currentQuestion.difficulty === 1 ? 10 : currentQuestion.difficulty === 2 ? 20 : 30}
      />
      <ErrorFeedback
        show={showError}
        explanation={currentQuestion.explanation}
        onRetry={handleRetryFromError}
      />
    </div>
  );
}
