// ============================================================
// MateGame - Store global con Zustand
// Maneja: progreso, puntos, medallas, vista actual
// Persiste en localStorage para funcionalidad offline
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppView = 'landing' | 'dashboard' | 'worlds' | 'mission' | 'quiz';

export interface Medal {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: number;
}

export interface MissionProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface GameState {
  // Navigation
  currentView: AppView;
  selectedGradeId: string | null;
  selectedWorldId: string | null;
  selectedMissionId: string | null;

  // Player stats
  playerName: string;
  totalPoints: number;
  streak: number; // racha de respuestas correctas
  maxStreak: number;

  // Progress per mission
  missionProgress: Record<string, MissionProgress>;

  // Medals
  medals: Medal[];

  // Actions - Navigation
  setCurrentView: (view: AppView) => void;
  selectGrade: (gradeId: string) => void;
  selectWorld: (worldId: string) => void;
  selectMission: (missionId: string) => void;
  goBack: () => void;

  // Actions - Player
  setPlayerName: (name: string) => void;
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;

  // Actions - Progress
  completeMission: (missionId: string, correct: number, total: number) => void;
  addMedal: (medal: Omit<Medal, 'earnedAt'>) => void;

  // Helpers
  getMissionProgress: (missionId: string) => MissionProgress | null;
  getGradeProgress: (gradeId: string, missionIds: string[]) => number; // percentage 0-100
}

const MEDAL_DEFINITIONS = {
  firstMission: { name: 'Primera Misión', icon: '🌟', description: 'Completaste tu primera misión' },
  streak5: { name: 'Racha de 5', icon: '🔥', description: '5 respuestas correctas seguidas' },
  streak10: { name: 'Racha de 10', icon: '⚡', description: '10 respuestas correctas seguidas' },
  perfectScore: { name: 'Puntuación Perfecta', icon: '💎', description: 'Todas las respuestas correctas en una misión' },
  explorer: { name: 'Explorador', icon: '🗺️', description: 'Jugaste en 5 misiones diferentes' },
  mathWhiz: { name: 'Genio Matemático', icon: '🧠', description: 'Acumulaste más de 500 puntos' },
};

export { MEDAL_DEFINITIONS };

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentView: 'landing',
      selectedGradeId: null,
      selectedWorldId: null,
      selectedMissionId: null,
      playerName: '',
      totalPoints: 0,
      streak: 0,
      maxStreak: 0,
      missionProgress: {},
      medals: [],

      // Navigation actions
      setCurrentView: (view) => set({ currentView: view }),

      selectGrade: (gradeId) => set({
        selectedGradeId: gradeId,
        selectedWorldId: null,
        selectedMissionId: null,
        currentView: 'worlds',
      }),

      selectWorld: (worldId) => set({
        selectedWorldId: worldId,
        selectedMissionId: null,
      }),

      selectMission: (missionId) => set({
        selectedMissionId: missionId,
        currentView: 'quiz',
      }),

      goBack: () => {
        const state = get();
        const viewMap: Record<AppView, AppView> = {
          landing: 'landing',
          dashboard: 'landing',
          worlds: 'dashboard',
          mission: 'worlds',
          quiz: 'mission',
        };
        const newView = viewMap[state.currentView];
        set({ currentView: newView });
      },

      // Player actions
      setPlayerName: (name) => set({ playerName: name }),

      addPoints: (points) => set((state) => {
        const newTotal = state.totalPoints + points;
        const newMedals = [...state.medals];
        if (newTotal >= 500 && !state.medals.find(m => m.id === 'mathWhiz')) {
          newMedals.push({
            id: 'mathWhiz',
            ...MEDAL_DEFINITIONS.mathWhiz,
            earnedAt: Date.now(),
          });
        }
        return { totalPoints: newTotal, medals: newMedals };
      }),

      incrementStreak: () => set((state) => {
        const newStreak = state.streak + 1;
        const newMaxStreak = Math.max(newStreak, state.maxStreak);
        const newMedals = [...state.medals];
        
        if (newStreak >= 5 && !state.medals.find(m => m.id === 'streak5')) {
          newMedals.push({
            id: 'streak5',
            ...MEDAL_DEFINITIONS.streak5,
            earnedAt: Date.now(),
          });
        }
        if (newStreak >= 10 && !state.medals.find(m => m.id === 'streak10')) {
          newMedals.push({
            id: 'streak10',
            ...MEDAL_DEFINITIONS.streak10,
            earnedAt: Date.now(),
          });
        }
        
        return { streak: newStreak, maxStreak: newMaxStreak, medals: newMedals };
      }),

      resetStreak: () => set({ streak: 0 }),

      // Progress actions
      completeMission: (missionId, correct, total) => set((state) => {
        const existing = state.missionProgress[missionId];
        const newMedals = [...state.medals];
        
        const progress: MissionProgress = {
          completed: correct === total || (existing?.completed ?? false),
          bestScore: Math.max(correct, existing?.bestScore ?? 0),
          attempts: (existing?.attempts ?? 0) + 1,
          correctAnswers: Math.max(correct, existing?.correctAnswers ?? 0),
          totalQuestions: total,
        };

        const newMissionProgress = { ...state.missionProgress, [missionId]: progress };

        // Check medals
        if (correct === total && !state.medals.find(m => m.id === `perfect_${missionId}`)) {
          newMedals.push({
            id: `perfect_${missionId}`,
            name: 'Puntuación Perfecta',
            icon: '💎',
            description: `Perfecta en la misión`,
            earnedAt: Date.now(),
          });
        }

        const firstMissionId = Object.keys(newMissionProgress)[0];
        if (firstMissionId && !state.medals.find(m => m.id === 'firstMission')) {
          newMedals.push({
            id: 'firstMission',
            ...MEDAL_DEFINITIONS.firstMission,
            earnedAt: Date.now(),
          });
        }

        const missionCount = Object.keys(newMissionProgress).length;
        if (missionCount >= 5 && !state.medals.find(m => m.id === 'explorer')) {
          newMedals.push({
            id: 'explorer',
            ...MEDAL_DEFINITIONS.explorer,
            earnedAt: Date.now(),
          });
        }

        return { missionProgress: newMissionProgress, medals: newMedals };
      }),

      addMedal: (medal) => set((state) => ({
        medals: [...state.medals, { ...medal, earnedAt: Date.now() }],
      })),

      // Helpers
      getMissionProgress: (missionId) => {
        return get().missionProgress[missionId] || null;
      },

      getGradeProgress: (gradeId, missionIds) => {
        const state = get();
        const completed = missionIds.filter(id => state.missionProgress[id]?.completed).length;
        return missionIds.length > 0 ? Math.round((completed / missionIds.length) * 100) : 0;
      },
    }),
    {
      name: 'mategame-storage',
      partialize: (state) => ({
        playerName: state.playerName,
        totalPoints: state.totalPoints,
        streak: state.streak,
        maxStreak: state.maxStreak,
        missionProgress: state.missionProgress,
        medals: state.medals,
      }),
    }
  )
);
