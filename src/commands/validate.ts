import { existsSync, readFileSync } from "node:fs";
import chalk from "chalk";
import YAML from "yaml";
import { validateManifest } from "../lib/schema.js";
import { isValidCanonical, isValidCategory, suggestCanonical, CANONICAL_TYPES } from "../lib/canonical.js";
import type { CommandModule } from "yargs";
import type { Requirement } from "../lib/schema.js";

export const validateCommand: CommandModule = {
  command: "validate",
  describe: "Validate interf.yaml against the schema and canonical types",
  builder: (yargs) =>
    yargs.option("file", {
      alias: "f",
      type: "string",
      default: "interf.yaml",
      describe: "Path to readiness contract file",
    }),
  handler: async (argv) => {
    const file = argv.file as string;

    if (!existsSync(file)) {
      console.error(chalk.red(`  ✗ File not found: ${file}`));
      process.exit(1);
    }

    let parsed: unknown;
    try {
      parsed = YAML.parse(readFileSync(file, "utf-8"));
    } catch (e) {
      console.error(chalk.red(`  ✗ Invalid YAML: ${(e as Error).message}`));
      process.exit(1);
    }

    const result = validateManifest(parsed);

    if (!result.success) {
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

    const m = result.data;
    const allReqs = [...m.requirements, ...(m.optional || [])];

    // Check canonical types
    let mapped = 0;
    let unmapped = 0;
    const warnings: string[] = [];

    for (const req of allReqs) {
      if (req.canonical) {
        if (isValidCanonical(req.canonical)) {
          mapped++;
        } else if (isValidCategory(req.canonical)) {
          const suggestion = suggestCanonical(req.canonical);
          if (suggestion) {
            warnings.push(`  "${req.canonical}" → did you mean "${suggestion}"?`);
          } else {
            warnings.push(`  "${req.canonical}" — unknown canonical type (valid category, unknown type)`);
          }
          mapped++;
        } else {
          const suggestion = suggestCanonical(req.canonical);
          if (suggestion) {
            warnings.push(`  "${req.canonical}" → did you mean "${suggestion}"?`);
          } else {
            warnings.push(`  "${req.canonical}" — unknown canonical type`);
          }
        }
      } else {
        unmapped++;
      }
    }

    console.log();
    console.log(chalk.green("  ✓ Valid readiness contract"));
    console.log();
    console.log(`  Name:          ${m.name}`);
    console.log(`  Version:       ${m.version}`);
    console.log(`  Requirements:  ${m.requirements.length}`);
    if (m.optional) console.log(`  Optional:      ${m.optional.length}`);
    console.log(`  Canonical:     ${mapped} mapped, ${unmapped} unmapped`);
    console.log(chalk.dim(`  Types known:   ${CANONICAL_TYPES.length} (interf@${process.env.npm_package_version || require("../../package.json").version})`));

    if (warnings.length > 0) {
      console.log();
      console.log(chalk.yellow("  Canonical type warnings:"));
      for (const w of warnings) {
        console.log(chalk.yellow(w));
      }
      console.log();
      console.log(chalk.dim("  Unknown types may be valid — update CLI for latest: npm install -g interf@latest"));
    }

    console.log();
  },
};
