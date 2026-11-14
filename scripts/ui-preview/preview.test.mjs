import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mkdtemp,
  mkdir,
  realpath,
  writeFile,
  rm,
  symlink,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { apiBase, fixtureKey, startServer, staticFile } from "./server.mjs";
import { exportHash, validateSnapshot } from "./build.mjs";
import { loadScenarios, outside, unchanged } from "./scenario.mjs";
import { bounded } from "./capture.mjs";

async function temporary(t) {
  const root = await realpath(
    await mkdtemp(path.join(os.tmpdir(), "sg-ui-preview-test-")),
  );
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test("static preview supports prefix/root paths and rejects escapes, symlinks and missing routes", async (t) => {
  const root = await temporary(t);
  const out = path.join(root, "out");
  await mkdir(path.join(out, "example"), { recursive: true });
  await writeFile(path.join(out, "example/index.html"), "exported page");
  await writeFile(path.join(root, "private.txt"), "outside export");
  await symlink(path.join(root, "private.txt"), path.join(out, "escape.txt"));
  assert.equal(
    await staticFile(out, "/sg-alerts/example/"),
    await staticFile(out, "/example/"),
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

test("fixture matching is exact and read-only; cleanup leaves other listeners alone", async (t) => {
  const root = await temporary(t);
  await writeFile(path.join(root, "index.html"), "export");
  const fixtures = [
    { url: "/example?b=2&a=1", status: 200, body: { items: [] } },
    { url: "/failure", status: 503, body: { error: "controlled" } },
  ];
  const preview = await startServer(root, fixtures);
  const other = await startServer(root, []);
  try {
    assert.equal(
      await (await fetch(`${preview.origin}/sg-alerts/`)).text(),
      "export",
    );
    assert.deepEqual(
      await (await fetch(`${preview.origin}${apiBase}/example?a=1&b=2`)).json(),
      { items: [] },
    );
    for (const query of ["", "?a=1", "?a=1&b=2&extra=1", "?a=1&a=1&b=2"]) {
      assert.equal(
        (await fetch(`${preview.origin}${apiBase}/example${query}`)).status,
        404,
      );
    }
    assert.equal(
      (await fetch(`${preview.origin}${apiBase}/failure`)).status,
      503,
    );
    assert.equal((await fetch(`${preview.origin}/not-a-route/`)).status, 404);
    for (const method of ["POST", "PUT", "DELETE"]) {
      assert.equal(
        (await fetch(`${preview.origin}${apiBase}/example`, { method })).status,
        405,
      );
    }
    assert.equal(
      (await fetch(`${preview.origin}/`, { method: "HEAD" })).status,
      200,
    );
  } finally {
    await preview.close();
  }
  try {
    await assert.rejects(fetch(preview.origin));
    assert.equal((await fetch(other.origin)).status, 200);
  } finally {
    await other.close();
  }
  assert.throws(
    () => fixtureKey("https://live.invalid/example"),
    /local API path/,
  );
});

test("temporary modules support fixture-free pages, reject malformed input, and detect edits", async (t) => {
  const root = await temporary(t);
  const controller = path.join(root, "controller");
  const target = path.join(root, "target");
  const out = path.join(target, "out");
  await mkdir(controller);
  await mkdir(out, { recursive: true });
  await writeFile(path.join(out, "index.html"), "export");
  const file = path.join(root, "scenario.mjs");
  const good =
    'export default [{ name: "static", route: "/", fixtures: [], async ready(page) { await page.locator("h1").waitFor(); } }];';
  await writeFile(file, good);
  const input = await loadScenarios(file, [controller, target], out);
  assert.equal(input.scenarios[0].fixtures.length, 0);
  await unchanged(input);
  await writeFile(file, `${good}\n// changed`);
  await assert.rejects(unchanged(input), /changed during/);
  await assert.rejects(loadScenarios(file, [root], out), /outside controller/);
  await assert.rejects(loadScenarios("relative.mjs", [], out), /absolute path/);
  assert.throws(
    () => outside(path.join(target, "evidence"), [target]),
    /outside/,
  );
  await assert.rejects(
    loadScenarios(file, [], out, "missing"),
    /Unknown --scenario/,
  );
  for (const [source, error] of [
    ["export default [];", /nonempty array/],
    [good.replace('name: "static"', 'name: "../escape"'), /slug/],
    [
      good.replace('route: "/"', 'route: "/missing/"'),
      /missing exported route/,
    ],
    [
      good.replace('route: "/"', 'route: "https://remote.invalid"'),
      /local route/,
    ],
    [good.replace("fixtures: []", "fixtures: {}"), /fixtures must/],
    [
      good.replace(
        "fixtures: []",
        'fixtures: [{url:"/example",status:101,body:{}}]',
      ),
      /explicit status/,
    ],
    [good.replace("async ready(page)", "async other(page)"), /ready/],
  ]) {
    await writeFile(file, source);
    await assert.rejects(loadScenarios(file, [], out), error);
  }
});

test("build snapshot rejects different SHA, target, configuration or exported assets", async (t) => {
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
  const changed = await exportHash(root);
  assert.notEqual(changed, digest);
  assert.throws(() => validateSnapshot(info, current, changed), /Stale/);
});

test("task-supplied asynchronous readiness cannot wait forever", async () => {
  await assert.rejects(
    bounded(() => new Promise(() => {}), 20, "readiness"),
    /readiness exceeded/,
  );
  assert.equal(await bounded(async () => "ready", 100, "readiness"), "ready");
});
