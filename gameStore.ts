import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question } from "./gameData";

export type AppView = "landing" | "dashboard" | "worldMap" | "quiz" | "results" | "medals";

export interface MissionProgress {
  missionId: string;
  gradeId: number;
  completed: boolean;
  bestScore: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
}

interface GameStore {
  currentView: AppView;
  selectedGradeId: number | null;
  selectedMissionId: string | null;
  playerName: string;
  totalPoints: number;
  currentStreak: number;
  bestStreak: number;
  missionProgress: MissionProgress[];
  earnedMedals: string[];
  currentQuestionIndex: number;
  currentScore: number;
  currentCorrect: number;
  quizQuestions: Question[];
  quizStartTime: number | null;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  selectedAnswerIndex: number | null;

  navigateTo: (view: AppView) => void;
  selectGrade: (gradeId: number) => void;
  goBack: () => void;
  setPlayerName: (name: string) => void;
  startQuiz: (questions: Question[], missionId: string) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
}

const viewHistory: AppView[] = [];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentView: "landing",
      selectedGradeId: null,
      selectedMissionId: null,
      playerName: "",
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      missionProgress: [],
      earnedMedals: [],
      currentQuestionIndex: 0,
      currentScore: 0,
      currentCorrect: 0,
      quizQuestions: [],
      quizStartTime: null,
      showFeedback: false,
      lastAnswerCorrect: null,
      selectedAnswerIndex: null,

      navigateTo: (view) => { viewHistory.push(get().currentView); set({ currentView: view }); },
      selectGrade: (gradeId) => { viewHistory.push(get().currentView); set({ selectedGradeId: gradeId, currentView: "worldMap" }); },
      goBack: () => { const prev = viewHistory.pop() || "landing"; set({ currentView: prev }); },
      setPlayerName: (name) => set({ playerName: name }),

      startQuiz: (questions, missionId) => {
        const shuffledQuestions = questions.map((q) => {
          const correctAnswer = q.options[q.correctIndex];
          const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
          const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
          return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
        });
        viewHistory.push(get().currentView);
        set({
          quizQuestions: shuffledQuestions, currentQuestionIndex: 0, currentScore: 0,
          currentCorrect: 0, quizStartTime: Date.now(), showFeedback: false,
          lastAnswerCorrect: null, selectedAnswerIndex: null, selectedMissionId: missionId, currentView: "quiz",
        });
      },

      answerQuestion: (answerIndex) => {
        const state = get();
        const question = state.quizQuestions[state.currentQuestionIndex];
        if (!question) return;
        const isCorrect = answerIndex === question.correctIndex;
        const newStreak = isCorrect ? state.currentStreak + 1 : 0;
        set({
          showFeedback: true, lastAnswerCorrect: isCorrect, selectedAnswerIndex: answerIndex,
          currentScore: state.currentScore + (isCorrect ? 10 : 0),
          currentCorrect: state.currentCorrect + (isCorrect ? 1 : 0),
          currentStreak: newStreak, bestStreak: Math.max(state.bestStreak, newStreak),
          totalPoints: state.totalPoints + (isCorrect ? 10 : 0),
        });
      },

      nextQuestion: () => {
        const state = get();
        const nextIndex = state.currentQuestionIndex + 1;
        if (nextIndex >= state.quizQuestions.length) {
          const gradeId = state.selectedGradeId;
          const missionId = state.selectedMissionId;
          if (gradeId && missionId) {
            const existing = state.missionProgress.find((p) => p.missionId === missionId);
            const completed = state.quizQuestions.length > 0 && state.currentCorrect / state.quizQuestions.length >= 0.6;
            const newProgress: MissionProgress = existing
              ? { ...existing, attempts: existing.attempts + 1, bestScore: Math.max(existing.bestScore, state.currentScore),
                  correctAnswers: Math.max(existing.correctAnswers, state.currentCorrect),
                  completed: existing.completed || completed, }
              : { missionId, gradeId, attempts: 1, bestScore: state.currentScore, correctAnswers: state.currentCorrect,
                  totalQuestions: state.quizQuestions.length, completed, };
            const updatedProgress = existing
              ? state.missionProgress.map((p) => p.missionId === missionId ? newProgress : p)
              : [...state.missionProgress, newProgress];
            const newMedals = [...state.earnedMedals];
            if (!newMedals.includes("first-mission") && updatedProgress.some((p) => p.completed)) newMedals.push("first-mission");
            if (!newMedals.includes("perfect-score") && newProgress.completed && newProgress.correctAnswers === newProgress.totalQuestions) newMedals.push("perfect-score");
            if (!newMedals.includes("streak-5") && state.bestStreak >= 5) newMedals.push("streak-5");
            const uniqueGrades = new Set(updatedProgress.map((p) => p.gradeId));
            if (!newMedals.includes("explorer") && uniqueGrades.size >= 3) newMedals.push("explorer");
            if (!newMedals.includes("math-hero") && state.totalPoints >= 500) newMedals.push("math-hero");
            if (!newMedals.includes("persistent") && newProgress.attempts >= 3) newMedals.push("persistent");
            set({ missionProgress: updatedProgress, earnedMedals: newMedals, currentView: "results" });
          } else { set({ currentView: "results" }); }
        } else {
          set({ currentQuestionIndex: nextIndex, showFeedback: false, lastAnswerCorrect: null, selectedAnswerIndex: null });
        }
      },
    }),
    { name: "mategame-storage", partialize: (state) => ({
      playerName: state.playerName, totalPoints: state.totalPoints, bestStreak: state.bestStreak,
      missionProgress: state.missionProgress, earnedMedals: state.earnedMedals,
    })}
  )
);
