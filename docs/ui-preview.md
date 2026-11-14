# Fixture-backed UI preview and screenshots

This recipe renders the **real statically exported application** with synthetic,
read-only API responses. Images establish visual rendering, **not live API
compatibility**, current deals, or bank eligibility requirements. Production
components, API hooks, contracts, and configuration are unchanged.

## Prerequisites and worktree safety

- Use Node 24 (the CI runtime) and Yarn Classic. Run commands below from a checkout
  containing this recipe (the **controller**). Paths may contain spaces; quote them.
- Install controller dependencies with `yarn install --frozen-lockfile`.
- Install the pinned Playwright browser with `yarn playwright install chromium`.
  Compatible cached binaries are reused. Alternatively append `--channel chrome`
  to capture commands to reuse installed Google Chrome; its version is recorded,
  but may differ between machines. No browser-test framework is required.
- Building a fresh Next export may download Google fonts via `next/font/google`.
  Install and build therefore require network access; **capture does not require
  production API availability**. The browser blocks all non-preview origins.
- Never build in a historical delivery's worktree or a checkout with an active
  development server. The target must be a clean, dedicated Git worktree, with
  its own installed dependencies and no existing `.next/`, `out/`, or preview
  marker. The recipe refuses to delete existing outputs. A failed build requires
  a new target, not a destructive retry against another process's files.
- Do not copy `.env.local` or credentials. The build command explicitly overrides
  `NEXT_PUBLIC_API_URL=/__ui-fixtures`, including any production value in `.env`.
  Changing an environment variable only at serve time cannot repair an old build.

## Prepare a fresh target

Use the SHA of the code you intend to inspect. For an uncommitted delivery,
commit its changes first; this recipe deliberately rejects dirty targets.

```bash
# From the controller checkout; choose a NEW sibling path.
git fetch origin
TARGET="$(dirname "$PWD")/sg-alerts-preview-$(date +%Y%m%d-%H%M%S)"
git worktree add --detach "$TARGET" HEAD
yarn --cwd "$TARGET" install --frozen-lockfile
yarn ui:preview build --worktree "$TARGET"
```

The build prints the absolute target and SHA, runs that worktree's `yarn build`,
and writes a private `.ui-preview-build.json` only after success. Source changes,
a different worktree/SHA, changed exported files, or missing metadata invalidate
serving/capture. Build has a ten-minute deadline; interruption/timeout kills only
its owned build process group and leaves no success marker. It does not delete
the target or failed build outputs.

### Checking unmerged Klook and income changes

The recipe does not supply missing pages or income rendering. Until both features
are merged, check each current PR head independently. Re-query heads immediately
before making the detached targets; do not use old local feature branches.

```bash
git fetch origin
KLOOK_SHA="$(gh pr view 49 --json headRefOid --jq .headRefOid)"
MILES_SHA="$(gh pr view 50 --json headRefOid --jq .headRefOid)"
KLOOK_TARGET="$(dirname "$PWD")/sg-alerts-preview-klook-$(date +%Y%m%d-%H%M%S)"
MILES_TARGET="$(dirname "$PWD")/sg-alerts-preview-miles-$(date +%Y%m%d-%H%M%S)"
git worktree add --detach "$KLOOK_TARGET" "$KLOOK_SHA"
git worktree add --detach "$MILES_TARGET" "$MILES_SHA"
yarn --cwd "$KLOOK_TARGET" install --frozen-lockfile
yarn --cwd "$MILES_TARGET" install --frozen-lockfile
yarn ui:preview build --worktree "$KLOOK_TARGET"
yarn ui:preview build --worktree "$MILES_TARGET"
```

Run these commands sequentially; builds use the target's application dependencies,
while capture uses the controller's pinned Playwright. No recipe files need to be
copied into the target. Agents must run heavyweight builds through their shared
host validation queue when their workflow requires it.

## Capture and inspect

Create an evidence parent **outside disposable build outputs**. Each capture
requires a new child directory and will never overwrite an earlier run.

```bash
EVIDENCE="$(mktemp -d "${TMPDIR:-/tmp}/sg-alerts-ui-evidence.XXXXXX")"
yarn ui:preview capture --worktree "$KLOOK_TARGET" --group klook --output "$EVIDENCE/klook"
yarn ui:preview capture --worktree "$MILES_TARGET" --group miles --output "$EVIDENCE/miles"
```

