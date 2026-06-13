// ============================================================
// MateGame - Data Models & Content
// ============================================================

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  emoji: string;
  hint: string;
}

export interface Mission {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  totalQuestions: number;
  questions: Question[];
}

export interface Grade {
  id: number;
  name: string;
  emoji: string;
  color: string;
  ageRange: string;
  description: string;
  missions: Mission[];
}

export interface Medal {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: string;
}

export const GRADES: Grade[] = [
  {
    id: 1, name: "1. Grado", emoji: "🌟", color: "#FF6B6B", ageRange: "6-7 años",
    description: "Sumas, restas y los primeros números",
    missions: [
      { id: "1-arit", name: "Isla de las Sumas", emoji: "🏝️", description: "Aprende a sumar números pequeños", color: "#58CC02", totalQuestions: 5,
        questions: [
          { id: "1-arit-1", text: "¿Cuánto es 2 + 3?", options: ["4", "5", "6"], correctIndex: 1, emoji: "🍎", hint: "Cuenta con los dedos: 2 + 3" },
          { id: "1-arit-2", text: "¿Cuánto es 1 + 4?", options: ["3", "5", "6"], correctIndex: 1, emoji: "🐸", hint: "1 pato + 4 patos = ?" },
          { id: "1-arit-3", text: "¿Cuánto es 3 + 3?", options: ["5", "6", "7"], correctIndex: 1, emoji: "🌺", hint: "3 flores + 3 flores" },
          { id: "1-arit-4", text: "¿Cuánto es 5 + 2?", options: ["6", "7", "8"], correctIndex: 1, emoji: "🐱", hint: "5 gatitos + 2 gatitos" },
          { id: "1-arit-5", text: "¿Cuánto es 4 + 1?", options: ["4", "5", "6"], correctIndex: 1, emoji: "⭐", hint: "4 + 1 = ?" },
        ],
      },
      { id: "1-rest", name: "Bosque de las Restas", emoji: "🌲", description: "Aprende a restar paso a paso", color: "#1CB0F6", totalQuestions: 5,
        questions: [
          { id: "1-rest-1", text: "¿Cuánto es 5 - 2?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🍪", hint: "5 galletas - 2 galletas" },
          { id: "1-rest-2", text: "¿Cuánto es 4 - 1?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🎈", hint: "4 globos, se voló 1" },
          { id: "1-rest-3", text: "¿Cuánto es 6 - 3?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🦋", hint: "6 mariposas - 3" },
          { id: "1-rest-4", text: "¿Cuánto es 8 - 4?", options: ["3", "4", "5"], correctIndex: 1, emoji: "🐟", hint: "8 peces - 4" },
          { id: "1-rest-5", text: "¿Cuánto es 7 - 2?", options: ["4", "5", "6"], correctIndex: 1, emoji: "🖍️", hint: "7 colores - 2" },
        ],
      },
      { id: "1-num", name: "Montaña de los Números", emoji: "⛰️", description: "Conoce los números del 1 al 20", color: "#CE82FF", totalQuestions: 5,
        questions: [
          { id: "1-num-1", text: "¿Qué número va después del 9?", options: ["8", "10", "11"], correctIndex: 1, emoji: "🔢", hint: "Cuenta: 8, 9, ?" },
          { id: "1-num-2", text: "¿Cuál es mayor: 12 o 15?", options: ["12", "15", "Son iguales"], correctIndex: 1, emoji: "📏", hint: "Piensa en una regla" },
          { id: "1-num-3", text: "¿Qué número va antes del 7?", options: ["5", "6", "8"], correctIndex: 1, emoji: "🎯", hint: "Cuenta hacia atrás" },
          { id: "1-num-4", text: "¿Cuántos dedos tienes en las dos manos?", options: ["8", "10", "12"], correctIndex: 1, emoji: "✋", hint: "5 + 5 = ?" },
          { id: "1-num-5", text: "¿Cuánto es 10 + 5?", options: ["14", "15", "16"], correctIndex: 1, emoji: "📝", hint: "10 + 5 = ?" },
        ],
      },
    ],
  },
  {
    id: 2, name: "2. Grado", emoji: "🌈", color: "#FF9F43", ageRange: "7-8 años",
    description: "Sumas y restas más grandes, formas geométricas",
    missions: [
      { id: "2-arit", name: "Castillo de las Sumas", emoji: "🏰", description: "Sumas con números hasta 100", color: "#58CC02", totalQuestions: 5,
        questions: [
          { id: "2-arit-1", text: "¿Cuánto es 15 + 20?", options: ["30", "35", "45"], correctIndex: 1, emoji: "🏰", hint: "15 + 20 = ?" },
          { id: "2-arit-2", text: "¿Cuánto es 28 + 14?", options: ["32", "42", "52"], correctIndex: 1, emoji: "📚", hint: "Suma las unidades primero" },
          { id: "2-arit-3", text: "¿Cuánto es 33 + 27?", options: ["50", "60", "70"], correctIndex: 1, emoji: "🎯", hint: "33 + 27 = ?" },
          { id: "2-arit-4", text: "¿Cuánto es 40 + 35?", options: ["65", "75", "85"], correctIndex: 1, emoji: "🎪", hint: "40 + 30 + 5" },
          { id: "2-arit-5", text: "¿Cuánto es 19 + 23?", options: ["32", "42", "52"], correctIndex: 1, emoji: "🎨", hint: "19 + 20 + 3" },
        ],
      },
      { id: "2-geo", name: "Jardín de las Formas", emoji: "🔷", description: "Conoce las figuras geométricas", color: "#CE82FF", totalQuestions: 5,
        questions: [
          { id: "2-geo-1", text: "¿Figura con 4 lados iguales?", options: ["Círculo", "Cuadrado", "Triángulo"], correctIndex: 1, emoji: "⬜", hint: "Cuatro lados iguales = cuadrado" },
          { id: "2-geo-2", text: "¿Cuántos lados tiene un triángulo?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🔺", hint: "Tri = tres" },
          { id: "2-geo-3", text: "¿Figura sin esquinas?", options: ["Rectángulo", "Círculo", "Cuadrado"], correctIndex: 1, emoji: "⭕", hint: "Piensa en una pelota" },
          { id: "2-geo-4", text: "¿Cuántos lados tiene un rectángulo?", options: ["3", "4", "5"], correctIndex: 1, emoji: "🟦", hint: "2 lados largos y 2 cortos" },
          { id: "2-geo-5", text: "¿Forma de un dado?", options: ["Esfera", "Cubo", "Cilindro"], correctIndex: 1, emoji: "🎲", hint: "6 caras cuadradas" },
        ],
      },
    ],
  },
  {
    id: 3, name: "3. Grado", emoji: "🚀", color: "#1CB0F6", ageRange: "8-9 años",
    description: "Multiplicación, división y fracciones simples",
    missions: [
      { id: "3-mult", name: "Galaxia de la Multiplicación", emoji: "🌌", description: "Aprende las tablas de multiplicar", color: "#58CC02", totalQuestions: 5,
        questions: [
          { id: "3-mult-1", text: "¿Cuánto es 3 × 4?", options: ["10", "12", "14"], correctIndex: 1, emoji: "🚀", hint: "3 grupos de 4" },
          { id: "3-mult-2", text: "¿Cuánto es 5 × 6?", options: ["25", "30", "35"], correctIndex: 1, emoji: "⭐", hint: "5 + 5 + 5 + 5 + 5 + 5" },
          { id: "3-mult-3", text: "¿Cuánto es 7 × 3?", options: ["18", "21", "24"], correctIndex: 1, emoji: "🌍", hint: "7 + 7 + 7" },
          { id: "3-mult-4", text: "¿Cuánto es 8 × 5?", options: ["30", "40", "50"], correctIndex: 1, emoji: "💫", hint: "5 × 8 = 8 × 5" },
          { id: "3-mult-5", text: "¿Cuánto es 9 × 4?", options: ["32", "36", "40"], correctIndex: 1, emoji: "🛸", hint: "9 + 9 + 9 + 9" },
        ],
      },
      { id: "3-div", name: "Volcán de la División", emoji: "🌋", description: "Divide y reparte equitativamente", color: "#FF6B6B", totalQuestions: 5,
        questions: [
          { id: "3-div-1", text: "¿Cuánto es 12 ÷ 3?", options: ["3", "4", "5"], correctIndex: 1, emoji: "🍬", hint: "12 caramelos entre 3 amigos" },
          { id: "3-div-2", text: "¿Cuánto es 20 ÷ 4?", options: ["4", "5", "6"], correctIndex: 1, emoji: "🍎", hint: "20 manzanas en 4 cajas" },
          { id: "3-div-3", text: "¿Cuánto es 15 ÷ 5?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🍰", hint: "15 rebanadas entre 5 personas" },
          { id: "3-div-4", text: "¿Cuánto es 18 ÷ 6?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🎯", hint: "18 dividido entre 6" },
          { id: "3-div-5", text: "¿Cuánto es 24 ÷ 8?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🎪", hint: "24 entre 8" },
        ],
      },
      { id: "3-frac", name: "Isla de las Fracciones", emoji: "🍕", description: "Mitades, tercios y cuartos", color: "#FFC800", totalQuestions: 5,
        questions: [
          { id: "3-frac-1", text: "¿Qué es la mitad de 8?", options: ["3", "4", "5"], correctIndex: 1, emoji: "🍕", hint: "8 ÷ 2 = ?" },
          { id: "3-frac-2", text: "¿1/2 de 10?", options: ["4", "5", "6"], correctIndex: 1, emoji: "🎂", hint: "La mitad de 10" },
          { id: "3-frac-3", text: "Pizza en 4 partes iguales = ?", options: ["1/2", "1/3", "1/4"], correctIndex: 2, emoji: "🍕", hint: "4 partes = un cuarto" },
          { id: "3-frac-4", text: "¿1/3 de 9?", options: ["2", "3", "4"], correctIndex: 1, emoji: "🍫", hint: "9 ÷ 3 = ?" },
          { id: "3-frac-5", text: "¿Cuál es mayor: 1/2 o 1/4?", options: ["1/2", "1/4", "Son iguales"], correctIndex: 0, emoji: "🧁", hint: "La mitad es más grande" },
        ],
      },
    ],
  },
  {
    id: 4, name: "4. Grado", emoji: "⚡", color: "#CE82FF", ageRange: "9-10 años",
    description: "Fracciones, decimales y geometría avanzada",
    missions: [
      { id: "4-frac", name: "Mundo de las Fracciones", emoji: "🧩", description: "Suma y resta fracciones", color: "#CE82FF", totalQuestions: 5,
        questions: [
          { id: "4-frac-1", text: "¿1/4 + 2/4?", options: ["1/2", "3/4", "1"], correctIndex: 1, emoji: "🧩", hint: "Mismo denominador: suma numeradores" },
          { id: "4-frac-2", text: "¿3/5 - 1/5?", options: ["1/5", "2/5", "3/5"], correctIndex: 1, emoji: "🎯", hint: "3 - 1 = 2" },
          { id: "4-frac-3", text: "¿Equivalente a 1/2?", options: ["2/3", "2/4", "3/4"], correctIndex: 1, emoji: "⚖️", hint: "2/4 = 1/2 simplificado" },
          { id: "4-frac-4", text: "¿2/3 + 1/3?", options: ["3/3", "2/3", "1/3"], correctIndex: 0, emoji: "🍕", hint: "2 + 1 = 3, sobre 3" },
          { id: "4-frac-5", text: "¿5/6 - 2/6?", options: ["2/6", "3/6", "4/6"], correctIndex: 1, emoji: "🧁", hint: "5 - 2 = 3" },
        ],
      },
      { id: "4-dec", name: "Ciudad de los Decimales", emoji: "🏙️", description: "Números decimales", color: "#1CB0F6", totalQuestions: 5,
        questions: [
          { id: "4-dec-1", text: "¿0.5 + 0.3?", options: ["0.7", "0.8", "0.9"], correctIndex: 1, emoji: "📏", hint: "5 + 3 = 8 décimos" },
          { id: "4-dec-2", text: "¿Mayor: 0.4 o 0.35?", options: ["0.4", "0.35", "Iguales"], correctIndex: 0, emoji: "⚖️", hint: "0.40 > 0.35" },
          { id: "4-dec-3", text: "¿1.5 - 0.7?", options: ["0.7", "0.8", "0.9"], correctIndex: 1, emoji: "🎯", hint: "1.5 - 0.7 = 0.8" },
          { id: "4-dec-4", text: "¿0.25 es lo mismo que...?", options: ["1/2", "1/4", "1/3"], correctIndex: 1, emoji: "🍪", hint: "25 centavos = 1/4" },
          { id: "4-dec-5", text: "¿2.3 + 1.4?", options: ["3.5", "3.7", "4.1"], correctIndex: 1, emoji: "🎪", hint: "2+1=3, 0.3+0.4=0.7" },
        ],
      },
      { id: "4-geo", name: "Laberinto Geométrico", emoji: "📐", description: "Perímetros y áreas", color: "#58CC02", totalQuestions: 5,
        questions: [
          { id: "4-geo-1", text: "Perímetro de cuadrado lado 5cm", options: ["10 cm", "20 cm", "25 cm"], correctIndex: 1, emoji: "⬜", hint: "4 × 5" },
          { id: "4-geo-2", text: "Área de rectángulo 4×6", options: ["10", "20", "24"], correctIndex: 2, emoji: "🟦", hint: "base × altura" },
          { id: "4-geo-3", text: "Perímetro triángulo 3,4,5 cm", options: ["10 cm", "12 cm", "15 cm"], correctIndex: 1, emoji: "🔺", hint: "Suma los lados" },
          { id: "4-geo-4", text: "Perímetro rectángulo 3×7 cm", options: ["10 cm", "20 cm", "21 cm"], correctIndex: 1, emoji: "📏", hint: "2 × (3+7)" },
          { id: "4-geo-5", text: "Área de cuadrado lado 8", options: ["16", "32", "64"], correctIndex: 2, emoji: "⬛", hint: "8 × 8" },
        ],
      },
    ],
  },
  {
    id: 5, name: "5. Grado", emoji: "🧠", color: "#FF6B6B", ageRange: "10-11 años",
    description: "Operaciones combinadas, porcentajes y volumen",
    missions: [
      { id: "5-ops", name: "Torre de las Operaciones", emoji: "🗼", description: "Operaciones combinadas", color: "#FF6B6B", totalQuestions: 5,
        questions: [
          { id: "5-ops-1", text: "¿3 + 4 × 2?", options: ["11", "14", "10"], correctIndex: 0, emoji: "🧮", hint: "Primero 4×2=8, luego 3+8=11" },
          { id: "5-ops-2", text: "¿(5 + 3) × 2?", options: ["11", "16", "13"], correctIndex: 1, emoji: "🎯", hint: "Primero paréntesis: 5+3=8" },
          { id: "5-ops-3", text: "¿20 - 3 × 4?", options: ["8", "68", "17"], correctIndex: 0, emoji: "⚡", hint: "Primero 3×4=12, luego 20-12" },
          { id: "5-ops-4", text: "¿6 × 3 + 2?", options: ["20", "30", "24"], correctIndex: 0, emoji: "🎪", hint: "6×3=18, luego 18+2" },
          { id: "5-ops-5", text: "¿10 ÷ 2 + 3?", options: ["5", "8", "2"], correctIndex: 1, emoji: "🚀", hint: "10÷2=5, luego 5+3" },
        ],
      },
      { id: "5-pct", name: "Banco de Porcentajes", emoji: "🏦", description: "Calcula porcentajes", color: "#FFC800", totalQuestions: 5,
        questions: [
          { id: "5-pct-1", text: "¿50% de 80?", options: ["30", "40", "50"], correctIndex: 1, emoji: "💰", hint: "50% = la mitad" },
          { id: "5-pct-2", text: "¿25% de 200?", options: ["25", "50", "75"], correctIndex: 1, emoji: "🏷️", hint: "25% = un cuarto" },
          { id: "5-pct-3", text: "10% descuento de $100", options: ["$5", "$10", "$20"], correctIndex: 1, emoji: "🧸", hint: "10% de 100 = 100÷10" },
          { id: "5-pct-4", text: "¿75% de 40?", options: ["20", "25", "30"], correctIndex: 2, emoji: "📊", hint: "75% = 3/4 de 40" },
          { id: "5-pct-5", text: "15 de 20 aprobaron = ?%", options: ["50%", "65%", "75%"], correctIndex: 2, emoji: "🎓", hint: "15/20 = 0.75 = 75%" },
        ],
      },
    ],
  },
  {
    id: 6, name: "6. Grado", emoji: "🏆", color: "#58CC02", ageRange: "11-12 años",
    description: "Álgebra, proporciones y estadística",
    missions: [
      { id: "6-alg", name: "Laboratorio de Álgebra", emoji: "🔬", description: "Ecuaciones simples", color: "#CE82FF", totalQuestions: 5,
        questions: [
          { id: "6-alg-1", text: "Si x + 5 = 12, ¿x?", options: ["5", "7", "8"], correctIndex: 1, emoji: "🔬", hint: "x = 12 - 5" },
          { id: "6-alg-2", text: "Si 3x = 18, ¿x?", options: ["4", "5", "6"], correctIndex: 2, emoji: "🧪", hint: "x = 18 ÷ 3" },
          { id: "6-alg-3", text: "Si 2x + 3 = 11, ¿x?", options: ["3", "4", "5"], correctIndex: 1, emoji: "📐", hint: "2x = 8, x = 4" },
          { id: "6-alg-4", text: "Si x - 7 = 5, ¿x?", options: ["2", "10", "12"], correctIndex: 2, emoji: "🎯", hint: "x = 5 + 7" },
          { id: "6-alg-5", text: "Si 4x = 24, ¿x?", options: ["4", "6", "8"], correctIndex: 1, emoji: "⚡", hint: "x = 24 ÷ 4" },
        ],
      },
      { id: "6-prop", name: "Mercado de Proporciones", emoji: "🏪", description: "Regla de tres", color: "#FFC800", totalQuestions: 5,
        questions: [
          { id: "6-prop-1", text: "3 lápices=$6, ¿5 lápices?", options: ["$8", "$10", "$12"], correctIndex: 1, emoji: "✏️", hint: "1 lápiz = $2" },
          { id: "6-prop-2", text: "4kg manzanas=$20, ¿1kg?", options: ["$4", "$5", "$6"], correctIndex: 1, emoji: "🍎", hint: "$20 ÷ 4" },
          { id: "6-prop-3", text: "120km en 2h, ¿en 5h?", options: ["240 km", "300 km", "350 km"], correctIndex: 1, emoji: "🚗", hint: "60 km/h × 5" },
          { id: "6-prop-4", text: "2/5 de 30 alumnos son niñas", options: ["10", "12", "15"], correctIndex: 1, emoji: "👩‍🎓", hint: "2/5 × 30 = 12" },
          { id: "6-prop-5", text: "5 libros=$45, ¿8 libros?", options: ["$60", "$72", "$80"], correctIndex: 1, emoji: "📚", hint: "1 libro = $9" },
        ],
      },
      { id: "6-stat", name: "Estación de Estadística", emoji: "📊", description: "Media, mediana y moda", color: "#1CB0F6", totalQuestions: 5,
        questions: [
          { id: "6-stat-1", text: "Media de 4, 6, 8", options: ["5", "6", "7"], correctIndex: 1, emoji: "📊", hint: "(4+6+8) ÷ 3" },
          { id: "6-stat-2", text: "Mediana de 3,5,7,9,11", options: ["5", "7", "9"], correctIndex: 1, emoji: "📈", hint: "Valor del medio" },
          { id: "6-stat-3", text: "Moda de 2,4,4,6,8", options: ["2", "4", "6"], correctIndex: 1, emoji: "🎯", hint: "El que más se repite" },
          { id: "6-stat-4", text: "Media de 10, 20, 30", options: ["15", "20", "25"], correctIndex: 1, emoji: "🧮", hint: "(10+20+30) ÷ 3" },
          { id: "6-stat-5", text: "Mediana y moda de 1,3,3,5,7", options: ["Med=3,Moda=3", "Med=5,Moda=3", "Med=3,Moda=5"], correctIndex: 0, emoji: "🔬", hint: "Mediana=central, Moda=más repetido" },
        ],
      },
    ],
  },
];

export const MEDALS: Medal[] = [
  { id: "first-mission", name: "Primera Misión", emoji: "🏅", description: "Completaste tu primera misión", requirement: "Completa 1 misión" },
  { id: "perfect-score", name: "¡Perfecto!", emoji: "💯", description: "0 errores en una misión", requirement: "0 errores en una misión" },
  { id: "streak-5", name: "Racha de 5", emoji: "🔥", description: "5 respuestas correctas seguidas", requirement: "5 correctas consecutivas" },
  { id: "explorer", name: "Explorador", emoji: "🗺️", description: "Jugaste en 3 grados diferentes", requirement: "Jugar en 3 grados" },
  { id: "math-hero", name: "Héroe Matemático", emoji: "🦸", description: "Acumulaste 500 puntos", requirement: "500 puntos" },
  { id: "persistent", name: "Persistente", emoji: "💪", description: "3 intentos en la misma misión", requirement: "3 intentos misma misión" },
];
