import chalk from "chalk";
import { isAuthenticated } from "../lib/auth.js";
import type { CommandModule } from "yargs";

export const loginCommand: CommandModule = {
  command: "login",
  describe: false as unknown as string,
  handler: async () => {
    if (isAuthenticated()) {
      console.log(chalk.dim("  Already authenticated."));
      return;
    }
    console.log();
    console.log(chalk.yellow("  Authentication is coming soon."));
    console.log(chalk.dim("  Login will be required to publish contracts and run cloud simulations."));
    console.log();
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
