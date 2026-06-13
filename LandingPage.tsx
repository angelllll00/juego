import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { GRADES } from "@/lib/gameData";

const MATH_EMOJIS = ["➕", "➖", "✖️", "➗", "🔢", "📐", "📏", "🧮", "💡", "⭐", "🎯", "🏆"];

export default function LandingPage() {
  const { navigateTo, selectGrade, playerName, setPlayerName } = useGameStore();
  const [showGrades, setShowGrades] = useState(false);
  const [inputName, setInputName] = useState("");
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  const floatingPositions = useMemo(() => {
    if (!mounted) return [];
    return MATH_EMOJIS.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      size: 16 + Math.random() * 24,
    }));
  }, [mounted]);

  const handleStart = () => {
    if (!inputName.trim()) return;
    setPlayerName(inputName.trim());
    setShowGrades(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleStart();
  };

  const handleGradeSelect = (gradeId: number) => {
    selectGrade(gradeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 relative overflow-hidden">
      {/* Floating math emojis */}
      {floatingPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none opacity-20"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            fontSize: `${pos.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {MATH_EMOJIS[i]}
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {!showGrades ? (
          <motion.div
            className="flex flex-col items-center max-w-md w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <motion.div
              className="relative mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                <span className="text-5xl">🧮</span>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <span className="text-sm font-bold text-yellow-800">M</span>
              </div>
            </motion.div>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl font-extrabold mb-2"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              <span className="text-green-800">Mate</span>
              <span className="text-yellow-300">Game</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-green-900 text-lg md:text-xl mb-8 font-semibold"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Aprende matemáticas jugando 🎮
            </p>

            {/* Name input */}
            <div className="w-full max-w-sm mb-4">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu nombre..."
                className="w-full px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 shadow-lg border-2 border-white/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 text-lg transition-all"
                style={{ fontFamily: "'Nunito', sans-serif" }}
                maxLength={20}
              />
            </div>

            {/* Start button */}
            <motion.button
              onClick={handleStart}
              disabled={!inputName.trim()}
              className={`w-full max-w-sm px-6 py-3 rounded-2xl text-lg font-bold shadow-lg transition-all ${
                inputName.trim()
                  ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
              whileTap={inputName.trim() ? { scale: 0.97 } : undefined}
            >
              ¡Empezar a Jugar! 🚀
            </motion.button>

            {/* Progress panel button if returning player */}
            {playerName && (
              <motion.button
                onClick={() => navigateTo("dashboard")}
                className="mt-4 px-6 py-2 bg-white/30 backdrop-blur-sm rounded-2xl text-green-900 font-semibold hover:bg-white/40 transition-all"
                style={{ fontFamily: "'Nunito', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                📊 Mi Panel de Progreso
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-white text-center mb-6"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              ¡Hola, {inputName.trim()}! Elige tu grado 📚
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GRADES.map((grade, index) => (
                <motion.button
                  key={grade.id}
                  onClick={() => handleGradeSelect(grade.id)}
                  className="bg-white rounded-2xl shadow-lg p-5 text-left hover:shadow-xl transition-all border-b-4"
                  style={{ borderBottomColor: grade.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-4xl mb-2">{grade.emoji}</div>
                  <h3
                    className="text-lg font-bold text-gray-800 mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {grade.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{grade.ageRange}</p>
                  <p className="text-sm text-gray-600">{grade.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Progress panel button */}
            <div className="text-center mt-6">
              <motion.button
                onClick={() => navigateTo("dashboard")}
                className="px-6 py-2 bg-white/30 backdrop-blur-sm rounded-2xl text-white font-semibold hover:bg-white/40 transition-all"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                📊 Mi Panel de Progreso
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
