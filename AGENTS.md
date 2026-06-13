# Velora — React + TypeScript + Vite frontend

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (`tsc -b`) then build (`vite build`)
- `npm run lint` — ESLint flat config (v10) on `.`
- `npm run preview` — `vite preview`
- No test framework or formatter configured.

## Architecture
- **Entry**: `src/main.tsx` → `src/App.tsx`. Routes: `/` (public landing), `/login`, `/dashboard/*` (protected).
- **Auth**: JWT via axios interceptor (`src/lib/axios.ts`). Token read from localStorage key `auth-storage` (Zustand persist). 401 redirects to `/login`.
- **API base**: `VITE_API_URL` env var (no `.env` committed), falls back to `http://localhost:8090`.
- **API response pattern**: All endpoints return `{ data: T }` wrapped in `ApiResponse<T>`. Hooks destructure via `res.data.data`.
- **State**: 3 Zustand stores — `authStore` (persisted), `uiStore` (persisted, dark/light theme), `notificationStore` (in-memory).
- **Custom hooks**: per-entity (`useServices`, `useProjects`, `useTestimonials`, `useContacts`) — each follows `fetch`/`create`/`update`/`delete` + local state (`useState`), returning `AsyncStatus` (`'idle' | 'loading' | 'success' | 'error'`). Generic `useFetchData<T>` available for ad-hoc fetches.
- **Notifications**: `useNotifications` wraps `useContacts` + `useInterval`; polls every 30s when authenticated, creates local notifications in `notificationStore` for unread contacts.
- **Staff data** is static in `src/types/staff.ts`, not fetched from API.

## Tech stack
- **TypeScript 6.0** strict: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` — `import type` required for type-only imports; no enums/namespaces.
- **Vite 8** with Rolldown (not esbuild), `@vitejs/plugin-react`, `@tailwindcss/vite`.
- **Tailwind v4**: no PostCSS config, no `tailwind.config.*`. Dark mode via `@custom-variant dark (&:where(.dark, .dark *))` in CSS.
- **Dark/light theme**: class-based (`.dark`/`.light` on `<html>`), persisted in `uiStore`. CSS custom properties (`--color-bg`, `--color-text`, etc.) in `index.css` control appearance.
- **ESLint v10** flat config: uses `defineConfig` / `globalIgnores` from `eslint/config`; plugins `typescript-eslint`, `react-hooks`, `react-refresh`.
- **React 19**, `react-router-dom` v7, `framer-motion` for animations.

## Conventions
- Component props typed with exported `interface` (not `type`).
- `cn()` utility for conditional class merging: `filter(Boolean).join(' ')`.
- `formatCurrency` uses IDR locale (`Intl.NumberFormat('id-ID')`).
