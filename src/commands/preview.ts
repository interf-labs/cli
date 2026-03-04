import chalk from "chalk";
import {
  detectAgents,
  installSkillToAgent,
} from "../lib/skills.js";
import type { CommandModule } from "yargs";

export const previewCommand: CommandModule = {
  command: "preview",
  describe: "Preview enterprise rollout for a target company",
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
      const previewResult = installSkillToAgent("interf-preview", agent);
      const protocolResult = installSkillToAgent("interf-protocol", agent);
      if (previewResult.success) {
        console.log(chalk.green("  ✓") + ` interf-preview → ${chalk.dim(agent.displayName)}`);
      }
      if (protocolResult.success) {
        console.log(chalk.green("  ✓") + ` interf-protocol → ${chalk.dim(agent.displayName)}`);
      }
    }

    console.log();
    console.log("  Ready. Load the " + chalk.bold("interf-preview") + " skill to preview enterprise");
    console.log("  rollout against any company profile (e.g. BlackRock, Goldman Sachs).");
    console.log();
    console.log(chalk.dim("  Requires interf.yaml — run: npx interf create"));
    console.log();
  },
};
