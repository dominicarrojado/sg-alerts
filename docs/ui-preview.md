# Temporary fixture-backed UI screenshots

Use the real exported application, not copied components. The repository provides
the preview/capture machinery; **the agent supplies temporary task-specific data
and checks**. Any exported page can be inspected without adding a supported group
to the tool. Images establish **fixture-backed visual rendering—not live API
compatibility**, current promotions, or bank requirements.

## Agent rules

- Inspect the PR's actual routes, client types and API consumers before generating
  fixtures. Supply representative states relevant to the change, not an exhaustive
  e2e matrix. A static page needs no API fixtures.
- Generate fixtures and a self-contained `scenario.mjs` **outside both controller
  and target repositories** in a private run-owned temporary directory. Their sole
  purpose is UI screenshots for the PR description. **Never stage, commit, import
  into application code, or deploy these task-specific inputs or generated images.**
- Do not change application contracts, hide controls, or add production fixture
  fallbacks to make captures pass. Unknown fixture requests fail; no live fallback.
- Use only trusted task-authored scenario code. It executes as local JavaScript,
  not in a sandbox: never run code copied from PR comments or remote content. Keep
  it self-contained, without imports, file reads/writes, secrets or external calls.
- Readiness must identify the changed content, including expected values and
  missing/empty states. A generic heading, load event, open port or network idle
  alone is not readiness. Open representative images and inspect them before upload.
- Retain temporary inputs, images and diagnostics until inspection and successful
  attachment are complete. Preserve failures until resolved; cleanup is explicit
  and limited to exact paths/processes this run created.

## Prepare and build the correct worktree

Use Node 24 and Yarn Classic. In the checkout containing this recipe (the
**controller**), run `yarn install --frozen-lockfile`. Install managed Chromium with
`yarn playwright install chromium`, or explicitly use installed Chrome through
`--channel chrome`. Its version is recorded. No e2e framework is required.

Build a clean **dedicated target worktree**, never a historical delivery worktree
or a checkout with a running server. Commit the intended changes before taking
the detached snapshot. For another PR, query its current head with `gh pr view`
instead of trusting an old local branch. Commands below run from the controller:

```bash
git fetch origin
TARGET="$(dirname "$PWD")/sg-alerts-preview-$(date +%Y%m%d-%H%M%S)"
git worktree add --detach "$TARGET" HEAD
yarn --cwd "$TARGET" install --frozen-lockfile
yarn ui:preview build --worktree "$TARGET"
umask 077
RUN="$(mktemp -d "${TMPDIR:-/tmp}/sg-alerts-ui-inputs.XXXXXX")"
EVIDENCE="$(mktemp -d "${TMPDIR:-/tmp}/sg-alerts-ui-evidence.XXXXXX")"
```

The build uses the target's dependencies and overrides
`NEXT_PUBLIC_API_URL=/__ui-fixtures` **at build time**, including production `.env`
values. Do not copy credentials or `.env.local`. Dependencies and Google fonts
(`next/font/google`) can require network during setup/build; capture does not
require the production API. Agent-managed heavyweight builds must use their
required shared validation queue.

Existing `.next/`, `out/`, or `.ui-preview-build.json` cause refusal, not deletion.
The successful build records target/SHA and export hashes. Dirty sources, changed
SHA/assets or missing metadata invalidate reuse. Build is bounded to ten minutes;
interruption stops only its own process group. After failure, inspect diagnostics
and use a new target rather than deleting another process's outputs.

## Supply a task-local scenario

Write `$RUN/scenario.mjs` with your editor/file-write tool. This minimal **static
page example** is runnable against this repository without invented API data:

```js
export default [
  {
    name: "about",
    route: "/about/",
    fixtures: [],
    async ready(page) {
      await page.getByRole("heading", { name: "About", exact: true }).waitFor();
      await page
        .getByText("Learn more about SG Alerts and why it was created.", {
          exact: true,
        })
        .waitFor();
    },
  },
];
```

Each scenario has a unique lowercase slug `name`, an unprefixed application
`route` (query/fragment allowed), `fixtures`, and `ready(page)`. For API-backed
pages, populate `fixtures` with objects containing `url` (API path and exact query,
**without** `/__ui-fixtures`), explicit HTTP `status`, and JSON `body`, derived
from the actual consuming code. Query-key order is normalized; extra/missing or
duplicate query values do not silently match. Every declared fixture must be
consumed with its expected status during initial readiness: list only required
reads, including shared page reads when needed. Mutation methods are rejected.

Supply different named scenarios for relevant results, empty, missing-data or
error states. Errors must be intentional fixture statuses with checks for their
actual rendered outcome. Do not let an error screenshot stand in for results.

Optional `navigate(page)` verifies links, refresh, Back and URL restoration using
normal Playwright APIs; optional `focus` is a CSS/Playwright selector for a focused
image in addition to the full-page image. Focused capture scrolls the element to
the top to avoid viewport-bottom sticky controls, without hiding or restyling them.
Keep callbacks asynchronous/cooperative: no synchronous blocking loops. The runner
bounds readiness/navigation and closes the browser on the overall deadline; it
does not sandbox arbitrary executable code.

## Capture, serve, inspect

