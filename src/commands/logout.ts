import chalk from "chalk";
import { clearCredentials, isAuthenticated } from "../lib/auth.js";
import type { CommandModule } from "yargs";

export const logoutCommand: CommandModule = {
  command: "logout",
  describe: "Clear stored credentials",
  handler: async () => {
    if (!isAuthenticated()) {
      console.log(chalk.dim("  Not logged in."));
      return;
    }

    clearCredentials();
    console.log(chalk.green("  ✓") + " Logged out.");
  },
};
