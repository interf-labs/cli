import {
  existsSync,
  mkdirSync,
  cpSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { BUNDLED_SKILLS_DIR } from "./config.js";

// --- Agent registry ---

export interface AgentConfig {
  name: string;
  displayName: string;
  skillsDir: string;
  detect: () => boolean;
}

export function createAgents(home: string = homedir()): Record<string, AgentConfig> {
  return {
    "claude-code": {
      name: "claude-code",
      displayName: "Claude Code",
      skillsDir: join(home, ".claude", "skills"),
      detect: () => existsSync(join(home, ".claude")),
    },
    codex: {
      name: "codex",
      displayName: "Codex",
      skillsDir: join(home, ".codex", "skills"),
      detect: () => existsSync(join(home, ".codex")),
    },
    cursor: {
      name: "cursor",
      displayName: "Cursor",
      skillsDir: join(home, ".cursor", "skills"),
      detect: () => existsSync(join(home, ".cursor")),
    },
    goose: {
      name: "goose",
      displayName: "Goose",
      skillsDir: join(home, ".config", "goose", "skills"),
      detect: () => existsSync(join(home, ".config", "goose")),
    },
  };
}

export function detectAgents(
  agents?: Record<string, AgentConfig>,
  filter?: string[],
): AgentConfig[] {
  const all = agents ?? createAgents();
  const detected: AgentConfig[] = [];

  for (const [key, config] of Object.entries(all)) {
    if (filter && !filter.includes(key)) continue;
    if (config.detect()) detected.push(config);
  }

  return detected;
}

// --- Skill discovery ---

export interface SkillInfo {
  name: string;
  bundledPath: string;
}

export function listBundledSkills(): SkillInfo[] {
  if (!existsSync(BUNDLED_SKILLS_DIR)) return [];

  return readdirSync(BUNDLED_SKILLS_DIR)
    .filter((name) => {
      const skillDir = join(BUNDLED_SKILLS_DIR, name);
      return (
        statSync(skillDir).isDirectory() &&
        existsSync(join(skillDir, "SKILL.md"))
      );
    })
    .map((name) => ({
      name,
      bundledPath: join(BUNDLED_SKILLS_DIR, name),
    }));
}

export function isSkillInstalled(skillName: string, agent: AgentConfig): boolean {
  return existsSync(join(agent.skillsDir, skillName, "SKILL.md"));
}

// --- Skill installation ---

export interface InstallResult {
  skill: string;
  agent: string;
  success: boolean;
  error?: string;
}

export function installSkillToAgent(
  skillName: string,
  agent: AgentConfig,
): InstallResult {
  const source = join(BUNDLED_SKILLS_DIR, skillName);
  if (!existsSync(source)) {
    return { skill: skillName, agent: agent.displayName, success: false, error: `Skill "${skillName}" not found` };
  }

  try {
    const target = join(agent.skillsDir, skillName);
    mkdirSync(target, { recursive: true });
    cpSync(source, target, { recursive: true });
    return { skill: skillName, agent: agent.displayName, success: true };
  } catch (e) {
    return { skill: skillName, agent: agent.displayName, success: false, error: (e as Error).message };
  }
}

export function installAllSkills(agents?: AgentConfig[]): InstallResult[] {
  const targetAgents = agents ?? detectAgents();
  const skills = listBundledSkills();
  const results: InstallResult[] = [];

  for (const skill of skills) {
    for (const agent of targetAgents) {
      results.push(installSkillToAgent(skill.name, agent));
    }
  }

  return results;
}
