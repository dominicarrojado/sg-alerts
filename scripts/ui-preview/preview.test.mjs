import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { startServer, staticFile } from "./server.mjs";
import { exportHash, validateSnapshot, requireSupport } from "./build.mjs";
import { apiBase, fixtureResponse, scenarios } from "./fixtures/scenarios.mjs";

async function temporary(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "sg-ui-preview-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test("fixtures enforce endpoint/query contracts and represent all income states", () => {
  const endpoint = `${apiBase}/travel-credit-cards-checker/travel-credit-cards-info`;
  for (const [scenario, config] of Object.entries(scenarios)) {
    if (config.group !== "miles") {
      continue;
    }
    const result = fixtureResponse(scenario, endpoint, new URLSearchParams());
    assert.equal(result.status, config.failure ? 503 : 200);
    if (!config.failure) {
      assert.equal(result.body.items[0].id, "dbs-altitude");
      assert.deepEqual(result.body.items[0].minimumAnnualIncome, config.income);
      assert.equal(result.body.items[1].minimumAnnualIncome, undefined);
    }
  }
  const travel = `${apiBase}/travel-deals-checker/travel-deals-info`;
  assert.equal(
    fixtureResponse(
      "klook-results",
      travel,
      new URLSearchParams("service=klook"),
    ).body.items.length,
    2,
  );
  assert.equal(
    fixtureResponse("klook-empty", travel, new URLSearchParams("service=klook"))
      .body.items.length,
    0,
  );
  assert.ok(
    fixtureResponse(
      "klook-last-available",
      travel,
      new URLSearchParams("service=klook"),
    ).body.lastAvailableAt,
  );
  for (const query of [
    "",
    "service=traveloka",
    "service=klook&extra=1",
    "service=klook&service=klook",
  ]) {
    assert.equal(
      fixtureResponse("klook-results", travel, new URLSearchParams(query))
        .status,
      404,
    );
  }
  assert.equal(
    fixtureResponse("miles-income", endpoint, new URLSearchParams("extra=1"))
      .status,
    404,
  );
});

test("static preview supports prefix and root paths, rejects escape/symlinks, no SPA fallback", async (t) => {
  const root = await temporary(t);
  const out = path.join(root, "out");
  await mkdir(path.join(out, "topics/example"), { recursive: true });
  await writeFile(
    path.join(out, "topics/example/index.html"),
    "real exported page",
  );
  await writeFile(path.join(root, "private.txt"), "outside export");
  await symlink(path.join(root, "private.txt"), path.join(out, "escape.txt"));
  assert.equal(
    await staticFile(out, "/sg-alerts/topics/example/"),
    await staticFile(out, "/topics/example/"),
  );
  for (const url of [
    "/%2e%2e/private.txt",
    "/escape.txt",
    "/%00",
    "/%5cprivate",
    "/missing/",
  ]) {
    await assert.rejects(staticFile(out, url));
  }
});

test("owned loopback server is read-only, diagnoses unmatched fixtures and releases its port", async (t) => {
  const root = await temporary(t);
  await writeFile(path.join(root, "index.html"), "export");
  const preview = await startServer(root, "klook-results");
  try {
    assert.equal(
      await (await fetch(`${preview.origin}/sg-alerts/`)).text(),
      "export",
    );
    assert.equal(
      (
        await fetch(
          `${preview.origin}${apiBase}/travel-deals-checker/travel-deals-info?service=klook`,
        )
      ).status,
      200,
    );
    assert.equal(
      (await fetch(`${preview.origin}${apiBase}/unknown`)).status,
      404,
    );
    assert.equal((await fetch(`${preview.origin}/not-a-route/`)).status, 404);
    assert.equal(
      (await fetch(`${preview.origin}${apiBase}/unknown`, { method: "POST" }))
        .status,
      405,
    );
    assert.equal(
      (await fetch(`${preview.origin}/`, { method: "PUT" })).status,
      405,
    );
    assert.equal(
      (await fetch(`${preview.origin}/`, { method: "HEAD" })).status,
      200,
    );
    assert.ok(preview.log.some((entry) => entry.status === 405));
  } finally {
    await preview.close();
  }
  await assert.rejects(fetch(preview.origin));
});

test("build snapshot rejects changed SHA, target, configuration and any changed exported asset", async (t) => {
  const root = await temporary(t);
  await writeFile(path.join(root, "index.html"), "unchanged index");
  await writeFile(path.join(root, "chunk.js"), "original");
  const digest = await exportHash(root);
  const current = { worktree: root, sha: "a" };
  const info = { ...current, apiBase, exportHash: digest };
  assert.doesNotThrow(() => validateSnapshot(info, current, digest));
  for (const change of [
    { sha: "b" },
    { worktree: "/other" },
    { apiBase: "https://live.invalid" },
  ]) {
    assert.throws(
      () => validateSnapshot({ ...info, ...change }, current, digest),
      /Stale/,
    );
  }
  await writeFile(path.join(root, "chunk.js"), "changed");
  assert.throws(
    () => validateSnapshot(info, current, digest + "changed"),
    /Stale/,
  );
  const changed = await exportHash(root);
  assert.notEqual(changed, digest);
  assert.throws(() => validateSnapshot(info, current, changed), /Stale/);
});

test("missing feature content yields actionable prerequisites, not substituted routes", async (t) => {
  const root = await temporary(t);
  await assert.rejects(
    requireSupport(root, "klook"),
    /Target lacks the Klook route/,
  );
  await mkdir(path.join(root, "app/topics/miles-credit-cards"), {
    recursive: true,
  });
  await writeFile(
    path.join(
      root,
      "app/topics/miles-credit-cards/miles-credit-card-details.tsx",
    ),
    "old component",
  );
  await assert.rejects(
    requireSupport(root, "miles"),
    /Target lacks minimumAnnualIncome/,
  );
});
