// ============================================================
// MateGame - Datos del currículo de matemáticas (1º a 6º primaria)
// Estructura: Grado → Mundos → Misiones → Preguntas
// ============================================================

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number; // index in options
  explanation: string;
  difficulty: 1 | 2 | 3; // 1=fácil, 2=medio, 3=difícil
}

export interface Mission {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
  order: number;
}

export interface World {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  missions: Mission[];
  order: number;
}

export interface Grade {
  id: string;
  number: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
  worlds: World[];
}

// ============================================================
// PREGUNTAS POR GRADO
// ============================================================

const grade1Questions: Question[] = [
  { id: 'g1m1q1', text: '¿Cuánto es 3 + 2?', type: 'multiple-choice', options: ['4', '5', '6', '7'], correctAnswer: 1, explanation: 'Cuando sumas 3 y 2, juntas los dos números y obtienes 5. ¡Imagina 3 manzanas y le agregas 2 más!', difficulty: 1 },
  { id: 'g1m1q2', text: '¿Cuánto es 7 + 1?', type: 'multiple-choice', options: ['6', '7', '8', '9'], correctAnswer: 2, explanation: '7 + 1 = 8. Si tienes 7 globos y te regalan 1 más, tienes 8 globos.', difficulty: 1 },
  { id: 'g1m1q3', text: '¿Cuánto es 5 + 4?', type: 'multiple-choice', options: ['8', '9', '10', '7'], correctAnswer: 1, explanation: '5 + 4 = 9. Cuenta con los dedos: 5 en una mano y 4 en la otra, ¡son 9!', difficulty: 1 },
  { id: 'g1m1q4', text: '¿Cuánto es 6 - 3?', type: 'multiple-choice', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: '6 - 3 = 3. Si tienes 6 galletas y te comes 3, te quedan 3.', difficulty: 1 },
  { id: 'g1m1q5', text: '¿Cuánto es 10 - 4?', type: 'multiple-choice', options: ['5', '6', '7', '4'], correctAnswer: 1, explanation: '10 - 4 = 6. De 10 estrellas, si quitas 4, quedan 6 brillando.', difficulty: 2 },
  { id: 'g1m2q1', text: '¿Cuál es el número que va después del 8?', type: 'multiple-choice', options: ['7', '10', '9', '6'], correctAnswer: 2, explanation: 'Después del 8 viene el 9. Cuenta: 1, 2, 3, 4, 5, 6, 7, 8, 9...', difficulty: 1 },
  { id: 'g1m2q2', text: '¿Cuántos lados tiene un triángulo?', type: 'multiple-choice', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'Un triángulo tiene 3 lados. ¡Tri significa tres!', difficulty: 1 },
  { id: 'g1m2q3', text: '¿Qué figura es un círculo?', type: 'multiple-choice', options: ['La que tiene 4 lados iguales', 'La que no tiene esquinas', 'La que tiene 3 puntas', 'La que tiene 5 lados'], correctAnswer: 1, explanation: 'El círculo es redondito y no tiene ninguna esquina ni punta.', difficulty: 2 },
];

const grade2Questions: Question[] = [
  { id: 'g2m1q1', text: '¿Cuánto es 25 + 13?', type: 'multiple-choice', options: ['35', '38', '37', '42'], correctAnswer: 1, explanation: '25 + 13 = 38. Suma las unidades: 5+3=8, y las decenas: 2+1=3. ¡Resultado: 38!', difficulty: 1 },
  { id: 'g2m1q2', text: '¿Cuánto es 47 - 23?', type: 'multiple-choice', options: ['24', '25', '26', '14'], correctAnswer: 0, explanation: '47 - 23 = 24. Resta las unidades: 7-3=4, y las decenas: 4-2=2.', difficulty: 1 },
  { id: 'g2m1q3', text: '¿Cuánto es 3 × 4?', type: 'multiple-choice', options: ['7', '10', '12', '14'], correctAnswer: 2, explanation: '3 × 4 = 12. Imagina 3 grupos de 4 estrellitas: 4 + 4 + 4 = 12.', difficulty: 2 },
  { id: 'g2m1q4', text: '¿Cuánto es 5 × 2?', type: 'multiple-choice', options: ['7', '8', '10', '12'], correctAnswer: 2, explanation: '5 × 2 = 10. Es como contar de 2 en 2, cinco veces: 2, 4, 6, 8, 10.', difficulty: 2 },
  { id: 'g2m2q1', text: 'Si tienes 2 monedas de 50 centavos, ¿cuánto dinero tienes?', type: 'multiple-choice', options: ['50 centavos', '1 peso', '75 centavos', '2 pesos'], correctAnswer: 1, explanation: '50 + 50 = 100 centavos, y 100 centavos = 1 peso. ¡Ya puedes comprar algo!', difficulty: 2 },
  { id: 'g2m2q2', text: '¿Cuánto mide un lápiz aproximadamente?', type: 'multiple-choice', options: ['2 centímetros', '18 centímetros', '1 metro', '5 metros'], correctAnswer: 1, explanation: 'Un lápiz mide aproximadamente 18 centímetros de largo.', difficulty: 1 },
];

