import { parseArgs } from "node:util";
import path from "node:path";
import { build, verifiedBuild, requireSupport } from "./ui-preview/build.mjs";
import { startServer } from "./ui-preview/server.mjs";
import { scenarios } from "./ui-preview/fixtures/scenarios.mjs";

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      worktree: { type: "string", default: process.cwd() },
      scenario: { type: "string" },
      group: { type: "string" },
      output: { type: "string" },
      channel: { type: "string" },
    },
  });
  const [command] = positionals;
  if (
    positionals.length !== 1 ||
    !["build", "serve", "capture"].includes(command)
  ) {
    throw new Error(
      "Usage: yarn ui:preview build|serve|capture --worktree /absolute/target [--scenario name | --group klook|miles --output /new/evidence-directory] [--channel chrome]",
    );
  }
  const target = path.resolve(values.worktree);
  if (command === "build") {
    await build(target);
  } else {
    const info = await verifiedBuild(target);
    if (command === "serve") {
      if (!scenarios[values.scenario]) {
        throw new Error(
          `Choose --scenario from: ${Object.keys(scenarios).join(", ")}`,
        );
      }
      await requireSupport(target, scenarios[values.scenario].group);
      const preview = await startServer(
        path.join(target, "out"),
        values.scenario,
      );
      process.stdout.write(
        `FIXTURE_PREVIEW ${preview.origin}/sg-alerts/\n${JSON.stringify(info)}\nScenario: ${values.scenario}; fixture-backed, NOT live API evidence. Ctrl+C stops only this server.\n`,
      );
      await new Promise((resolve) => {
        const stop = () => resolve();
        process.once("SIGINT", stop);
        process.once("SIGTERM", stop);
      });
      await preview.close();
    } else {
      if (!values.output || !["klook", "miles"].includes(values.group)) {
        throw new Error(
          "capture requires --group klook|miles and --output /new/evidence-directory (parent must exist).",
        );
      }
      await requireSupport(target, values.group);
      const { capture } = await import("./ui-preview/capture.mjs");
      await capture(info, values);
    }
  }
} catch (error) {
  console.error(`UI_PREVIEW_FAILED: ${error.message}`);
  process.exitCode = 1;
}