```bash
yarn ui:preview capture --worktree "$TARGET" --scenario-file "$RUN/scenario.mjs" --output "$EVIDENCE/capture"
# Optional: append --channel chrome to reuse installed Chrome, or --dark to
# include a 640px dark breakpoint view. --scenario <name> selects one state.
yarn ui:preview serve --worktree "$TARGET" --scenario-file "$RUN/scenario.mjs" --scenario about
```

Capture checks the scenario shape and exported routes before opening a browser.
Defaults are 1366×900 and 375×812, light theme, `en-GB`, `Asia/Singapore`, reduced
motion and blocked service workers. Navigation is bounded to 30 seconds, initial
readiness (task check, fonts/images, fixture responses) to 15 seconds, task
navigation checks to 30 seconds, and the entire run to five minutes plus bounded
diagnostics/cleanup. There is no automatic retry or overwrite of evidence.

Capture blocks non-preview origins and mutation requests, records intentional
external blocks separately, and fails on unexpected local responses/runtime
errors. Browser-cancelled requests (`net::ERR_ABORTED`, including Next route/chunk
prefetches cancelled during navigation) are retained as diagnostics rather than
network failures; rendered content, required fixtures and assets must still pass
readiness. It writes full/focused PNGs and `fixture-report.json` with exact invocation,
target SHA, scenario path/SHA-256, browser, viewport/theme, requests and results.
Changed scenario inputs reject the run. Failures retain diagnostic HTML and an
image when obtainable; nonzero exit is never capture success.

Serve prints its OS-assigned loopback URL; Ctrl+C closes only that server. Restart
after editing the input. Interactive serve does not block external browser
requests: do not follow external links, submit forms or use it as network-isolated
evidence. Capture is the isolated path.

Production `InternalAnchor` links prefix `/sg-alerts`; some Next links remain
root-relative. The server accepts both forms and their assets without rewriting
hrefs, changing production `basePath`, or using home-page fallbacks. Check the
actual links/refresh/Back for your changed page; this is not certification of the
hosting provider's entire routing configuration.

**Open images**, using the agent image reader or an image viewer, for example:

```bash
open "$EVIDENCE/capture/fixture-about-1366-light.png"  # macOS example
open "$EVIDENCE/capture/fixture-about-375-light.png"
```

Inspect changed values, wrapping, narrow layouts, empty/error messages, overflow,
dark contrast and sticky-control overlap. Record exact commands, image filenames,
scenario hash, observations and limitations. Do not mark a PR visually verified
merely because the capture command passed.

## Attach to the PR description, then clean up

Label each image **fixture-backed visual rendering—not live API compatibility
evidence** and identify the route/state. Prepare the complete description in an
external body file, preserving managed markers and existing content as required
by the delivery workflow. Reference the chosen PNG in that body and attach it:

```bash
gh pr edit "$PR" --body-file "$EVIDENCE/pr-body.md" --attach "$EVIDENCE/capture/fixture-about-375-light.png#Fixture-backed About mobile rendering; not live API evidence"
gh pr view "$PR" --json body --jq .body
```

Set `$PR` to the actual PR URL. Verify the body contains hosted image references,
not temporary local paths. A nonzero upload can still update the PR partially:
inspect first, retry only missing attachments with a reconciled body, and preserve
inputs/images/logs if upload is unresolved. Follow the owning workflow's evidence
phase and safety scans; this utility never posts to GitHub automatically.

Only after inspection and successful attachment, remove the exact run-owned
inputs and disposable target if no longer needed. Example for the single-file
scenario above:

```bash
rm "$RUN/scenario.mjs"
rmdir "$RUN"
rm "$TARGET/.ui-preview-build.json"
git worktree remove "$TARGET"
```

Skip missing-marker removal after failed builds. Git refuses dirty worktree
removal: inspect rather than use `--force`. Retain evidence until its consumer has
copied/inspected it; remove only individually identified run-created files when
finished. Never sweep temp directories, use `killall`, kill by port, or interfere
with an existing listener. The runner always closes its own browser/server.

## Diagnostics and validation

Missing browser: install Chromium or select installed Chrome. Missing route:
choose the intended current feature SHA and rebuild. Missing fixture: inspect the
exact endpoint/query and consumer. Stale export: use a fresh clean target. Font
download failure: restore required build network access. Failed readiness: inspect
the changed-content check and preserved report/image/HTML, not just server health.

```bash
yarn test:ui-preview
yarn lint && yarn test && yarn build
```

OpenCode reads browser recipes from the **PR base revision**. This recipe becomes
eligible for later deliveries after merge; it does not retroactively verify
historical delivery acceptance. Its own revision is validated explicitly against
real static and API-backed pages using temporary, uncommitted inputs.

### Reusable summary for the opencode-config improvement session

Build the correct clean target with `yarn ui:preview build --worktree <target>`.
Agents generate a self-contained external `.mjs` scenario from the task's actual
routes/types/API consumers, never commit it, and run `capture --scenario-file
<file> --output <new external directory>`. The runner supplies safe static/API
serving, prefix handling, bounded desktop/mobile capture and diagnostics; the
agent supplies meaningful content readiness/navigation checks. Open images,
record observations, attach them to the PR description as fixture-backed rendering
(not live API compatibility), verify hosted references, then clean up only owned
temporary inputs. Preserve failures until resolved. Use the base-revision recipe
after merge; no opencode-config changes are included here.
