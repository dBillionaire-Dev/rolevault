# RoleVault

> Generate tailored interview questions for any job role in seconds, powered by Claude AI.

## Tech Stack

- **React 18** + **TypeScript** — typed, component-based UI
- **Vite** — fast dev server and build tool
- **CSS Modules** — scoped styles, zero runtime cost
- **Anthropic Claude API** — `claude-sonnet-4-20250514` for question generation

## Project Structure

```
src/
├── main.tsx              # Entry point — mounts React into the DOM
├── App.tsx               # Root component — all state and UI logic
├── App.module.css        # App-level scoped styles
├── QuestionCard.tsx      # Presentational component for a single question
├── QuestionCard.module.css
├── api.ts                # Anthropic API call — isolated from the UI
├── types.ts              # Shared TypeScript interfaces and types
└── index.css             # Global reset and body styles
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your API key

Create a `.env` file in the project root:

```
VITE_ANTHROPIC_API_KEY=your-api-key-here
```

Then update `src/api.ts` to include it in the request headers:

```ts
headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
},
```

> ⚠️ **Never expose API keys in production frontend code.**
> For deployment, proxy the request through a serverless function
> (e.g. Vercel API Routes) to keep the key server-side only.

### 3. Run locally

```bash
npm run dev
```

### 4. Type-check

```bash
npm run typecheck
```

### 5. Build for production

```bash
npm run build
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add `VITE_ANTHROPIC_API_KEY` under Environment Variables
4. Deploy — Vercel auto-detects Vite, no config needed
