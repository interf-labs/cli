import chalk from "chalk";
import { detectAgents, installAllSkills } from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const defaultCommand: CommandModule = {
  command: "$0",
  describe: "Install Agent Onboarding Protocol skills to your coding agents",
  builder: (yargs) => yargs.option("agent", { type: "array", string: true, describe: "Target specific agents" }),
  handler: async (argv) => {
    console.log();
    console.log(chalk.bold("  Interf") + " — Agent Onboarding Protocol");
    console.log();
    const agents = detectAgents(undefined, argv.agent as string[] | undefined);
    if (agents.length === 0) {
      console.log(chalk.yellow("  No coding agents detected."));
      console.log(chalk.dim("  Supported: Claude Code, Codex, Cursor, Goose"));
      console.log();
      return;
    }
    const results = installAllSkills(agents);
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);
    for (const r of successful) console.log(chalk.green("  ✓") + ` ${r.skill} → ${chalk.dim(r.agent)}`);
    for (const r of failed) console.log(chalk.red("  ✗") + ` ${r.skill} → ${r.agent}: ${chalk.dim(r.error)}`);
    console.log();
    console.log(chalk.dim(`  ${successful.length} skill(s) installed to ${agents.map((a) => a.displayName).join(", ")}`));
    console.log();
    console.log("  Tell your coding agent:");
    console.log(chalk.bold("  declare an onboarding contract and preview rollout for <company>"));
    console.log();
    console.log(chalk.dim("  interf declare      Install declare + protocol skills"));
    console.log(chalk.dim("  interf validate     Validate interf.yaml"));
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
