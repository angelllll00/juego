'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/lib/mategame-store';
import { LandingView } from '@/components/mategame/LandingView';
import { DashboardView } from '@/components/mategame/DashboardView';
import { WorldsView } from '@/components/mategame/WorldsView';
import { QuizView } from '@/components/mategame/QuizView';

export default function Home() {
  const {
    currentView,
    selectedGradeId,
    selectedWorldId,
    selectedMissionId,
    setCurrentView,
    selectGrade,
    selectWorld,
    selectMission,
    goBack,
    playerName,
  } = useGameStore();

  const handleStartFromLanding = () => {
    setCurrentView('dashboard');
  };

  const handleSelectGrade = (gradeId: string) => {
    selectGrade(gradeId);
  };

  const handleSelectMission = (worldId: string, missionId: string) => {
    selectWorld(worldId);
    selectMission(missionId);
  };

  const handleQuizBack = () => {
    setCurrentView('worlds');
  };

  const handleQuizComplete = () => {
    setCurrentView('worlds');
  };

  // If player has name, skip landing on reload
  const showLanding = currentView === 'landing';
  const showDashboard = currentView === 'dashboard';
  const showWorlds = currentView === 'worlds' && !!selectedGradeId;
  const showQuiz = currentView === 'quiz' && !!selectedGradeId && !!selectedWorldId && !!selectedMissionId;

  return (
    <AnimatePresence mode="wait">
      {showLanding && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingView onStart={handleStartFromLanding} />
        </motion.div>
      )}

      {showDashboard && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardView
            onSelectGrade={handleSelectGrade}
            onBack={goBack}
          />
        </motion.div>
      )}

      {showWorlds && (
        <motion.div
          key="worlds"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <WorldsView
            gradeId={selectedGradeId!}
            onSelectMission={handleSelectMission}
            onBack={goBack}
          />
        </motion.div>
      )}

      {showQuiz && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizView
            gradeId={selectedGradeId!}
            worldId={selectedWorldId!}
            missionId={selectedMissionId!}
            onBack={handleQuizBack}
            onComplete={handleQuizComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