const grade3Questions: Question[] = [
  { id: 'g3m1q1', text: '¿Cuánto es 156 + 278?', type: 'multiple-choice', options: ['424', '434', '414', '444'], correctAnswer: 1, explanation: '156 + 278 = 434. Suma columna por columna: unidades 6+8=14, decenas 5+7+1=13, centenas 1+2+1=4.', difficulty: 2 },
  { id: 'g3m1q2', text: '¿Cuánto es 7 × 8?', type: 'multiple-choice', options: ['54', '56', '58', '48'], correctAnswer: 1, explanation: '7 × 8 = 56. Recuerda: 7 veces 8 es 56, ¡es fácil de recordar porque 5, 6, 7, 8!', difficulty: 2 },
  { id: 'g3m1q3', text: '¿Cuánto es 45 ÷ 9?', type: 'multiple-choice', options: ['4', '5', '6', '7'], correctAnswer: 1, explanation: '45 ÷ 9 = 5. Porque 9 × 5 = 45. ¡La multiplicación y la división son familia!', difficulty: 2 },
  { id: 'g3m2q1', text: '¿Cuál es la fracción que representa la mitad?', type: 'multiple-choice', options: ['1/3', '1/2', '1/4', '2/3'], correctAnswer: 1, explanation: '1/2 significa una de dos partes iguales. ¡Es dividir algo en 2 y tomar una parte!', difficulty: 2 },
  { id: 'g3m2q2', text: 'Si un pastel se divide en 4 partes iguales y comes 1, ¿qué fracción comiste?', type: 'multiple-choice', options: ['1/2', '1/3', '1/4', '3/4'], correctAnswer: 2, explanation: 'Comiste 1 de las 4 partes iguales, eso es 1/4 del pastel.', difficulty: 2 },
  { id: 'g3m3q1', text: '¿Cuántos lados tiene un pentágono?', type: 'multiple-choice', options: ['4', '5', '6', '7'], correctAnswer: 1, explanation: 'Un pentágono tiene 5 lados. Penta significa cinco en griego.', difficulty: 1 },
];

const grade4Questions: Question[] = [
  { id: 'g4m1q1', text: '¿Cuánto es 3.5 + 2.7?', type: 'multiple-choice', options: ['5.2', '6.2', '5.12', '6.12'], correctAnswer: 1, explanation: '3.5 + 2.7 = 6.2. Suma las décimas: 5+7=12 (1 y 2 décimas), luego 3+2+1=6.', difficulty: 2 },
  { id: 'g4m1q2', text: '¿Cuánto es 1/4 + 2/4?', type: 'multiple-choice', options: ['3/8', '3/4', '1/2', '2/4'], correctAnswer: 1, explanation: '1/4 + 2/4 = 3/4. Cuando el denominador es igual, solo sumas los numeradores.', difficulty: 2 },
  { id: 'g4m2q1', text: '¿Cuál es el área de un rectángulo de 5 cm de largo por 3 cm de ancho?', type: 'multiple-choice', options: ['8 cm²', '15 cm²', '16 cm²', '10 cm²'], correctAnswer: 1, explanation: 'Área = largo × ancho = 5 × 3 = 15 cm². ¡Imagina 5 filas de 3 cuadritos cada una!', difficulty: 2 },
  { id: 'g4m2q2', text: '¿Cuál es el perímetro de un cuadrado de 6 cm de lado?', type: 'multiple-choice', options: ['12 cm', '24 cm', '36 cm', '18 cm'], correctAnswer: 1, explanation: 'Perímetro = 4 × lado = 4 × 6 = 24 cm. ¡Es dar la vuelta completa al cuadrado!', difficulty: 2 },
  { id: 'g4m3q1', text: 'Si un juguete cuesta $45 y tienes un descuento de $12, ¿cuánto pagas?', type: 'multiple-choice', options: ['$33', '$57', '$32', '$43'], correctAnswer: 0, explanation: '45 - 12 = 33. El descuento se resta del precio original.', difficulty: 2 },
];

