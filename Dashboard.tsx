import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { GRADES, MEDALS } from "@/lib/gameData";

export default function Dashboard() {
  const {
    playerName,
    totalPoints,
    bestStreak,
    earnedMedals,
    missionProgress,
    selectGrade,
    goBack,
    navigateTo,
  } = useGameStore();

  const overallProgress = (() => {
    const totalMissions = GRADES.reduce((sum, g) => sum + g.missions.length, 0);
    const completedMissions = missionProgress.filter((p) => p.completed).length;
    return totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;
  })();

  const getGradeProgress = (gradeId: number) => {
    const grade = GRADES.find((g) => g.id === gradeId);
    if (!grade) return 0;
    const total = grade.missions.length;
    const completed = missionProgress.filter(
      (p) => p.gradeId === gradeId && p.completed
    ).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const totalAttempts = missionProgress.reduce((sum, p) => sum + p.attempts, 0);
  const totalCorrect = missionProgress.reduce((sum, p) => sum + p.correctAnswers, 0);
  const uniqueGrades = new Set(missionProgress.map((p) => p.gradeId)).size;
  const perfectScores = missionProgress.filter(
    (p) => p.completed && p.correctAnswers === p.totalQuestions
  ).length;

  const earnedMedalDetails = MEDALS.filter((m) => earnedMedals.includes(m.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={goBack}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Volver"
          >
            ← Volver
          </button>
          <h1
            className="text-lg font-bold text-gray-800"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🧮 MateGame
          </h1>
          <button
            onClick={() => navigateTo("medals")}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-xl"
            aria-label="Medallas"
          >
            🏅
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            ¡Hola, {playerName}! 👋
          </h2>
          <div className="flex gap-6 mt-3">
            <div className="text-center">
              <p className="text-2xl font-bold">{totalPoints}</p>
              <p className="text-sm opacity-80">⭐ Puntos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{bestStreak}</p>
              <p className="text-sm opacity-80">🔥 Mejor racha</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{earnedMedals.length}</p>
              <p className="text-sm opacity-80">🏅 Medallas</p>
            </div>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h3
            className="text-sm font-semibold text-gray-500 mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Progreso General
          </h3>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-right text-sm text-gray-500 mt-1">{overallProgress}%</p>
        </motion.div>

        {/* Grade Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GRADES.map((grade, index) => {
            const progress = getGradeProgress(grade.id);
            return (
              <motion.button
                key={grade.id}
                onClick={() => selectGrade(grade.id)}
                className="bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-all border-b-4"
                style={{ borderBottomColor: grade.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{grade.emoji}</span>
                  <div>
                    <h4
                      className="font-bold text-gray-800"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {grade.name}
                    </h4>
                    <p className="text-xs text-gray-500">{grade.ageRange}</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: grade.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.06 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">{progress}%</p>
              </motion.button>
            );
          })}
        </div>

        {/* Recent Medals */}
        {earnedMedalDetails.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl p-5 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3
              className="text-sm font-semibold text-gray-500 mb-3"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🏅 Medallas Recientes
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {earnedMedalDetails.map((medal) => (
                <div
                  key={medal.id}
                  className="flex-shrink-0 flex flex-col items-center bg-yellow-50 rounded-xl p-3 min-w-[90px]"
                >
                  <span className="text-3xl mb-1">{medal.emoji}</span>
                  <span
                    className="text-xs font-semibold text-yellow-800 text-center"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {medal.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3
            className="text-sm font-semibold text-gray-500 mb-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            📈 Estadísticas Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-blue-600">{totalAttempts}</p>
              <p className="text-xs text-blue-500 font-medium">Intentos</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-green-600">{totalCorrect}</p>
              <p className="text-xs text-green-500 font-medium">Correctas</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-purple-600">{uniqueGrades}</p>
              <p className="text-xs text-purple-500 font-medium">Grados explorados</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-yellow-600">{perfectScores}</p>
              <p className="text-xs text-yellow-500 font-medium">Puntuaciones perfectas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
