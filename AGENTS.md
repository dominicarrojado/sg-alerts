# AGENTS

Minimal instructions for AI coding agents working in this repository.

## Commands

- Install dependencies: `yarn install`
- Dev server: `yarn dev` (runs on `http://localhost:3001`)
- Single test: `yarn test <path/to/file.test.tsx>`
- Full test suite: `yarn test` (Jest)
- Lint: `yarn lint` (ESLint + Prettier check)
- Production build: `yarn build` (`next build`, outputs to `./out`)
- PR CI validation sequence: `yarn lint && yarn test && yarn build`

## Architecture & Static Export

- Next.js 13 App Router configured for static export (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true` in `next.config.js`).
- No Node runtime or server-side features (no API routes, SSR, or ISR). All pages export to static HTML/JS in `out/`.
- Path alias `@/*` resolves to root `./*`.
- Route pages live in `app/` (topics under `app/topics/`, categories under `app/categories/`).
- Shared UI lives in `components/`; low-level shadcn/Radix primitives live in `components/ui/`.
- Centralized client API calls live in `lib/api-hooks.ts` using `NEXT_PUBLIC_API_URL` (`API_URL` in `lib/constants.ts`).

## Code Style & ESLint Rules

- `yarn lint` enforces strict ESLint rules in `.eslintrc.json`:
  - Async code: Banned `.then()` and `.catch()` (use `async`/`await` with `try`/`catch`).
  - Logic: Banned nested ternaries (`no-nested-ternary`).
  - Formatting: Prettier violations trigger ESLint errors (`prettier/prettier`).
  - Logging: Banned `console.log` (only `console.warn` and `console.error` are allowed).
- Styling: Keep styles in Tailwind CSS utility classes; use `class-variance-authority` (CVA) for component variants.

## Testing Rules

- Route pages must have a colocated render test (`page.test.tsx`).
- Run targeted tests using `yarn test <path/to/file.test.tsx>` rather than running all 150+ test suites on every edit.

## High-Friction Edits & Data Wiring

- Changing topics, channels, or categories requires synchronized edits across `lib/enums.ts`, `lib/constants.ts`, and `lib/content.tsx`.
- Flight destination pages require: route enum in `lib/enums.ts`, destination mapping in `lib/constants.ts`, passing `destinationLinks` to flights component, and colocated `page.test.tsx`.
- Fixed deposit bank pages require: route enum in `lib/enums.ts`, constants in `lib/constants.ts`, rate data in `lib/fixed-deposit-rates.ts`, and colocated `page.test.tsx`.
- Hidden topics/channels are intentionally filtered via `INACTIVE_SUBSCRIPTION_TOPICS_INACTIVE` and `INACTIVE_TELEGRAM_CHANNELS` in `lib/constants.ts`—check these lists before assuming a missing item is a bug.
