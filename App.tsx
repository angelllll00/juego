import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "./lib/gameStore";
import LandingPage from "./components/mategame/LandingPage";
import Dashboard from "./components/mategame/Dashboard";
import WorldMap from "./components/mategame/WorldMap";
import QuizGame from "./components/mategame/QuizGame";
import Results from "./components/mategame/Results";
import Medals from "./components/mategame/Medals";

export default function App() {
  const currentView = useGameStore((s) => s.currentView);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <AnimatePresence mode="wait">
        <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {currentView === "landing" && <LandingPage />}
          {currentView === "dashboard" && <Dashboard />}
          {currentView === "worldMap" && <WorldMap />}
          {currentView === "quiz" && <QuizGame />}
          {currentView === "results" && <Results />}
          {currentView === "medals" && <Medals />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
