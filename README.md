# Standard Web Seed

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Saga-764ABC?style=flat&logo=redux&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)

> Production-ready React + TypeScript boilerplate with 3-layer architecture, automated quality gates, and a complete testing pyramid.

---

## Why this template?

Most boilerplates give you a blank slate. This one gives you **conventions**.

Every structural decision — from how layers communicate to how imports are ordered — is encoded as a linting rule. The goal is that any developer who opens this project immediately understands where everything lives and why.

---

## Architecture

The project enforces a strict **3-Layer Separation of Concerns**:

```
src/
├── application/     # Infrastructure — API clients, global store, providers
├── features/        # Business logic — domain hooks, Zod schemas, domain types
├── screens/         # UI/UX — pages, screen-specific components and hooks
├── components/      # Design system — shared UI primitives and layout
├── routes/          # Navigation configuration
└── types/           # Global TypeScript contracts
```

**The rule:** layers only communicate downward. A screen can consume a feature. A feature can consume application. Neither goes the other way.

---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict mode) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + shadcn/ui + Base UI |
| State | Redux Toolkit + Redux Saga |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod v4 |
| Routing | React Router DOM v7 |
| Notifications | Sonner |
| Unit tests | Vitest + React Testing Library |
| E2E tests | Playwright (Chromium, Firefox, WebKit) |
| Linting | ESLint + Prettier + eslint-plugin-import-helpers |
| Git hooks | Husky + lint-staged |

---

## Quality Gates

Every commit runs automatically through **Husky + lint-staged**:

```
git commit → ESLint --fix → Prettier --write → commit proceeds
```

The full validation pipeline runs before any build:

```bash
npm run validate
# lint → typecheck → test:coverage → build
```

Enforced rules beyond standard ESLint:

| Rule | Limit | Why |
|---|---|---|
| Max function lines | 50 | Single responsibility |
| Cyclomatic complexity | 10 | No spaghetti logic |
| Import order | Enforced | External → Application → Features → Screens → UI |
| XSS protection | DOMPurify | Safe HTML rendering |

---

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
git clone https://github.com/kevinmistrele/standard-web-seed.git
cd standard-web-seed
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

### Running

```bash
npm run dev
```

Access at `http://localhost:5173`

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check without emit |
| `npm run test` | Run unit tests (watch mode) |
| `npm run test:coverage` | Run unit tests with coverage report |
| `npm run test:e2e` | Run Playwright e2e tests |
| `npm run test:e2e:ui` | Open Playwright UI mode |
| `npm run validate` | Full pipeline: lint + typecheck + coverage + build |

---

## Testing Strategy

```
         ┌─────────────┐
         │  E2E Tests  │  Playwright — real user journeys
         │  Playwright │  Chromium · Firefox · WebKit
         └──────┬──────┘
         ┌──────┴──────┐
         │  Integration│  React Testing Library
         │  Unit Tests │  Vitest + jsdom
         └─────────────┘
```

---

## Developer Guide

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for conventions, layer responsibilities, and contribution guidelines.

---

## Author

Made by [Kevin Mistrele](https://github.com/kevinmistrele)