For a target containing both merged features, use `--worktree "$TARGET"` for both
commands. Add `--channel chrome` if intentionally using installed Chrome instead
of managed Chromium.

The bounded runner checks:

| Group   | Views/states                                                                                                                                                                                  |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `klook` | Results, empty, last-available empty, controlled API failure; Travel-category → prefixed Klook link, refresh, browser Back                                                                    |
| `miles` | Comparison and DBS Altitude detail; both income amounts + notes, local-only, foreigner-only, notes-only, absent income, controlled API failure; card link, refresh, Back to All, browser Back |

Each state runs at 1366×900 and 375×812 in light theme. Results/income also run
at the 640px breakpoint in dark theme. Locale is `en-GB`, timezone
`Asia/Singapore`, reduced motion enabled, and service workers disabled.

Readiness requires the expected API fixture response **and rendered content**:
fixture promotion title or empty message; income in the correct comparison row;
detail income heading, amounts/`Not available`, and notes. It does not treat an
open port, load event, or network idle as readiness. Failure scenarios must reject
results readiness. Navigation is bounded to 30 seconds, individual readiness waits
to 15 seconds, and the run to five minutes (plus bounded diagnostic/cleanup time).

Outputs include full-page PNGs, focused income PNGs, and `fixture-report.json`
with SHA, absolute worktree, command, browser version, viewport/theme, request
logs, intentional external blocks, and errors. Failures retain diagnostic HTML
and a screenshot when obtainable. A nonzero exit is never screenshot success.

**Open representative PNGs, do not just list them.** With an agent, use its image
reader; locally open them in an image viewer, for example on macOS:

```bash
open "$EVIDENCE/klook/fixture-klook-results-results-375-light.png"
open "$EVIDENCE/klook/fixture-klook-empty-results-1366-light.png"
open "$EVIDENCE/miles/fixture-miles-income-results-1366-light.png"
open "$EVIDENCE/miles/fixture-miles-income-detail-375-light-income.png"
open "$EVIDENCE/miles/fixture-miles-notes-only-detail-1366-light-income.png"
```

Inspect desktop/mobile wrapping, income notes, missing amounts, readable dark
theme, stacked tiles below 640px, subscription-button overlap, and unintended
horizontal overflow. Record filenames, exact commands, observed results, and
limitations in delivery evidence. The runner does **not** assert human visual
approval or use pixel baselines.

## Interactive serve and production paths

```bash
yarn ui:preview serve --worktree "$KLOOK_TARGET" --scenario klook-results
# Or:
yarn ui:preview serve --worktree "$MILES_TARGET" --scenario miles-income
```

The foreground server prints an OS-assigned loopback URL. Open these paths on
that exact origin:

- `/sg-alerts/topics/klook-travel-deals/`
- `/sg-alerts/categories/travel/`
- `/sg-alerts/topics/miles-credit-cards/`
- `/sg-alerts/topics/miles-credit-cards/dbs-altitude/`

`InternalAnchor` adds `/sg-alerts` in production; other pages use root-relative
Next links. This server accepts both existing forms, including local assets,
without changing hrefs, configuring production `basePath`, or returning the home
page for missing routes. Following a root-relative Next link may leave the prefix;
that is existing application behavior, not a preview rewrite. This verifies
preview navigation, not the hosting provider's entire routing configuration.

Scenarios: `klook-results`, `klook-empty`, `klook-last-available`, `klook-failure`,
`miles-income`, `miles-local-only`, `miles-foreigner-only`, `miles-notes-only`,
`miles-missing`, `miles-failure`. Restart serving to change scenario. Only declared
GET/HEAD fixture endpoints are supported; unknown requests get a diagnostic 404,
and mutation methods get 405. Synthetic external links use `example.invalid`.
Interactive serving does not intercept external browser requests: use capture for
network-isolated rendering and do not follow external links or submit forms.

## Diagnostics and cleanup

- **Missing browser:** install managed Chromium or explicitly use installed Chrome.
- **Missing feature:** select the appropriate current PR head, not an older base.
- **Missing data:** inspect fixture request path/query and readiness diagnostics.
  No live-API fallback occurs.
- **Font/build failure:** read build output, restore required build network access,
  and use a fresh target. Do not label it a capture failure.
