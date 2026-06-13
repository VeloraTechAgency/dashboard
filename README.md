# Velora Tech Agency

A modern frontend application for Velora Tech Agency — built with React 19, TypeScript 6, Vite 8, and Tailwind v4.

## Tech Stack

| | |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript 6.0 (strict) |
| **Bundler** | Vite 8 (Rolldown) |
| **Styling** | Tailwind v4 |
| **Routing** | react-router-dom v7 |
| **State** | Zustand 5 |
| **Animation** | framer-motion |
| **HTTP** | Axios |
| **Lint** | ESLint v10 (flat config) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check (`tsc -b`) then production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## Environment

Set `VITE_API_URL` to point to the backend API. Defaults to `http://localhost:8090`.

No `.env` file is committed.

## Project Structure

```
src/
├── main.tsx              Entry point
├── App.tsx               Router setup
├── index.css             Global styles + Tailwind + theme vars
├── components/
│   ├── landing/          Public-facing sections
│   ├── dashboard/        Admin dashboard components
│   ├── layout/           Navbar, Sidebar, Footer, PublicLayout
│   └── ui/               Reusable primitives (Card, Button, Modal, etc.)
├── pages/
│   ├── LandingPage.tsx   Public landing page
│   ├── LoginPage.tsx     Auth page
│   └── dashboard/        Dashboard pages (Overview, Services, Projects, etc.)
├── hooks/                Custom hooks (useAuth, useServices, etc.)
├── stores/               Zustand stores (auth, ui, notification)
├── types/                TypeScript interfaces + static staff data
├── lib/                  Axios instance, utility functions
└── config/               App configuration
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Login | Public |
| `/dashboard` | Dashboard overview | Protected |
| `/dashboard/services` | Manage services | Protected |
| `/dashboard/projects` | Manage projects | Protected |
| `/dashboard/testimonials` | Manage testimonials | Protected |
| `/dashboard/contacts` | View contact messages | Protected |
| `/dashboard/staff` | View staff team | Protected |

## Key Conventions

- **Component props**: exported `interface`, not `type`
- **Type-only imports**: use `import type` (required by `verbatimModuleSyntax`)
- **CSS**: Tailwind utility classes + CSS custom properties for dark/light theming
- **Theme**: class-based (`.dark` / `.light` on `<html>`), persisted in `uiStore`
- **API pattern**: all endpoints return `{ data: T }` wrapped in `ApiResponse<T>`
- **Async patterns**: hooks return `AsyncStatus` — `'idle' | 'loading' | 'success' | 'error'`
- **Class merging**: `cn(...classes)` utility (`filter(Boolean).join(' ')`)
- **Currency**: `formatCurrency()` uses IDR locale (`Intl.NumberFormat('id-ID')`)
- **No test framework or formatter** configured.
