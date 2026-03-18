import chalk from "chalk";
import type { CommandModule } from "yargs";

export const previewCommand: CommandModule = {
  command: "preview",
  describe: false as unknown as string,
  handler: async () => {
    console.log();
    console.log(chalk.yellow("  Cloud-powered simulations are coming soon."));
    console.log();
    console.log(chalk.dim("  For now, use the interf-preview skill with your coding agent."));
    console.log(chalk.dim("  Run `npx interf` to install skills, then tell your agent:"));
    console.log(chalk.dim("  preview rollout for <company>"));
    console.log();
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
