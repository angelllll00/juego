'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/mategame-store';
import { GRADES, getTotalQuestionsForGrade } from '@/lib/mategame-data';
import { PointsCounter, ProgressBar, MedalDisplay } from './FeedbackComponents';

interface DashboardViewProps {
  onSelectGrade: (gradeId: string) => void;
  onBack: () => void;
}

export function DashboardView({ onSelectGrade, onBack }: DashboardViewProps) {
  const { playerName, totalPoints, streak, maxStreak, medals, missionProgress, getGradeProgress } = useGameStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="text-gray-400 hover:text-gray-600 text-xl p-1"
              aria-label="Volver"
            >
              ←
            </motion.button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                ¡Hola, {playerName || 'Amigo'}! 👋
              </h1>
              <p className="text-xs text-gray-400">Elige tu grado y empieza a jugar</p>
            </div>
          </div>
          <PointsCounter points={totalPoints} showStreak streak={streak} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats summary */}
        <motion.div
          className="bg-gradient-to-r from-[#58CC02] to-[#1CB0F6] rounded-3xl p-5 text-white shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <StatCard icon="⭐" value={totalPoints} label="Puntos" />
            <StatCard icon="🔥" value={maxStreak} label="Mejor racha" />
            <StatCard icon="🏅" value={medals.length} label="Medallas" />
          </div>
        </motion.div>

        {/* Grade selector */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">📚 Elige tu grado</h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {GRADES.map((grade) => {
              const missionIds = grade.worlds.flatMap(w => w.missions.map(m => m.id));
              const progress = getGradeProgress(grade.id, missionIds);
              const totalQ = getTotalQuestionsForGrade(grade);
              const completedMissions = missionIds.filter(id => missionProgress[id]?.completed).length;

              return (
                <motion.button
                  key={grade.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectGrade(grade.id)}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow text-left flex flex-col gap-2 border-2 border-transparent hover:border-gray-100"
                  style={{ borderTopColor: grade.color, borderTopWidth: '4px' }}
                >
                  <span className="text-3xl">{grade.emoji}</span>
                  <span className="font-bold text-gray-800 text-sm">{grade.name}</span>
                  <span className="text-[11px] text-gray-400 leading-tight">{grade.description}</span>
                  <div className="mt-auto pt-2">
                    <ProgressBar
                      value={progress}
                      color={grade.color}
                      showLabel={false}
                      size="sm"
                      animated={false}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-gray-400">{completedMissions}/{missionIds.length} misiones</span>
                      <span className="text-[10px] font-bold" style={{ color: grade.color }}>{progress}%</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Medals section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">🏅 Mis Medallas</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <MedalDisplay medals={medals} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl">{icon}</span>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
