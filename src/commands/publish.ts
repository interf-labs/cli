import chalk from "chalk";
import type { CommandModule } from "yargs";

export const publishCommand: CommandModule = {
  command: "publish",
  describe: "Publish interf.yaml to the Interf registry",
  handler: async () => {
    console.log();
    console.log(chalk.yellow("  Publish is coming soon."));
    console.log(
      chalk.dim(
        "  This will publish your interf.yaml onboarding contract to the Interf registry,",
      ),
    );
    console.log(
      chalk.dim(
        "  making it available for enterprise onboarding workflows.",
      ),
    );
    console.log();
    console.log(chalk.dim("  https://interf.com"));
    console.log();
  },
};
