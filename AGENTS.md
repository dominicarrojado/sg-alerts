# AGENTS

Minimal instructions for AI coding agents working in this repository.

## Scope

- Use this file for repo-wide guidance.
- Link to existing docs instead of duplicating them. Start with [README.md](./README.md) for setup.

## Commands

- Install dependencies: `yarn install`
- Start dev server: `yarn dev` (runs on port `3001`)
- Lint: `yarn lint` (Next.js ESLint)
- Test: `yarn test` (Jest)
- Test watch mode: `yarn test:watch`
- Production build: `yarn build`

## Architecture

- This is a Next.js 13 App Router app using static export.
- Route files live under `app/`, with many topic-specific pages under `app/topics/` and category landing pages under `app/categories/`.
- Shared UI lives in `components/`. Low-level shadcn/radix primitives live in `components/ui/`.
- Shared content, enums, constants, and types live in `lib/`. Start with `lib/content.tsx`, `lib/constants.ts`, `lib/enums.ts`, and `lib/types.ts` when changing navigation, topics, or labels.
- Client-side API calls are centralized in `lib/api-hooks.ts` and use `API_URL` from `lib/constants.ts`.

## Conventions

- Prefer existing `components/ui/*` primitives and current Tailwind utility patterns before adding new abstractions.
- Keep styling in Tailwind classes. Variant-heavy reusable components should follow the existing `class-variance-authority` pattern.
- Follow the ESLint rules in `.eslintrc.json`: use `async`/`await` instead of `.then()`/`.catch()`, avoid nested ternaries, prefer object shorthand, prefer `const`, and keep `console` usage to `console.warn` or `console.error`, and keep files Prettier-clean because formatting violations fail lint.
- Preserve the current font/theme setup in `app/layout.tsx` and token-based Tailwind config in `tailwind.config.ts`.
- Route-level pages use lightweight Jest render tests alongside the page file (`page.test.tsx`). When adding a new route, add or update the matching test.

## Static Export Constraints

- `next.config.js` sets `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`.
- Avoid changes that require a Node runtime or server-only features unless the export strategy is also updated.
- When adding pages or data flows, make sure they work under static export.

## High-Friction Edits

- Many feature pages are assembled from shared enums/constants/content instead of isolated page-local data. If a topic, channel, or category changes, check `lib/content.tsx`, `lib/constants.ts`, and `lib/enums.ts` together.
- Flight destination pages have extra wiring: add the route in `lib/enums.ts`, add the airline destination mapping in `lib/constants.ts`, and pass `destinationLinks` into the relevant flights table page.
- New route pages should usually come with a matching `page.test.tsx` so the PR workflow continues to cover render-level regressions.
- Some topics and Telegram channels are intentionally hidden via inactive lists in `lib/constants.ts`; verify those lists before assuming a missing topic is a bug.
