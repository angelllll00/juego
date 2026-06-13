# MateGame - Guía de Despliegue en Cloudflare Pages (Gratuito)

## Arquitectura

```
MateGame/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página principal (SPA con navegación por estado)
│   │   ├── layout.tsx        # Layout con fuente Nunito (dislexia-friendly)
│   │   └── globals.css       # Estilos globales + tema personalizado
│   ├── components/
│   │   ├── mategame/
│   │   │   ├── LandingView.tsx       # Pantalla de bienvenida
│   │   │   ├── DashboardView.tsx     # Dashboard del niño (selector de grados)
│   │   │   ├── WorldsView.tsx        # Mapa de mundos y misiones
│   │   │   ├── QuizView.tsx          # Quiz interactivo con confeti
│   │   │   └── FeedbackComponents.tsx # Componentes de feedback (confeti, medallas, etc.)
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       ├── mategame-data.ts   # Datos curriculares (1º-6º primaria)
│       ├── mategame-store.ts  # Store Zustand (persistencia localStorage)
│       └── utils.ts
├── public/                    # Assets estáticos
├── next.config.ts             # Configuración Next.js
└── package.json
```

## Compatibilidad con Cloudflare Pages (Plan Gratuito)

### ✅ Funcionalidades que funcionan sin problema:
- **Static Export**: Toda la app es client-side, se exporta como HTML/CSS/JS estático
- **localStorage**: Persistencia de datos en el navegador del usuario (sin necesidad de base de datos)
- **Sin API Routes**: No hay rutas de API que requieran servidor
- **Sin Server-Side Rendering**: Todo se renderiza en el cliente
- **Sin middleware**: No se usa middleware de Next.js

### ⚠️ Limitaciones del plan gratuito de Cloudflare:
- **500 builds/mes** (suficiente para desarrollo)
- **Ancho de banda ilimitado** para sitios estáticos
- **500 requests/minuto** en Workers (no aplica para Pages estático)
- **Sin funciones serverless** en Pages (pero no las necesitamos)

## Comandos de Despliegue

### 1. Preparar el proyecto para Cloudflare

```bash
# Cambiar next.config.ts a output: "export"
# (Ya configurado en el proyecto)
```

### 2. Construir el proyecto

```bash
# Instalar dependencias
bun install

# Construir para producción (genera /out con archivos estáticos)
bun run build:cloudflare
```

### 3. Desplegar en Cloudflare Pages

#### Opción A: Despliegue automático via GitHub
1. Sube el código a un repositorio de GitHub/GitLab
2. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
3. Click "Create a project" → "Connect to Git"
4. Selecciona tu repositorio
5. Configuración del build:
   - **Framework preset**: Next.js (Static Export)
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `out`
6. Click "Save and Deploy"

#### Opción B: Despliegue directo via CLI
```bash
# Instalar Wrangler CLI
npm install -g wrangler

# Iniciar sesión
wrangler login

# Desplegar directamente
bun run build:cloudflare
wrangler pages deploy out --project-name=mategame
```

### 4. Variables de entorno (NO necesarias)
MateGame no requiere variables de entorno para funcionar. Toda la lógica es client-side.

## Estructura de Datos (localStorage)

El estado del juego se persiste automáticamente en `localStorage`:

```json
{
  "playerName": "Ana",
  "totalPoints": 150,
  "streak": 3,
  "maxStreak": 7,
  "missionProgress": {
    "g1-w1-m1": {
      "completed": true,
      "bestScore": 5,
      "attempts": 2,
      "correctAnswers": 5,
      "totalQuestions": 5
    }
  },
  "medals": [
    {
      "id": "firstMission",
      "name": "Primera Misión",
      "icon": "🌟",
      "description": "Completaste tu primera misión",
      "earnedAt": 1718294400000
    }
  ]
}
```

## Escalabilidad Futura

Para añadir más niveles/misiones, solo necesitas editar `src/lib/mategame-data.ts`:
1. Añadir nuevas preguntas al array de questions
2. Añadir nuevas misiones dentro de un mundo existente
3. Añadir nuevos mundos dentro de un grado existente

No se requiere cambiar la lógica del frontend ni el store.

## Stack Tecnológico

| Tecnología | Uso | Cloudflare Compatible |
|---|---|---|
| Next.js 16 | Framework React | ✅ (Static Export) |
| TypeScript | Tipado estático | ✅ |
| Tailwind CSS 4 | Estilos | ✅ |
| Framer Motion | Animaciones | ✅ |
| canvas-confetti | Efecto confeti | ✅ |
| Zustand | Estado global + localStorage | ✅ |
| shadcn/ui | Componentes UI | ✅ |
| Nunito (Google Fonts) | Tipografía dislexia-friendly | ✅ |
