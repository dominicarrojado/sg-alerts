---
name: verify-codebase
description: Use ONLY when verifying changes, fixing lint errors, running tests, or building for production.
---

# Verify Codebase Skill

This skill provides step-by-step instructions for code quality, test verification, and static export build verification in `sg-alerts`.

## Verification Commands

### 1. Linting & Formatting

Run:

```bash
yarn lint
```

This runs `next lint` (ESLint + Prettier check) and `node scripts/verify-opencode.mjs`.

#### Strict ESLint Rules & Auto-fixes:

- **No `.then()` or `.catch()`**: Rewrite using `async`/`await` with `try`/`catch`.
- **No nested ternaries (`no-nested-ternary`)**: Refactor into standard `if`/`else` or separate variable assignments.
- **No `console.log`**: Use `console.warn` or `console.error` (or remove debug logs).
- **Prettier formatting (`prettier/prettier`)**: Formatting violations cause `yarn lint` to fail. Always format files cleanly.

### 2. OpenCode Verification

Run:

```bash
yarn lint:opencode
```

Ensures `opencode.json`, `AGENTS.md`, agents in `.opencode/agents/`, and skills in `.opencode/skills/` are syntax and frontmatter valid.

### 3. Testing

Run single targeted test during development:

```bash
yarn test app/page.test.tsx
```

Run full test suite before committing:

```bash
yarn test
```

### 4. Production Build Verification

Run:

```bash
yarn build
```

Executes `next build` and generates static export artifacts in `./out`.

## PR Validation Sequence

Run the full PR sequence before pushing or opening a PR:

```bash
yarn lint && yarn test && yarn build
```
