'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/mategame-store';

interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  const { playerName, setPlayerName, totalPoints } = useGameStore();
  const [inputName, setInputName] = useState(playerName);
  const [step, setStep] = useState<'hero' | 'name'>(playerName ? 'name' : 'hero');

  const handleStart = () => {
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      onStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#58CC02] via-[#1CB0F6] to-[#CE82FF] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorations */}
      <FloatingEmoji emoji="🧮" delay={0} x={10} y={20} />
      <FloatingEmoji emoji="📐" delay={1} x={85} y={15} />
      <FloatingEmoji emoji="🔢" delay={2} x={15} y={75} />
      <FloatingEmoji emoji="➗" delay={0.5} x={80} y={70} />
      <FloatingEmoji emoji="✖️" delay={1.5} x={50} y={10} />
      <FloatingEmoji emoji="➕" delay={2.5} x={30} y={85} />
      <FloatingEmoji emoji="➖" delay={0.8} x={70} y={40} />

      {/* Logo and title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          className="text-7xl sm:text-8xl mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎮
        </motion.div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight">
          Mate<span className="text-[#FFD900]">Game</span>
        </h1>
        <motion.p
          className="text-white/90 text-lg sm:text-xl mt-3 font-medium max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¡Aprende matemáticas jugando! 🚀
        </motion.p>
      </motion.div>

      {/* Card content */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        {step === 'hero' ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              ¡Hola, futuro genio! 🌟
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              MateGame te lleva por mundos increíbles donde aprenderás matemáticas 
              resolviendo misiones divertidas. ¡Gana puntos, medallas y conviértete 
              en un maestro de los números!
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <FeatureBadge icon="🏝️" label="6 Mundos" />
              <FeatureBadge icon="⭐" label="Puntos" />
              <FeatureBadge icon="🏅" label="Medallas" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('name')}
              className="w-full bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold rounded-2xl py-4 text-xl shadow-lg shadow-green-200 transition-colors"
            >
              ¡Vamos a jugar! 🎮
            </motion.button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¿Cómo te llamas? 👋
            </h2>
            <p className="text-gray-500 mb-4 text-sm">
              Escribe tu nombre para empezar tu aventura
            </p>

            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="Tu nombre aquí..."
              maxLength={20}
              className="w-full text-center text-xl font-semibold border-3 border-gray-200 focus:border-[#58CC02] rounded-2xl py-4 px-4 outline-none transition-colors mb-4"
              autoFocus
            />

            {totalPoints > 0 && (
              <div className="bg-[#FFF0D0] rounded-xl px-4 py-2 mb-4 text-sm">
                <span className="text-[#FF9600] font-semibold">
                  ⭐ Ya tienes {totalPoints} puntos. ¡Sigue así!
                </span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              disabled={!inputName.trim()}
              className={`w-full font-bold rounded-2xl py-4 text-xl shadow-lg transition-all ${
                inputName.trim()
                  ? 'bg-[#58CC02] hover:bg-[#4CAF00] text-white shadow-green-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              ¡Empezar aventura! 🚀
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('hero')}
              className="mt-3 text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              ← Volver
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-white/60 text-xs mt-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Para niños de 6 a 12 años • 1º a 6º de primaria
      </motion.p>
    </div>
  );
}

// Sub-components

function FloatingEmoji({ emoji, delay, x, y }: { emoji: string; delay: number; x: number; y: number }) {
  return (
    <motion.span
      className="absolute text-4xl sm:text-5xl select-none pointer-events-none opacity-30"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.span>
  );
}

function FeatureBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl py-3 flex flex-col items-center gap-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold text-gray-600">{label}</span>
    </div>
  );
}