const grade5Questions: Question[] = [
  { id: 'g5m1q1', text: '¿Cuánto es 3/4 × 2/5?', type: 'multiple-choice', options: ['5/9', '6/20', '6/9', '5/20'], correctAnswer: 1, explanation: '3/4 × 2/5 = (3×2)/(4×5) = 6/20 = 3/10. ¡Multiplica numeradores entre sí y denominadores entre sí!', difficulty: 3 },
  { id: 'g5m1q2', text: '¿Cuánto es 2.4 × 0.5?', type: 'multiple-choice', options: ['1.2', '12.0', '0.12', '1.20'], correctAnswer: 0, explanation: '2.4 × 0.5 = 1.2. Piensa: la mitad de 2.4 es 1.2.', difficulty: 3 },
  { id: 'g5m2q1', text: '¿Cuál es el volumen de un prisma de 4×3×2?', type: 'multiple-choice', options: ['9', '24', '18', '12'], correctAnswer: 1, explanation: 'Volumen = largo × ancho × alto = 4 × 3 × 2 = 24 unidades cúbicas.', difficulty: 3 },
  { id: 'g5m2q2', text: '¿Cuántos grados tiene un ángulo recto?', type: 'multiple-choice', options: ['45°', '90°', '180°', '360°'], correctAnswer: 1, explanation: 'Un ángulo recto mide 90°. ¡Es la esquina perfecta de un cuadrado!', difficulty: 2 },
  { id: 'g5m3q1', text: 'Si 5 manzanas cuestan $15, ¿cuánto cuesta 1 manzana?', type: 'multiple-choice', options: ['$2', '$3', '$4', '$5'], correctAnswer: 1, explanation: '15 ÷ 5 = 3. Cada manzana cuesta $3. Esto es una regla de tres simple.', difficulty: 2 },
];

const grade6Questions: Question[] = [
  { id: 'g6m1q1', text: '¿Cuánto es (-3) + (+7)?', type: 'multiple-choice', options: ['4', '-4', '10', '-10'], correctAnswer: 0, explanation: '(-3) + (+7) = 4. Piensa: debes 3 y ganas 7, ¡te quedan 4!', difficulty: 3 },
  { id: 'g6m1q2', text: '¿Cuánto es 2³?', type: 'multiple-choice', options: ['6', '8', '4', '9'], correctAnswer: 1, explanation: '2³ = 2 × 2 × 2 = 8. La potencia significa multiplicar el número por sí mismo 3 veces.', difficulty: 3 },
  { id: 'g6m2q1', text: '¿Cuál es el área de un círculo con radio 7 cm? (usa π ≈ 22/7)', type: 'multiple-choice', options: ['44 cm²', '154 cm²', '77 cm²', '308 cm²'], correctAnswer: 1, explanation: 'Área = π × r² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².', difficulty: 3 },
  { id: 'g6m2q2', text: '¿Cuánto mide la hipotenusa de un triángulo con catetos 3 y 4?', type: 'multiple-choice', options: ['5', '7', '6', '12'], correctAnswer: 0, explanation: 'Por el Teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, entonces h = 5.', difficulty: 3 },
  { id: 'g6m3q1', text: 'Si el precio de un producto subió de $80 a $100, ¿cuál es el porcentaje de aumento?', type: 'multiple-choice', options: ['20%', '25%', '15%', '30%'], correctAnswer: 1, explanation: 'Aumento = 100-80 = 20. Porcentaje = (20/80) × 100 = 25%.', difficulty: 3 },
];

// ============================================================
// DEFINICIÓN COMPLETA DE GRADOS
// ============================================================

