import { parseArgs } from "node:util";
import path from "node:path";
import { realpath } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build, verifiedBuild } from "./ui-preview/build.mjs";
import { startServer } from "./ui-preview/server.mjs";
import { loadScenarios, unchanged } from "./ui-preview/scenario.mjs";

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      worktree: { type: "string", default: process.cwd() },
      scenario: { type: "string" },
      "scenario-file": { type: "string" },
      output: { type: "string" },
      channel: { type: "string" },
      dark: { type: "boolean", default: false },
    },
  });
  const [command] = positionals;
  if (
    positionals.length !== 1 ||
    !["build", "serve", "capture"].includes(command)
  ) {
    throw new Error(
      "Usage: yarn ui:preview build|serve|capture --worktree /absolute/target [--scenario-file /external/scenario.mjs] [--scenario name] [--output /new/evidence-directory] [--channel chrome] [--dark]",
    );
  }
  const target = path.resolve(values.worktree);
  if (command === "build") {
    await build(target);
  } else {
    const info = await verifiedBuild(target);
    const roots = [
      info.worktree,
      await realpath(fileURLToPath(new URL("../", import.meta.url))),
    ];
    const input = await loadScenarios(
      values["scenario-file"],
      roots,
      path.join(target, "out"),
      values.scenario,
    );
    if (command === "serve") {
      if (input.scenarios.length !== 1) {
        throw new Error(
          "serve needs --scenario <name> when the module contains several scenarios.",
        );
      }
      const preview = await startServer(
        path.join(target, "out"),
        input.scenarios[0].fixtures,
      );
      process.stdout.write(
        `FIXTURE_PREVIEW ${preview.origin}/sg-alerts${input.scenarios[0].route}\n${JSON.stringify(info)}\nScenario: ${input.scenarios[0].name}; sha256=${input.sha256}; fixture-backed, NOT live API evidence. Ctrl+C stops only this server; restart after changing the scenario.\n`,
      );
      await new Promise((resolve) => {
        const stop = () => resolve();
        process.once("SIGINT", stop);
        process.once("SIGTERM", stop);
      });
      await preview.close();
      await unchanged(input);
    } else {
      if (!values.output) {
        throw new Error(
          "capture requires --output /new/evidence-directory (parent must exist).",
        );
      }
      const { capture } = await import("./ui-preview/capture.mjs");
      await capture(info, input, values, roots);
    }
  }
} catch (error) {
  console.error(`UI_PREVIEW_FAILED: ${error.message}`);
  process.exitCode = 1;
}
