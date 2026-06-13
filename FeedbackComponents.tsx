'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ============================================================
// Componente de Confeti para celebraciones
// ============================================================

export function fireConfetti() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#58CC02', '#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B'],
  };

  confetti({
    ...defaults,
    particleCount: 60,
    scalar: 1.2,
    shapes: ['circle', 'square'] as confetti.Shape[],
    origin: { x: 0.5, y: 0.5 },
  });

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 0.9,
      shapes: ['circle'] as confetti.Shape[],
      origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
    });
  }, 250);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// ============================================================
// Feedback de respuesta correcta
// ============================================================

interface SuccessFeedbackProps {
  show: boolean;
  message?: string;
  points?: number;
}

export function SuccessFeedback({ show, message = '¡Muy bien!', points = 10 }: SuccessFeedbackProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="bg-[#58CC02] text-white rounded-3xl px-8 py-6 shadow-2xl flex flex-col items-center gap-2"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              🎉
            </motion.span>
            <span className="text-2xl font-bold">{message}</span>
            <motion.span
              className="text-lg font-semibold bg-white/20 rounded-full px-4 py-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              +{points} puntos
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// Feedback de respuesta incorrecta (positivo)
// ============================================================

interface ErrorFeedbackProps {
  show: boolean;
  explanation?: string;
  onRetry: () => void;
}

export function ErrorFeedback({ show, explanation, onRetry }: ErrorFeedbackProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
          onClick={onRetry}
        >
          <motion.div
            className="bg-white rounded-3xl px-6 py-6 shadow-2xl flex flex-col items-center gap-3 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.span
              className="text-5xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              🤔
            </motion.span>
            <span className="text-xl font-bold text-[#FF4B4B]">¡Casi lo tienes!</span>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {explanation || 'No te preocupes, los errores nos ayudan a aprender. ¡Inténtalo de nuevo!'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="bg-[#FF9600] hover:bg-[#E8880A] text-white font-bold rounded-2xl px-8 py-3 text-lg shadow-lg transition-colors"
            >
              ¡Intentar otra vez! 💪
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// Barra de progreso animada
// ============================================================

interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function ProgressBar({ value, color = '#58CC02', showLabel = true, size = 'md', animated = true }: ProgressBarProps) {
  const heights = { sm: 'h-2', md: 'h-4', lg: 'h-6' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className={`${textSizes[size]} font-semibold text-gray-600`}>Progreso</span>
          <span className={`${textSizes[size]} font-bold`} style={{ color }}>{value}%</span>
        </div>
      )}
      <div className={`${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          className={`${heights[size]} rounded-full`}
          style={{ backgroundColor: color }}
          initial={animated ? { width: 0 } : { width: `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ============================================================
// Contador de puntos animado
// ============================================================

interface PointsCounterProps {
  points: number;
  showStreak?: boolean;
  streak?: number;
}

export function PointsCounter({ points, showStreak = false, streak = 0 }: PointsCounterProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="flex items-center gap-1.5 bg-[#FFF0D0] rounded-2xl px-4 py-2 shadow-sm"
        key={points}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xl">⭐</span>
        <span className="text-lg font-bold text-[#FF9600]">{points}</span>
      </motion.div>
      {showStreak && streak > 1 && (
        <motion.div
          className="flex items-center gap-1 bg-[#FFD0D0] rounded-2xl px-3 py-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold text-[#FF4B4B]">{streak}x</span>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// Mostrar medallas
// ============================================================

interface MedalDisplayProps {
  medals: { id: string; name: string; icon: string; description: string; earnedAt: number }[];
  compact?: boolean;
}

export function MedalDisplay({ medals, compact = false }: MedalDisplayProps) {
  if (medals.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        <span className="text-3xl">🏅</span>
        <p className="text-sm mt-1">¡Completa misiones para ganar medallas!</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        {medals.map((medal) => (
          <motion.div
            key={medal.id}
            className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl shadow-sm border-2 border-yellow-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            title={`${medal.name}: ${medal.description}`}
          >
            {medal.icon}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {medals.map((medal) => (
        <motion.div
          key={medal.id}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm border border-yellow-200"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-3xl">{medal.icon}</span>
          <span className="text-xs font-bold text-yellow-800 text-center">{medal.name}</span>
          <span className="text-[10px] text-yellow-600 text-center">{medal.description}</span>
        </motion.div>
      ))}
    </div>
  );
}
