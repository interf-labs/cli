import chalk from "chalk";
import {
  listBundledSkills,
  detectAgents,
  installSkillToAgent,
  installAllSkills,
} from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const installSkillCommand: CommandModule = {
  command: "install-skill",
  describe: "Install Interf skills to your coding agent",
  builder: (yargs) =>
    yargs
      .option("agent", {
        type: "array",
        string: true,
        describe: "Target specific agents (claude-code, codex, cursor, goose)",
      })
      .option("skill", {
        type: "array",
        string: true,
        describe: "Install specific skill(s)",
      })
      .option("list", {
        alias: "l",
        type: "boolean",
        default: false,
        describe: "List available skills without installing",
      }),
  handler: async (argv) => {
    const skills = listBundledSkills();

    if (argv.list) {
      console.log();
      console.log(chalk.bold("  Available skills:"));
      console.log();
      for (const skill of skills) {
        console.log(`  ${skill.name}`);
      }
      console.log();

      const agents = detectAgents();
      if (agents.length > 0) {
        console.log(chalk.bold("  Detected agents:"));
        console.log();
        for (const agent of agents) {
          console.log(`  ${agent.displayName}`);
        }
        console.log();
      }
      return;
    }

    const agents = detectAgents(
      undefined,
      argv.agent as string[] | undefined,
    );

    if (agents.length === 0) {
      console.error(chalk.red("  No coding agents detected."));
      console.log(
        chalk.dim("  Supported: claude-code, codex, cursor, goose"),
      );
      process.exit(1);
    }

    const skillFilter = argv.skill as string[] | undefined;

    if (skillFilter) {
      // Install specific skills
      const results = [];
      for (const skillName of skillFilter) {
        for (const agent of agents) {
          results.push(installSkillToAgent(skillName, agent));
        }
      }

      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      for (const r of successful) {
        console.log(
          chalk.green("  ✓") + ` ${r.skill} → ${chalk.dim(r.agent)}`,
        );
      }
      for (const r of failed) {
        console.log(
          chalk.red("  ✗") + ` ${r.skill} → ${r.agent}: ${chalk.dim(r.error)}`,
        );
      }
    } else {
      // Install all skills
      const results = installAllSkills(agents);
      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      for (const r of successful) {
        console.log(
          chalk.green("  ✓") + ` ${r.skill} → ${chalk.dim(r.agent)}`,
        );
      }
      for (const r of failed) {
        console.log(
          chalk.red("  ✗") + ` ${r.skill} → ${r.agent}: ${chalk.dim(r.error)}`,
        );
      }
    }

    console.log();
    console.log(chalk.dim("  Skills installed. Your coding agent can now use them."));
    console.log();
  },
};
