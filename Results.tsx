import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useGameStore } from "@/lib/gameStore";
import { GRADES, MEDALS } from "@/lib/gameData";

export default function Results() {
  const {
    selectedGradeId,
    selectedMissionId,
    currentScore,
    currentCorrect,
    quizQuestions,
    quizStartTime,
    goBack,
    navigateTo,
    missionProgress,
    earnedMedals,
  } = useGameStore();

  const grade = GRADES.find((g) => g.id === selectedGradeId);
  const mission = grade?.missions.find((m) => m.id === selectedMissionId);

  const totalQuestions = quizQuestions.length;
  const totalErrors = totalQuestions - currentCorrect;
  const accuracy = totalQuestions > 0 ? Math.round((currentCorrect / totalQuestions) * 100) : 0;
  const timeElapsed = quizStartTime
    ? Math.round((Date.now() - quizStartTime) / 1000)
    : 0;

  // Performance emoji and message
  const getPerformance = () => {
    if (accuracy >= 90) return { emoji: "🏆", message: "¡Excelente!", color: "#58CC02" };
    if (accuracy >= 70) return { emoji: "🌟", message: "¡Muy bien!", color: "#1CB0F6" };
    if (accuracy >= 50) return { emoji: "👍", message: "¡Buen intento!", color: "#FFC800" };
    return { emoji: "💪", message: "¡Sigue practicando!", color: "#FF6B6B" };
  };

  const performance = getPerformance();

  // Confetti on mount for good results
  useEffect(() => {
    if (accuracy >= 70) {
      const duration = accuracy >= 90 ? 3000 : 1500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#58CC02", "#FFC800", "#1CB0F6", "#FF6B6B", "#CE82FF"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#58CC02", "#FFC800", "#1CB0F6", "#FF6B6B", "#CE82FF"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [accuracy]);

  // Find newly earned medals for this mission
  const missionProgressData = missionProgress.find(
    (p) => p.missionId === selectedMissionId
  );
  const earnedMedalDetails = MEDALS.filter((m) => earnedMedals.includes(m.id));

  const handlePlayAgain = () => {
    if (mission) {
      const { startQuiz } = useGameStore.getState();
      startQuiz(mission.questions, mission.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Performance Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-7xl block mb-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {performance.emoji}
          </motion.span>
          <h1
            className="text-3xl font-extrabold"
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: performance.color,
            }}
          >
            {performance.message}
          </h1>
        </motion.div>

        {/* Score Card */}
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p
            className="text-sm font-medium opacity-80 mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Puntuación
          </p>
          <p
            className="text-5xl font-extrabold"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {currentScore} ⭐
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{currentCorrect}</p>
            <p className="text-xs text-green-500 font-medium">✅ Correctas</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{totalErrors}</p>
            <p className="text-xs text-red-500 font-medium">❌ Errores</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{timeElapsed}s</p>
            <p className="text-xs text-blue-500 font-medium">⏱️ Tiempo</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
            <p className="text-xs text-purple-500 font-medium">🎯 Precisión</p>
          </div>
        </motion.div>

        {/* Accuracy Progress Bar */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3
            className="text-sm font-semibold text-gray-500 mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Precisión
          </h3>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: performance.color }}
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-right text-sm text-gray-500 mt-1">{accuracy}%</p>
        </motion.div>

        {/* Mission Info Card */}
        {mission && grade && (
          <motion.div
            className="bg-white rounded-2xl p-5 shadow-sm"
            style={{ borderLeft: `4px solid ${grade.color}` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{mission.emoji}</span>
              <div>
                <h3
                  className="font-bold text-gray-800"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {mission.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {grade.name} • {mission.description}
                </p>
              </div>
            </div>
            {missionProgressData && (
              <p className="text-xs text-gray-400 mt-2">
                Intentos: {missionProgressData.attempts} • Mejor puntuación:{" "}
                {missionProgressData.bestScore} ⭐
              </p>
            )}
          </motion.div>
        )}

        {/* Earned Medals */}
        {earnedMedalDetails.length > 0 && (
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
              🏅 Medallas Obtenidas
            </h3>
            <div className="flex flex-wrap gap-2">
              {earnedMedalDetails.map((medal) => (
                <div
                  key={medal.id}
                  className="flex items-center gap-2 bg-yellow-50 rounded-xl px-3 py-2"
                >
                  <span className="text-2xl">{medal.emoji}</span>
                  <div>
                    <p
                      className="text-sm font-bold text-yellow-800"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {medal.name}
                    </p>
                    <p className="text-xs text-yellow-600">{medal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.button
            onClick={handlePlayAgain}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            🔄 Jugar de Nuevo
          </motion.button>

          <motion.button
            onClick={goBack}
            className="w-full py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            🗺️ Volver al Mapa
          </motion.button>

          <motion.button
            onClick={() => navigateTo("dashboard")}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 font-bold text-lg shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            📊 Ver Mi Panel
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
