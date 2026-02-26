import chalk from "chalk";
import {
  listBundledSkills,
  detectAgents,
  installAllSkills,
  isSkillInstalled,
} from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const defaultCommand: CommandModule = {
  command: "$0",
  describe: "Install Interf skills and show status",
  builder: (yargs) =>
    yargs.option("agent", {
      type: "array",
      string: true,
      describe: "Target specific agents (claude-code, codex, cursor, goose)",
    }),
  handler: async (argv) => {
    console.log();
    console.log(chalk.bold("  Interf") + " — Agent Readiness Protocol");
    console.log();

    const agents = detectAgents(undefined, argv.agent as string[] | undefined);

    if (agents.length === 0) {
      console.log(
        chalk.yellow("  No coding agents detected."),
      );
      console.log(
        chalk.dim("  Supported: Claude Code, Codex, Cursor, Goose"),
      );
      console.log();
      return;
    }

    // Install skills to all detected agents
    const results = installAllSkills(agents);
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    if (successful.length > 0) {
      for (const r of successful) {
        console.log(
          chalk.green("  ✓") + ` ${r.skill} → ${chalk.dim(r.agent)}`,
        );
      }
    }

    if (failed.length > 0) {
      for (const r of failed) {
        console.log(
          chalk.red("  ✗") + ` ${r.skill} → ${r.agent}: ${chalk.dim(r.error)}`,
        );
      }
    }

    console.log();
    console.log(
      chalk.dim(
        `  ${successful.length} skill(s) installed to ${agents.map((a) => a.displayName).join(", ")}`,
      ),
    );

    console.log();
    console.log(chalk.bold("  Skills:"));
    console.log(
      "  interf-scan         Scan codebase and extract interf.yaml",
    );
    console.log(
      "  interf-simulate     Run Flight Simulation for enterprise profiles",
    );
    console.log(
      "  interf-protocol     Agent Readiness Protocol reference",
    );
    console.log();
    console.log(chalk.bold("  Commands:"));
    console.log("  interf validate         Validate interf.yaml");
    console.log("  interf install-skill    Reinstall skills");
    console.log("  interf login            Authenticate (coming soon)");
    console.log("  interf publish          Publish manifest (coming soon)");
    console.log("  interf simulate         Cloud simulation (coming soon)");
    console.log();
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
