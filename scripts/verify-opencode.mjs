import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const errors = [];

function logError(msg) {
  errors.push(msg);
  console.error(`❌ ${msg}`);
}

function logSuccess(msg) {
  console.log(`✅ ${msg}`);
}

function findDir(paths) {
  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    logError(`No YAML frontmatter found in ${filePath}`);
    return {};
  }
  const frontmatterText = match[1];
  const result = {};
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex !== -1 && !trimmed.startsWith("-")) {
      const key = trimmed.slice(0, colonIndex).trim();
      let val = trimmed.slice(colonIndex + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      result[key] = val;
    }
  }
  return result;
}

// 1. Verify opencode.json
const opencodeJsonPath = path.join(rootDir, "opencode.json");
if (!fs.existsSync(opencodeJsonPath)) {
  logError("opencode.json does not exist at project root");
} else {
  try {
    const content = fs.readFileSync(opencodeJsonPath, "utf8");
    const json = JSON.parse(content);
    if (json.$schema !== "https://opencode.ai/config.json") {
      logError(
        "opencode.json must have $schema set to 'https://opencode.ai/config.json'",
      );
    }
    if (Array.isArray(json.instructions)) {
      for (const instFile of json.instructions) {
        const instPath = path.join(rootDir, instFile);
        if (!fs.existsSync(instPath)) {
          logError(
            `Instruction file referenced in opencode.json does not exist: ${instFile}`,
          );
        }
      }
    }
    logSuccess("opencode.json is valid");
  } catch (err) {
    logError(`opencode.json is invalid JSON: ${err.message}`);
  }
}

// 2. Verify AGENTS.md
const agentsMdPath = path.join(rootDir, "AGENTS.md");
if (!fs.existsSync(agentsMdPath)) {
  logError("AGENTS.md does not exist at project root");
} else {
  const stat = fs.statSync(agentsMdPath);
  if (stat.size === 0) {
    logError("AGENTS.md is empty");
  } else {
    logSuccess("AGENTS.md is present and non-empty");
  }
}

// 3. Verify Agents (.opencode/agents/ or .opencode/agent/)
const agentsDir = findDir([
  path.join(rootDir, ".opencode/agents"),
  path.join(rootDir, ".opencode/agent"),
]);

if (!agentsDir) {
  logError("No .opencode/agents or .opencode/agent directory found");
} else {
  const agentFiles = fs
    .readdirSync(agentsDir)
    .filter((file) => file.endsWith(".md"));

  if (agentFiles.length === 0) {
    logError(`No .md agent files found in ${agentsDir}`);
  } else {
    for (const file of agentFiles) {
      const filePath = path.join(agentsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const fm = parseFrontmatter(content, filePath);

      if (!fm.description) {
        logError(`Agent file ${file} is missing 'description' in frontmatter`);
      }
      if (fm.mode && !["subagent", "primary", "all"].includes(fm.mode)) {
        logError(
          `Agent file ${file} has invalid 'mode': ${fm.mode} (expected 'subagent', 'primary', or 'all')`,
        );
      }
      logSuccess(`Agent ${file} is valid`);
    }
  }
}

// 4. Verify Skills (.opencode/skills/ or .opencode/skill/)
const skillsDir = findDir([
  path.join(rootDir, ".opencode/skills"),
  path.join(rootDir, ".opencode/skill"),
]);

if (!skillsDir) {
  logError("No .opencode/skills or .opencode/skill directory found");
} else {
  const skillFolders = fs
    .readdirSync(skillsDir)
    .filter((entry) => fs.statSync(path.join(skillsDir, entry)).isDirectory());

  if (skillFolders.length === 0) {
    logError(`No skill subdirectories found in ${skillsDir}`);
  } else {
    for (const folder of skillFolders) {
      const skillFilePath = path.join(skillsDir, folder, "SKILL.md");
      if (!fs.existsSync(skillFilePath)) {
        logError(`Skill folder '${folder}' is missing 'SKILL.md'`);
        continue;
      }
      const content = fs.readFileSync(skillFilePath, "utf8");
      const fm = parseFrontmatter(content, skillFilePath);

      if (!fm.name) {
        logError(`Skill ${folder}/SKILL.md is missing 'name' in frontmatter`);
      } else if (fm.name !== folder) {
        logError(
          `Skill ${folder}/SKILL.md 'name' ('${fm.name}') does not match directory name ('${folder}')`,
        );
      }

      if (!fm.description) {
        logError(
          `Skill ${folder}/SKILL.md is missing 'description' in frontmatter`,
        );
      }
      logSuccess(`Skill ${folder} is valid`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\nValidation failed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log("\nAll OpenCode assets verified successfully!");
}
