import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { fixtureKey, staticFile } from "./server.mjs";

export function outside(file, roots) {
  if (
    roots.some((root) => file === root || file.startsWith(`${root}${path.sep}`))
  ) {
    throw new Error(
      "Scenario inputs and capture output must be outside controller and target repositories.",
    );
  }
  return file;
}
export async function scenarioHash(file) {
  return createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
}
export async function unchanged(input) {
  if ((await scenarioHash(input.file)) !== input.sha256) {
    throw new Error(
      "Scenario changed during the run; evidence rejected. Use a new output directory and rerun.",
    );
  }
}
export async function loadScenarios(file, roots, outDir, selected) {
  if (!file || !path.isAbsolute(file)) {
    throw new Error(
      "--scenario-file requires an absolute path to a trusted task-authored .mjs file outside repositories.",
    );
  }
  file = outside(await realpath(file), roots);
  if (path.extname(file) !== ".mjs") {
    throw new Error("Scenario file must be a self-contained .mjs module.");
  }
  const sha256 = await scenarioHash(file);
  // Import the exact hashed bytes. Relative imports have no task-directory base;
  // keep data and checks self-contained. This is trusted code, NOT a sandbox.
  const source = await readFile(file);
  if (createHash("sha256").update(source).digest("hex") !== sha256) {
    throw new Error("Scenario changed while loading.");
  }
  const { default: scenarios } = await import(
    `data:text/javascript;base64,${source.toString("base64")}`
  );
  if (!Array.isArray(scenarios) || !scenarios.length) {
    throw new Error("Scenario module must default-export a nonempty array.");
  }
  const names = [];
  for (const scenario of scenarios) {
    if (
      !scenario ||
      !/^[a-z0-9][a-z0-9-]{0,63}$/.test(scenario.name) ||
      names.includes(scenario.name)
    ) {
      throw new Error(
        "Each scenario needs a unique lowercase slug name (maximum 64 characters).",
      );
    }
    names.push(scenario.name);
    if (
      typeof scenario.route !== "string" ||
      !scenario.route.startsWith("/") ||
      scenario.route.startsWith("//") ||
      typeof scenario.ready !== "function"
    ) {
      throw new Error(
        `${scenario.name}: provide a local route and async ready(page) checking the actual changed content.`,
      );
    }
    const url = new URL(scenario.route, "http://preview");
    if (
      url.origin !== "http://preview" ||
      url.pathname === "/sg-alerts" ||
      url.pathname.startsWith("/sg-alerts/")
    ) {
      throw new Error(
        `${scenario.name}: use an unprefixed local application route, not an origin or /sg-alerts prefix.`,
      );
    }
    try {
      const exported = await staticFile(outDir, url.pathname);
      if (path.extname(exported) !== ".html") {
        throw new Error("not an HTML page");
      }
    } catch (error) {
      throw new Error(
        `${scenario.name}: missing exported route ${scenario.route}. Select the correct worktree and rebuild. ${error.message}`,
      );
    }
    if (
      !Array.isArray(scenario.fixtures) ||
      (scenario.navigate !== undefined &&
        typeof scenario.navigate !== "function") ||
      (scenario.focus !== undefined && typeof scenario.focus !== "string")
    ) {
      throw new Error(
        `${scenario.name}: fixtures must be an array; navigate must be a function and focus a CSS selector when supplied.`,
      );
    }
    const keys = [];
    for (const fixture of scenario.fixtures) {
      const key = fixtureKey(fixture.url);
      if (
        !Number.isInteger(fixture.status) ||
        fixture.status < 200 ||
        fixture.status > 599 ||
        !Object.hasOwn(fixture, "body") ||
        keys.includes(key)
      ) {
        throw new Error(
          `${scenario.name}: fixtures need unique URLs, explicit status (200–599) and JSON body.`,
        );
      }
      if (JSON.stringify(fixture.body) === undefined) {
        throw new Error(
          `${scenario.name}: fixture body must be JSON serializable.`,
        );
      }
      keys.push(key);
    }
  }
  const chosen = scenarios.filter(
    (scenario) => !selected || scenario.name === selected,
  );
  if (!chosen.length) {
    throw new Error(
      `Unknown --scenario ${selected}; choose ${names.join(", ")}.`,
    );
  }
  const input = { file, sha256, scenarios: chosen };
  await unchanged(input);
  return input;
}
