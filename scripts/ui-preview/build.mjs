import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, readdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { apiBase } from "./fixtures/scenarios.mjs";

const marker = ".ui-preview-build.json";
export async function exportHash(root) {
  const hash = createHash("sha256");
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new Error(`Export contains a symlink: ${file}`);
      }
      if (entry.isDirectory()) {
        await visit(file);
      } else {
        hash.update(path.relative(root, file));
        hash.update("\0");
        hash.update(await readFile(file));
        hash.update("\0");
      }
    }
  }
  await visit(root);
  return hash.digest("hex");
}
export async function requireSupport(target, group) {
  if (group === "klook") {
    if (
      !existsSync(path.join(target, "app/topics/klook-travel-deals/page.tsx"))
    ) {
      throw new Error(
        "Target lacks the Klook route. Select a current Klook feature head or a base containing the merged feature.",
      );
    }
  } else if (group === "miles") {
    const source = await readFile(
      path.join(
        target,
        "app/topics/miles-credit-cards/miles-credit-card-details.tsx",
      ),
      "utf8",
    );
    if (!source.includes("minimumAnnualIncome")) {
      throw new Error(
        "Target lacks minimumAnnualIncome rendering. Select a current income feature head or a base containing the merged feature.",
      );
    }
  }
}
export function validateSnapshot(info, current, hash) {
  if (
    info.worktree !== current.worktree ||
    info.sha !== current.sha ||
    info.apiBase !== apiBase ||
    info.exportHash !== hash
  ) {
    throw new Error(
      "Stale/mismatched fixture build; create a fresh preview worktree and rebuild.",
    );
  }
}
export function git(target, ...args) {
  return execFileSync("git", args, {
    cwd: target,
    encoding: "utf8",
    timeout: 10000,
  }).trim();
}
export async function identity(target) {
  const worktree = await realpath(target);
  if (git(worktree, "rev-parse", "--show-toplevel") !== worktree) {
    throw new Error("--worktree must name a Git worktree root.");
  }
  const dirty = git(
    worktree,
    "status",
    "--porcelain",
    "--untracked-files=normal",
  );
  if (dirty) {
    throw new Error(
      `Preview requires a clean dedicated worktree; commit changes or create a detached preview worktree.\n${dirty}`,
    );
  }
  return {
    worktree,
    sha: git(worktree, "rev-parse", "HEAD"),
    dirty: false,
    apiBase,
  };
}
export async function build(target) {
  const info = await identity(target);
  if (!existsSync(path.join(target, "node_modules/next/package.json"))) {
    throw new Error(
      "Missing target dependencies. Run yarn install --frozen-lockfile in the target worktree.",
    );
  }
  for (const name of [".next", "out", marker]) {
    if (existsSync(path.join(target, name))) {
      throw new Error(
        `${name} already exists. Use a fresh dedicated preview worktree; existing outputs will not be deleted.`,
      );
    }
  }
  process.stdout.write(
    `Building fixture-backed export: ${JSON.stringify(info)}\n`,
  );
  await new Promise((resolve, reject) => {
    const child = spawn("yarn", ["build"], {
      cwd: target,
      env: { ...process.env, NEXT_PUBLIC_API_URL: apiBase },
      stdio: "inherit",
      detached: true,
    });
    let failure;
    const stop = (reason) => {
      failure = new Error(reason);
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") {
          failure = error;
        }
      }
    };
    const onInterrupt = () =>
      stop(
        "Preview build interrupted; only this build's process group was stopped.",
      );
    process.once("SIGINT", onInterrupt);
    process.once("SIGTERM", onInterrupt);
    const timer = setTimeout(
      () => stop("Preview build exceeded 600 seconds."),
      600000,
    );
    const onExit = () => {
      clearTimeout(timer);
      process.removeListener("SIGINT", onInterrupt);
      process.removeListener("SIGTERM", onInterrupt);
    };
    child.once("error", (error) => {
      onExit();
      reject(error);
    });
    child.once("exit", (code) => {
      onExit();
      if (failure || code !== 0) {
        reject(
          failure ||
            new Error(
              `Build exited ${code}. Check dependency/font-download diagnostics above; no usable preview was recorded.`,
            ),
        );
      } else {
        resolve();
      }
    });
  });
  const after = await identity(target);
  if (after.sha !== info.sha) {
    throw new Error("Worktree changed during build; export rejected.");
  }
  const digest = await exportHash(path.join(target, "out"));
  await writeFile(
    path.join(target, marker),
    JSON.stringify(
      {
        ...info,
        builtAt: new Date().toISOString(),
        exportHash: digest,
      },
      null,
      2,
    ),
    { flag: "wx", mode: 0o600 },
  );
}
export async function verifiedBuild(target) {
  // Marker is a local untracked file; exclude only that exact recipe-created path.
  const worktree = await realpath(target);
  if (git(worktree, "rev-parse", "--show-toplevel") !== worktree) {
    throw new Error("--worktree must name a worktree root.");
  }
  const dirty = git(
    worktree,
    "status",
    "--porcelain",
    "--untracked-files=normal",
    "--",
    ".",
    `:(exclude)${marker}`,
  );
  if (dirty) {
    throw new Error(`Target changed since preview build:\n${dirty}`);
  }
  let info;
  try {
    info = JSON.parse(await readFile(path.join(worktree, marker), "utf8"));
  } catch (error) {
    throw new Error(
      `No valid fixture build. Run ui:preview build in a fresh dedicated worktree. ${error.message}`,
    );
  }
  validateSnapshot(
    info,
    { worktree, sha: git(worktree, "rev-parse", "HEAD") },
    await exportHash(path.join(worktree, "out")),
  );
  return info;
}
