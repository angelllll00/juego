import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { GRADES } from "@/lib/gameData";

export default function WorldMap() {
  const { selectedGradeId, missionProgress, startQuiz, goBack } = useGameStore();

  const grade = GRADES.find((g) => g.id === selectedGradeId);

  if (!grade) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Grado no encontrado</p>
      </div>
    );
  }

  const completedMissions = missionProgress.filter(
    (p) => p.gradeId === grade.id && p.completed
  ).length;
  const gradeProgress = Math.round(
    (completedMissions / grade.missions.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
          <button
            onClick={goBack}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Volver"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{grade.emoji}</span>
            <h1
              className="text-lg font-bold text-gray-800"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {grade.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Grade Progress Card */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm"
          style={{ borderLeft: `4px solid ${grade.color}` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2
              className="font-bold text-gray-800"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {grade.emoji} {grade.name}
            </h2>
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: grade.color }}
            >
              {gradeProgress}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{grade.description}</p>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: grade.color }}
              initial={{ width: 0 }}
              animate={{ width: `${gradeProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {completedMissions} de {grade.missions.length} misiones completadas
          </p>
        </motion.div>

        {/* Mission List */}
        <div className="space-y-3">
          {grade.missions.map((mission, index) => {
            const progress = missionProgress.find(
              (p) => p.missionId === mission.id
            );
            const isCompleted = progress?.completed || false;
            const missionScore = progress?.bestScore || 0;
            const missionProgressPercent = progress
              ? Math.round(
                  (progress.correctAnswers / progress.totalQuestions) * 100
                )
              : 0;

            return (
              <motion.div
                key={mission.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div
                  className="flex items-stretch"
                  style={{
                    borderLeft: `4px solid ${isCompleted ? "#58CC02" : mission.color}`,
                  }}
                >
                  {/* Mission icon */}
                  <div className="flex items-center justify-center px-4 relative">
                    <span className="text-3xl">{mission.emoji}</span>
                    {isCompleted && (
                      <span className="absolute -top-1 -right-1 text-sm bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Mission content */}
                  <div className="flex-1 py-4 pr-4">
                    <h3
                      className="font-bold text-gray-800"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {mission.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {mission.description}
                    </p>

                    {progress && (
                      <div className="mt-2">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: isCompleted
                                ? "#58CC02"
                                : mission.color,
                              width: `${missionProgressPercent}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Puntuación: {missionScore} ⭐ • {progress.attempts}{" "}
                          intento{progress.attempts !== 1 ? "s" : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Play button */}
                  <div className="flex items-center pr-4">
                    <motion.button
                      onClick={() => startQuiz(mission.questions, mission.id)}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-md"
                      style={{ backgroundColor: mission.color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isCompleted ? "🔄" : "▶️"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip Section */}
        <motion.div
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p
            className="text-amber-800 text-sm font-medium"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            💡 <strong>Consejo:</strong> ¡Completa todas las misiones para
            desbloquear medallas! Puedes repetir misiones para mejorar tu
            puntuación.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
