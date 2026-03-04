import chalk from "chalk";
import {
  detectAgents,
  installSkillToAgent,
} from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const createCommand: CommandModule = {
  command: "create",
  describe: "Create an onboarding contract by scanning your codebase",
  builder: (yargs) =>
    yargs.option("agent", {
      type: "array",
      string: true,
      describe: "Target specific agents (claude-code, codex, cursor, goose)",
    }),
  handler: async (argv) => {
    const agents = detectAgents(undefined, argv.agent as string[] | undefined);

    if (agents.length === 0) {
      console.log(chalk.yellow("  No coding agents detected."));
      console.log(chalk.dim("  Supported: Claude Code, Codex, Cursor, Goose"));
      return;
    }

    for (const agent of agents) {
      const scanResult = installSkillToAgent("interf-scan", agent);
      const protocolResult = installSkillToAgent("interf-protocol", agent);
      if (scanResult.success) {
        console.log(chalk.green("  ✓") + ` interf-scan → ${chalk.dim(agent.displayName)}`);
      }
      if (protocolResult.success) {
        console.log(chalk.green("  ✓") + ` interf-protocol → ${chalk.dim(agent.displayName)}`);
      }
    }

    console.log();
    console.log("  Ready. Your coding agent can now scan this codebase and");
    console.log("  create an interf.yaml onboarding contract.");
    console.log();
    console.log(chalk.dim("  After creating the contract, run: interf preview"));
    console.log();
  },
};
