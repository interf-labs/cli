import chalk from "chalk";
import { isAuthenticated, saveCredentials } from "../lib/auth.js";
import type { CommandModule } from "yargs";

export const loginCommand: CommandModule = {
  command: "login",
  describe: "Authenticate with interf.com",
  handler: async () => {
    if (isAuthenticated()) {
      console.log(chalk.dim("  Already authenticated."));
      return;
    }

    console.log();
    console.log(chalk.yellow("  Authentication is coming soon."));
    console.log(
      chalk.dim("  Login will be required for publish and cloud simulations."),
    );
    console.log();
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
