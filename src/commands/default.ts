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
  describe: "Create onboarding contracts and preview enterprise rollouts",
  builder: (yargs) =>
    yargs.option("agent", {
      type: "array",
      string: true,
      describe: "Target specific agents (claude-code, codex, cursor, goose)",
    }),
  handler: async (argv) => {
    console.log();
    console.log(chalk.bold("  Interf") + " — Agent Onboarding Protocol");
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
    console.log(chalk.bold("  Agent skills installed (not CLI commands — use via your coding agent):"));
    console.log(
      "  interf-scan         Scan codebase and create onboarding contract (interf.yaml)",
    );
    console.log(
      "  interf-preview      Preview enterprise rollout for a target company",
    );
    console.log(
      "  interf-protocol     Agent Onboarding Protocol reference",
    );
    console.log();
    console.log(
      "  Your coding agent can now use these skills to create the onboarding",
    );
    console.log(
      "  contract and preview rollout. They are not CLI commands.",
    );
    console.log();
    console.log(chalk.dim("  interf validate     Validate interf.yaml"));
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
