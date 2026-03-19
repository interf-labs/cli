import { existsSync, readFileSync } from "node:fs";
import chalk from "chalk";
import YAML from "yaml";
import { validateManifest } from "../lib/schema.js";
import type { CommandModule } from "yargs";

export const validateCommand: CommandModule = {
  command: "validate",
  describe: "Validate interf.yaml against the protocol schema",
  builder: (yargs) =>
    yargs.option("file", {
      alias: "f",
      type: "string",
      default: "interf.yaml",
      describe: "Path to readiness contract file",
    }),
  handler: async (argv) => {
    const file = argv.file as string;
    if (!existsSync(file)) { console.error(chalk.red(`  ✗ File not found: ${file}`)); process.exit(1); }
    let parsed: unknown;
    try { parsed = YAML.parse(readFileSync(file, "utf-8")); }
    catch (e) { console.error(chalk.red(`  ✗ Invalid YAML: ${(e as Error).message}`)); process.exit(1); }
    const result = validateManifest(parsed);
    if (result.success) {
      const m = result.data;
      console.log();
      console.log(chalk.green("  ✓ Valid readiness contract"));
      console.log();
      console.log(`  Name:          ${m.name}`);
      console.log(`  Version:       ${m.version}`);
      console.log(`  Requirements:  ${m.requirements.length}`);
      if (m.optional) console.log(`  Optional:      ${m.optional.length}`);
      console.log();
    } else {
      console.error();
      console.error(chalk.red("  ✗ Validation failed"));
      console.error();
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        console.error(chalk.dim(`  ${path}:`) + ` ${issue.message}`);
      }
      console.error();
      process.exit(1);
    }
  },
};
