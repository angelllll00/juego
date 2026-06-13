'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/mategame-store';
import { getGradeById } from '@/lib/mategame-data';
import { PointsCounter, ProgressBar } from './FeedbackComponents';

interface WorldsViewProps {
  gradeId: string;
  onSelectMission: (worldId: string, missionId: string) => void;
  onBack: () => void;
}

export function WorldsView({ gradeId, onSelectMission, onBack }: WorldsViewProps) {
  const { playerName, totalPoints, streak, missionProgress } = useGameStore();
  const grade = getGradeById(gradeId);

  if (!grade) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
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
              <div className="flex items-center gap-2">
                <span className="text-xl">{grade.emoji}</span>
                <h1 className="text-lg font-bold text-gray-800">{grade.name}</h1>
              </div>
              <p className="text-xs text-gray-400">{grade.description}</p>
            </div>
          </div>
          <PointsCounter points={totalPoints} showStreak streak={streak} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Grade progress */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <ProgressBar
            value={Math.round(
              (grade.worlds.reduce((acc, w) => 
                acc + w.missions.filter(m => missionProgress[m.id]?.completed).length, 0
              ) / grade.worlds.reduce((acc, w) => acc + w.missions.length, 0)) * 100
            )}
            color={grade.color}
            size="md"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            {grade.worlds.reduce((acc, w) => acc + w.missions.filter(m => missionProgress[m.id]?.completed).length, 0)} de {grade.worlds.reduce((acc, w) => acc + w.missions.length, 0)} misiones completadas
          </p>
        </motion.div>

        {/* Worlds map */}
        {grade.worlds.map((world, worldIndex) => (
          <motion.div
            key={world.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: worldIndex * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{world.icon}</span>
              <h2 className="text-lg font-bold text-gray-800">{world.name}</h2>
            </div>

            <div className="space-y-3">
              {world.missions.map((mission, missionIndex) => {
                const progress = missionProgress[mission.id];
                const isCompleted = progress?.completed;
                const isStarted = progress && progress.attempts > 0;

                return (
                  <motion.button
                    key={mission.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectMission(world.id, mission.id)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 text-left hover:shadow-md transition-shadow"
                  >
                    {/* Mission icon/status */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                        isCompleted
                          ? 'bg-[#58CC02]/10 ring-2 ring-[#58CC02]'
                          : isStarted
                          ? 'bg-[#FF9600]/10 ring-2 ring-[#FF9600]'
                          : 'bg-gray-100'
                      }`}
                    >
                      {isCompleted ? '✅' : mission.icon}
                    </div>

                    {/* Mission info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-sm">{mission.name}</span>
                        {isCompleted && (
                          <span className="bg-[#58CC02] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Completada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{mission.description}</p>
                      {isStarted && !isCompleted && (
                        <div className="mt-2">
                          <ProgressBar
                            value={Math.round((progress.correctAnswers / progress.totalQuestions) * 100)}
                            color={world.color}
                            size="sm"
                            showLabel={false}
                            animated={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <span className="text-gray-300 text-lg shrink-0">›</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
