import chalk from "chalk";
import { detectAgents, installSkillToAgent } from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const declareCommand: CommandModule = {
  command: "declare",
  describe: "Declare an onboarding contract by scanning your codebase",
  builder: (yargs) => yargs.option("agent", { type: "array", string: true, describe: "Target specific agents" }),
  handler: async (argv) => {
    const agents = detectAgents(undefined, argv.agent as string[] | undefined);
    if (agents.length === 0) {
      console.log(chalk.yellow("  No coding agents detected."));
      console.log(chalk.dim("  Supported: Claude Code, Codex, Cursor, Goose"));
      return;
    }
    for (const agent of agents) {
      const d = installSkillToAgent("declare", agent);
      const p = installSkillToAgent("protocol", agent);
      if (d.success) console.log(chalk.green("  ✓") + ` declare → ${chalk.dim(agent.displayName)}`);
      if (p.success) console.log(chalk.green("  ✓") + ` protocol → ${chalk.dim(agent.displayName)}`);
    }
    console.log();
    console.log("  Skills installed. Tell your coding agent:");
    console.log(chalk.bold("  declare an onboarding contract for this project"));
    console.log();
  },
};
