import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { MEDALS } from "@/lib/gameData";

export default function Medals() {
  const { earnedMedals, totalPoints, goBack } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Yellow gradient header */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-amber-400 px-4 pt-6 pb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
          <button
            onClick={goBack}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors text-yellow-900"
            aria-label="Volver"
          >
            ←
          </button>
          <h1
            className="text-xl font-bold text-yellow-900"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            🏅 Colección de Medallas
          </h1>
          <div className="w-10" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl">🏅</span>
          <span
            className="text-4xl font-extrabold text-yellow-900"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {earnedMedals.length} / {MEDALS.length}
          </span>
        </div>
        <p
          className="text-yellow-800 mt-1 font-medium"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          ¡Sigue jugando para desbloquear más!
        </p>
      </motion.div>

      {/* Medal Grid */}
      <div className="max-w-2xl mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MEDALS.map((medal, index) => {
            const isEarned = earnedMedals.includes(medal.id);

            return (
              <motion.div
                key={medal.id}
                className={`rounded-2xl p-4 text-center shadow-sm ${
                  isEarned
                    ? "bg-yellow-50 border-2 border-yellow-300"
                    : "bg-gray-100 border-2 border-gray-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                whileHover={isEarned ? { scale: 1.05, y: -2 } : {}}
              >
                <div className="text-4xl mb-2">
                  {isEarned ? medal.emoji : "🔒"}
                </div>
                <h3
                  className={`text-sm font-bold mb-1 ${
                    isEarned ? "text-yellow-800" : "text-gray-400"
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {medal.name}
                </h3>
                <p
                  className={`text-xs ${
                    isEarned ? "text-yellow-600" : "text-gray-400"
                  }`}
                >
                  {isEarned ? medal.description : medal.requirement}
                </p>
                {isEarned && (
                  <motion.span
                    className="inline-block mt-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      delay: index * 0.07 + 0.3,
                    }}
                  >
                    ✓ Obtenida
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Points Counter */}
        <motion.div
          className="mt-6 mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p
            className="text-sm font-medium opacity-80 mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Puntos Totales
          </p>
          <p
            className="text-4xl font-extrabold"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {totalPoints} ⭐
          </p>
          <p
            className="text-sm opacity-70 mt-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            ¡Sigue jugando para ganar más puntos y medallas!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
