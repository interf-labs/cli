import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  existsSync,
  mkdirSync,
  rmSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { BUNDLED_SKILLS_DIR } from "./config.js";
import {
  listBundledSkills,
  createAgents,
  detectAgents,
  installSkillToAgent,
  installAllSkills,
} from "./skills.js";

describe("bundled skills", () => {
  it("includes interf-scan skill", () => {
    expect(existsSync(join(BUNDLED_SKILLS_DIR, "interf-scan", "SKILL.md"))).toBe(true);
  });

  it("includes interf-simulate skill", () => {
    expect(existsSync(join(BUNDLED_SKILLS_DIR, "interf-simulate", "SKILL.md"))).toBe(true);
  });

  it("includes interf-protocol skill", () => {
    expect(existsSync(join(BUNDLED_SKILLS_DIR, "interf-protocol", "SKILL.md"))).toBe(true);
  });

  it("lists all 3 bundled skills", () => {
    const skills = listBundledSkills();
    const names = skills.map((s) => s.name);
    expect(names).toContain("interf-scan");
    expect(names).toContain("interf-simulate");
    expect(names).toContain("interf-protocol");
    expect(skills).toHaveLength(3);
  });

  it("skills have frontmatter with name and description", () => {
    for (const skill of ["interf-scan", "interf-simulate", "interf-protocol"]) {
      const content = readFileSync(
        join(BUNDLED_SKILLS_DIR, skill, "SKILL.md"),
        "utf-8",
      );
      expect(content).toMatch(/^---\n/);
      expect(content).toMatch(/name: /);
      expect(content).toMatch(/description: /);
    }
  });
});

describe("agent detection", () => {
  let testHome: string;

  beforeEach(() => {
    testHome = mkdtempSync(join(tmpdir(), "interf-agents-test-"));
  });

  afterEach(() => {
    rmSync(testHome, { recursive: true, force: true });
  });

  it("creates configs for all 4 agents", () => {
    const agents = createAgents(testHome);
    expect(Object.keys(agents)).toEqual(["claude-code", "codex", "cursor", "goose"]);
  });

  it("detects agents when their config dirs exist", () => {
    mkdirSync(join(testHome, ".claude"));
    mkdirSync(join(testHome, ".cursor"));

    const agents = createAgents(testHome);
    const detected = detectAgents(agents);

    expect(detected).toHaveLength(2);
    expect(detected.map((a) => a.name)).toContain("claude-code");
    expect(detected.map((a) => a.name)).toContain("cursor");
  });

  it("returns empty when no agents installed", () => {
    const agents = createAgents(testHome);
    const detected = detectAgents(agents);
    expect(detected).toHaveLength(0);
  });

  it("filters by agent name", () => {
    mkdirSync(join(testHome, ".claude"));
    mkdirSync(join(testHome, ".cursor"));
    mkdirSync(join(testHome, ".codex"));

    const agents = createAgents(testHome);
    const detected = detectAgents(agents, ["claude-code", "codex"]);

    expect(detected).toHaveLength(2);
    expect(detected.map((a) => a.name)).not.toContain("cursor");
  });
});

describe("skill installation", () => {
  let testHome: string;

  beforeEach(() => {
    testHome = mkdtempSync(join(tmpdir(), "interf-install-test-"));
    mkdirSync(join(testHome, ".claude"));
  });

  afterEach(() => {
    rmSync(testHome, { recursive: true, force: true });
  });

  it("installs a skill to an agent", () => {
    const agents = createAgents(testHome);
    const result = installSkillToAgent("interf-scan", agents["claude-code"]);

    expect(result.success).toBe(true);
    expect(
      existsSync(join(testHome, ".claude", "skills", "interf-scan", "SKILL.md")),
    ).toBe(true);
  });

  it("installs all skills to all detected agents", () => {
    mkdirSync(join(testHome, ".cursor"));

    const agents = createAgents(testHome);
    const detected = detectAgents(agents);
    const results = installAllSkills(detected);

    // 3 skills × 2 agents = 6 installs
    expect(results).toHaveLength(6);
    expect(results.every((r) => r.success)).toBe(true);
  });

  it("returns error for nonexistent skill", () => {
    const agents = createAgents(testHome);
    const result = installSkillToAgent("nonexistent", agents["claude-code"]);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
