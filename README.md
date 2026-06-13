# Velora Tech Agency

Frontend + lightweight backend for Velora Tech Agency. This repository contains a React 19 + TypeScript 6 frontend (Vite) and a minimal Express + TypeScript backend with Prisma for persistence.

## Summary

- Frontend: React 19, TypeScript 6, Vite 8, Tailwind v4, Zustand for state.
- Backend: Node + TypeScript (Express), Prisma ORM, SQLite/Postgres supported via `prisma/schema.prisma`.
- Auth: JWT via `jsonwebtoken`, password hashing with `bcryptjs`.

## Tech stack (high level)

- React 19, TypeScript 6 (strict)
- Vite 8 (Rollup build), `@vitejs/plugin-react`
- Tailwind CSS v4
- Zustand for client state
- Axios for HTTP client
- Express for backend routes and middleware
- Prisma ORM (`prisma` / `@prisma/client`)
- ESLint v10 (flat config)
- framer-motion for animations

## Quick start

Install dependencies:

```bash
npm install
```

Run the backend in development (in one terminal):

```bash
npm run server:dev
```

Run the frontend dev server (in another terminal):

```bash
npm run dev
```

Open the frontend at http://localhost:5173 and point the frontend `VITE_API_URL` to the backend (defaults to `http://localhost:8090`).

## Important npm scripts

- `npm run dev` — Start Vite dev server (frontend)
- `npm run server:dev` — Run backend with `tsx watch server/index.ts` (hot reload)
- `npm run build` — `npm run build:fe && npm run build:server` (frontend + build server types)
- `npm run build:fe` — `tsc -b && vite build` (frontend production build)
- `npm run build:server` — `tsc -p tsconfig.server.json` (compile server types)
- `npm run server:start` — Start built server: `NODE_ENV=production node dist-server/index.js`
- `npm run lint` — Run ESLint across the repo
- `npm run prisma:generate`, `prisma:migrate`, `prisma:studio` — Prisma maintenance commands

## Backend & Prisma

- Backend source: `server/`
- Built server output: `dist-server/`
- Prisma schema: `prisma/schema.prisma`

Typical workflow for DB changes:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

If you use SQLite in development, check `prisma/schema.prisma` and `prisma/seed.ts` for seed data.

## Environment variables

- Frontend: `VITE_API_URL` — API base URL used by the frontend (e.g. `http://localhost:8090`).
- Backend: use a `.env` file (not committed). Typical keys:
	- `DATABASE_URL` — Prisma connection string
	- `JWT_SECRET` — secret for signing JWTs
	- `PORT` — server port (defaults to 8090)

Create a local `.env` for development and do not commit it.

## Project structure (top-level)

```
.
├── src/                Frontend source (React + Vite)
├── server/             Backend (Express + TypeScript)
├── dist-server/        Built server output (production)
├── prisma/             Prisma schema, migrations, and seeds
├── public/             Static assets
├── package.json        npm scripts and deps
├── tsconfig.*          TypeScript configs for app and server
└── README.md
```

## Notes & conventions

- Component props should use exported `interface`.
- Use `import type` for type-only imports to satisfy `verbatimModuleSyntax`.
- API responses follow `{ data: T }` shaping (`ApiResponse<T>`).
- Hooks return `AsyncStatus` (`'idle' | 'loading' | 'success' | 'error'`).
- Theme is class-based (`.dark` / `.light`) persisted in `stores/uiStore.ts`.

## Common commands (copy/paste)

```bash
# Install
npm install

# Dev: backend + frontend (two terminals)
npm run server:dev
npm run dev

# Build
npm run build

# Start production server (after build)


# Prisma
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Where to look next

- Frontend entry: `src/main.tsx` and `src/App.tsx`
- Backend entry: `server/index.ts` and `server/routes/*`
- Prisma: `prisma/schema.prisma` and `prisma/seed.ts`

If you'd like, I can also:
- add a single `npm run dev:all` script to run frontend + backend concurrently, or
- add a short `CONTRIBUTING.md` with setup steps for new developers.
