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

## UI Preview And Screenshot Recipe

- See [docs/ui-preview.md](docs/ui-preview.md) for deterministic, read-only Klook
  and miles-card previews using the real exported application, without a live API.
- Requires Node 24, Yarn, controller dependencies and Playwright Chromium (or
  explicitly selected installed Chrome). Build only a fresh, clean dedicated
  worktree with `yarn ui:preview build --worktree <target>`; do not reuse another
  delivery's outputs or listeners. Configuration is embedded at build time.
- Use `yarn ui:preview capture --worktree <target> --group klook|miles --output <new-directory>`;
  open representative images and record visual observations. Fixtures establish
  rendering, not live API compatibility. See the recipe for diagnostics/cleanup.
- OpenCode uses recipes from the PR base revision: this recipe becomes eligible
  for later deliveries after merge, not retroactive acceptance for existing PRs.

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
