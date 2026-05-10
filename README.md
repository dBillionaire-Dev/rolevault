# RoleVault

> Generate tailored interview questions for any job role in seconds, powered by Gemini AI.

## Tech Stack

- **React 18** + **TypeScript** — typed, component-based UI
- **Vite** — fast dev server and build tool
- **CSS Modules** — scoped styles, zero runtime cost
- **Google Gemini API** — `gemini-2.0-flash` for question generation

## Project Structure

```
src/
├── main.tsx              # Entry point — mounts React into the DOM
├── App.tsx               # Root component — all state and UI logic
├── App.module.css        # App-level scoped styles
├── QuestionCard.tsx      # Presentational component for a single question
├── QuestionCard.module.css
├── api.ts                # Gemini API call — isolated from the UI
├── types.ts              # Shared TypeScript interfaces and types
└── index.css             # Global reset and body styles
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Get a free Gemini API key

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click **Get API key** → **Create API key**
3. Copy it — no credit card required

### 3. Configure your API key

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your-gemini-key-here
```

> ⚠️ **Never expose API keys in production frontend code.**
> For deployment, proxy the request through a serverless function
> (e.g. Vercel API Routes) to keep the key server-side only.

### 4. Run locally

```bash
npm run dev
```

### 5. Type-check

```bash
npm run typecheck
```

### 6. Build for production

```bash
npm run build
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add `VITE_GEMINI_API_KEY` under Environment Variables
4. Deploy — Vercel auto-detects Vite, no config needed