- **Stale/dirty build:** create a new clean target and rebuild; do not reuse `out/`
  from a normal production build.
- **Port ownership:** no fixed listener is required or reused. Capture always closes
  its owned browser/server on success/failure/interruption. Ctrl+C stops the
  foreground serve process. Never use `killall`, port-based killing, or stop an
  existing development server. No process or temp-file sweeping is performed.

After preserving evidence and confirming you no longer need these dedicated
targets, remove only the exact worktrees you created. The marker is deliberately
untracked; remove that exact file first. Git refuses removal if other untracked
or modified files remain: inspect them rather than add `--force`.

```bash
rm "$KLOOK_TARGET/.ui-preview-build.json"
rm "$MILES_TARGET/.ui-preview-build.json"
git worktree remove "$KLOOK_TARGET"
git worktree remove "$MILES_TARGET"
```

For a failed build there may be no marker: skip its `rm` command. Leave evidence
until its consumer has inspected/copied it; the recipe never deletes screenshots,
logs, or unrelated temporary files automatically.

## Validation and delivery workflow

```bash
yarn test:ui-preview
yarn lint && yarn test && yarn build
```

This is a small preview/capture utility, not a broad e2e suite. Keep fixtures in
`scripts/ui-preview/fixtures/` synchronized with consumed client response shapes.
They are not imported by the application or included in the static export.

OpenCode reads browser recipes from the **PR base revision**. This new recipe is
eligible for later deliveries **after merge**; introducing it does not retroactively
verify historical delivery acceptance or authorize resuming those sessions. Its
own implementation can be explicitly exercised against isolated current PR heads.

### Implementation verification (14 November 2026)

Both PR heads were re-queried before verification: Klook at
`f64091fe4773607e54330f8c3f377d8071dd6a67`, income at
`e392eb1a84ceaa9720e566edb06ad82a3dfd08ab`. The commands above were exercised using
`KLOOK_TARGET=/Users/dominic/dominic/sg-alerts-preview-klook-recipe` and
`MILES_TARGET=/Users/dominic/dominic/sg-alerts-preview-miles-recipe`, Node 24.22.0,
Yarn 1.22.22, and installed Chrome 157.0.8103.79. Both fixture builds passed.

```bash
yarn ui:preview capture --worktree "$KLOOK_TARGET" --group klook --channel chrome --output "$EVIDENCE/klook"
yarn ui:preview capture --worktree "$MILES_TARGET" --group miles --channel chrome --output "$EVIDENCE/miles-focused"
```

Both complete groups passed, including prefix/root navigation, reload/Back,
controlled API failures, and negative results-readiness checks. Representative
images were **opened and visually inspected**, not merely generated:

- Klook results at 1366px/375px: readable fixture rows, mobile validity placement,
  update caption and page copy; 640px dark results also readable.
- Klook empty desktop and last-available mobile: expected messages rendered.
- Miles comparison desktop/mobile: income under the DBS name, no added column,
  missing-income row without a summary, readable wrapping.
- Focused income images: both amounts and notes, local-only, foreigner-only,
  notes-only, and absent amounts rendered correctly; narrow tiles stack and the
  640px dark income section is readable.

Full-page images preserve the application's existing sticky Subscribe button,
which can overlay body copy at the current viewport bottom. The focused capture
scrolls the income section to the viewport top so that its amounts/notes are not
covered; it does not hide the button or change application styles. The initial
overlapped focused image was retained separately and the complete miles group was
rerun into a new directory. These observations are fixture-backed rendering
evidence only; they do not certify live API compatibility or retroactively change
the historical deliveries' acceptance status.

### Reusable summary for the opencode-config improvement session

SG Alerts now supplies `yarn ui:preview build|serve|capture --worktree <clean target>`.
Install controller dependencies and Chromium (or select installed Chrome), build
a fresh dedicated target with the recipe's fixture API override, then capture
`--group klook|miles --output <new directory>`. The runner waits for actual fixture
content, checks prefixed/root-relative navigation, and captures desktop/mobile
plus a dark breakpoint view with bounded waits and owned-resource cleanup. Open
the PNGs and record observations. Label evidence **fixture-backed visual rendering,
not live API compatibility**. Read the recipe from the delivery base after merge;
do not treat newly added recipes as pre-publication acceptance for their own PR.
