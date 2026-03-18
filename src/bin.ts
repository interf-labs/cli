#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { defaultCommand } from "./commands/default.js";
import { installSkillCommand } from "./commands/install-skill.js";
import { validateCommand } from "./commands/validate.js";
import { publishCommand } from "./commands/publish.js";
import { previewCommand } from "./commands/preview.js";

yargs(hideBin(process.argv))
  .scriptName("interf")
  .command(defaultCommand)
  .command(validateCommand)
  .command(installSkillCommand)
  .command(publishCommand)
  .command(previewCommand)
  .strict()
  .help()
  .version()
  .parse();