export const GRADES: Grade[] = [
  {
    id: 'grade-1',
    number: 1,
    name: '1º de Primaria',
    emoji: '🌈',
    color: '#58CC02',
    bgColor: '#E5F6D0',
    description: 'Sumas, restas y mis primeras figuras',
    worlds: [
      {
        id: 'g1-w1',
        name: 'Isla de las Sumas',
        icon: '🏝️',
        color: '#58CC02',
        bgColor: '#E5F6D0',
        order: 1,
        missions: [
          {
            id: 'g1-w1-m1',
            name: 'Sumas con dedos',
            icon: '✋',
            description: 'Aprende a sumar contando con los dedos',
            questions: grade1Questions.filter(q => q.id.startsWith('g1m1')),
            order: 1,
          },
          {
            id: 'g1-w1-m2',
            name: 'Restas divertidas',
            icon: '🎯',
            description: 'Aprende a restar quitando objetos',
            questions: grade1Questions.filter(q => q.id.startsWith('g1m1') && q.text.includes('-')),
            order: 2,
          },
        ],
      },
      {
        id: 'g1-w2',
        name: 'Bosque de las Formas',
        icon: '🌲',
        color: '#1CB0F6',
        bgColor: '#D0EFFA',
        order: 2,
        missions: [
          {
            id: 'g1-w2-m1',
            name: 'Figuras básicas',
            icon: '🔺',
            description: 'Conoce el triángulo, círculo y cuadrado',
            questions: grade1Questions.filter(q => q.id.startsWith('g1m2')),
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'grade-2',
    number: 2,
    name: '2º de Primaria',
    emoji: '🚀',
    color: '#1CB0F6',
    bgColor: '#D0EFFA',
    description: 'Sumas grandes, restas y multiplicaciones',
    worlds: [
      {
        id: 'g2-w1',
        name: 'Galaxia Numérica',
        icon: '🌌',
        color: '#1CB0F6',
        bgColor: '#D0EFFA',
        order: 1,
        missions: [
          {
            id: 'g2-w1-m1',
            name: 'Sumas de dos cifras',
            icon: '➕',
            description: 'Suma números hasta el 99',
            questions: grade2Questions.filter(q => q.id.startsWith('g2m1')),
            order: 1,
          },
        ],
      },
      {
        id: 'g2-w2',
        name: 'Mercado Moneda',
        icon: '🪙',
        color: '#FF9600',
        bgColor: '#FFF0D0',
        order: 2,
        missions: [
          {
            id: 'g2-w2-m1',
            name: 'El valor del dinero',
            icon: '💰',
            description: 'Aprende a contar monedas y medir',
            questions: grade2Questions.filter(q => q.id.startsWith('g2m2')),
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'grade-3',
    number: 3,
    name: '3º de Primaria',
    emoji: '🏰',
    color: '#CE82FF',
    bgColor: '#F0DDFF',
    description: 'Fracciones, multiplicación y división',
    worlds: [
      {
        id: 'g3-w1',
        name: 'Castillo de los Números',
        icon: '🏰',
        color: '#CE82FF',
        bgColor: '#F0DDFF',
        order: 1,
        missions: [
          {
            id: 'g3-w1-m1',
            name: 'Operaciones grandes',
            icon: '🧮',
            description: 'Multiplica y divide como un campeón',
            questions: grade3Questions.filter(q => q.id.startsWith('g3m1')),
            order: 1,
          },
        ],
      },
      {
        id: 'g3-w2',
        name: 'Pastelería de Fracciones',
        icon: '🍰',
        color: '#FF4B4B',
        bgColor: '#FFD0D0',
        order: 2,
        missions: [
          {
            id: 'g3-w2-m1',
            name: 'Rebanadas de pastel',
            icon: '🎂',
            description: 'Descubre las fracciones dividiendo cosas',
            questions: grade3Questions.filter(q => q.id.startsWith('g3m2')),
            order: 1,
          },
        ],
      },
      {
        id: 'g3-w3',
        name: 'Jardín Geométrico',
        icon: '🌸',
        color: '#58CC02',
        bgColor: '#E5F6D0',
        order: 3,
        missions: [
          {
            id: 'g3-w3-m1',
            name: 'Polígonos bonitos',
            icon: '🔷',
            description: 'Conoce los polígonos y sus lados',
            questions: grade3Questions.filter(q => q.id.startsWith('g3m3')),
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'grade-4',
    number: 4,
    name: '4º de Primaria',
    emoji: '⚡',
    color: '#FF9600',
    bgColor: '#FFF0D0',
    description: 'Decimales, fracciones y áreas',
    worlds: [
      {
        id: 'g4-w1',
        name: 'Laboratorio Decimal',
        icon: '🔬',
        color: '#FF9600',
        bgColor: '#FFF0D0',
        order: 1,
        missions: [
          {
            id: 'g4-w1-m1',
            name: 'Decimales y fracciones',
            icon: '🔢',
            description: 'Suma decimales y fracciones',
            questions: grade4Questions.filter(q => q.id.startsWith('g4m1')),
            order: 1,
          },
        ],
      },
      {
        id: 'g4-w2',
        name: 'Ciudad Geométrica',
        icon: '🏙️',
        color: '#1CB0F6',
        bgColor: '#D0EFFA',
        order: 2,
        missions: [
          {
            id: 'g4-w2-m1',
            name: 'Áreas y perímetros',
            icon: '📐',
            description: 'Calcula áreas y perímetros de figuras',
            questions: grade4Questions.filter(q => q.id.startsWith('g4m2')),
            order: 1,
          },
        ],
      },
      {
        id: 'g4-w3',
        name: 'Bazar de Problemas',
        icon: '🏪',
        color: '#CE82FF',
        bgColor: '#F0DDFF',
        order: 3,
        missions: [
          {
            id: 'g4-w3-m1',
            name: 'Compras y descuentos',
            icon: '🛒',
            description: 'Resuelve problemas de la vida real',
            questions: grade4Questions.filter(q => q.id.startsWith('g4m3')),
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'grade-5',
    number: 5,
    name: '5º de Primaria',
    emoji: '🧙',
    color: '#CE82FF',
    bgColor: '#F0DDFF',
    description: 'Fracciones avanzadas, volúmenes y proporciones',
    worlds: [
      {
        id: 'g5-w1',
        name: 'Torre de las Fracciones',
        icon: '🗼',
        color: '#CE82FF',
        bgColor: '#F0DDFF',
        order: 1,
        missions: [
          {
            id: 'g5-w1-m1',
            name: 'Multiplicar fracciones',
            icon: '✖️',
            description: 'Aprende a multiplicar fracciones y decimales',
            questions: grade5Questions.filter(q => q.id.startsWith('g5m1')),
            order: 1,
          },
        ],
      },
      {
        id: 'g5-w2',
        name: 'Pirámide del Volumen',
        icon: '🔺',
        color: '#FF9600',
        bgColor: '#FFF0D0',
        order: 2,
        missions: [
          {
            id: 'g5-w2-m1',
            name: 'Volumen y ángulos',
            icon: '📏',
            description: 'Calcula volúmenes y mide ángulos',
            questions: grade5Questions.filter(q => q.id.startsWith('g5m2')),
            order: 1,
          },
        ],
      },
      {
        id: 'g5-w3',
        name: 'Mercado Proporcional',
        icon: '⚖️',
        color: '#58CC02',
        bgColor: '#E5F6D0',
        order: 3,
        missions: [
          {
            id: 'g5-w3-m1',
            name: 'Reglas de tres',
            icon: '🔗',
            description: 'Resuelve problemas con proporciones',
            questions: grade5Questions.filter(q => q.id.startsWith('g5m3')),
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'grade-6',
    number: 6,
    name: '6º de Primaria',
    emoji: '🎓',
    color: '#FF4B4B',
    bgColor: '#FFD0D0',
    description: 'Números negativos, potencias y geometría avanzada',
    worlds: [
      {
        id: 'g6-w1',
        name: 'Dimensión Negativa',
        icon: '🕳️',
        color: '#FF4B4B',
        bgColor: '#FFD0D0',
        order: 1,
        missions: [
          {
            id: 'g6-w1-m1',
            name: 'Enteros y potencias',
            icon: '⚡',
            description: 'Domina los números negativos y las potencias',
            questions: grade6Questions.filter(q => q.id.startsWith('g6m1')),
            order: 1,
          },
        ],
      },
      {
        id: 'g6-w2',
        name: 'Templo de Pitágoras',
        icon: '🏛️',
        color: '#1CB0F6',
        bgColor: '#D0EFFA',
        order: 2,
        missions: [
          {
            id: 'g6-w2-m1',
            name: 'Círculos y teoremas',
            icon: '📐',
            description: 'Área del círculo y Teorema de Pitágoras',
            questions: grade6Questions.filter(q => q.id.startsWith('g6m2')),
            order: 1,
          },
        ],
      },
      {
        id: 'g6-w3',
        name: 'Mundo de los Porcentajes',
        icon: '💯',
        color: '#58CC02',
        bgColor: '#E5F6D0',
        order: 3,
        missions: [
          {
            id: 'g6-w3-m1',
            name: 'Porcentajes y descuentos',
            icon: '🏷️',
            description: 'Calcula porcentajes en situaciones reales',
            questions: grade6Questions.filter(q => q.id.startsWith('g6m3')),
            order: 1,
          },
        ],
      },
    ],
  },
];

// ============================================================
// FUNCIONES DE UTILIDAD
// ============================================================

export function getGradeById(id: string): Grade | undefined {
  return GRADES.find(g => g.id === id);
}

export function getWorldById(gradeId: string, worldId: string): World | undefined {
  const grade = getGradeById(gradeId);
  return grade?.worlds.find(w => w.id === worldId);
}

export function getMissionById(gradeId: string, worldId: string, missionId: string): Mission | undefined {
  const world = getWorldById(gradeId, worldId);
  return world?.missions.find(m => m.id === missionId);
}

export function getTotalQuestionsForGrade(grade: Grade): number {
  return grade.worlds.reduce((total, world) => 
    total + world.missions.reduce((mTotal, mission) => mTotal + mission.questions.length, 0), 0
  );
}
