#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { defaultCommand } from "./commands/default.js";
import { createCommand } from "./commands/create.js";
import { previewCommand } from "./commands/preview.js";
import { installSkillCommand } from "./commands/install-skill.js";
import { validateCommand } from "./commands/validate.js";
import { loginCommand } from "./commands/login.js";
import { logoutCommand } from "./commands/logout.js";
import { publishCommand } from "./commands/publish.js";
import { simulateCommand } from "./commands/simulate.js";

yargs(hideBin(process.argv))
  .scriptName("interf")
  .command(defaultCommand)
  .command(createCommand)
  .command(previewCommand)
  .command(validateCommand)
  .command(installSkillCommand)
  .command(loginCommand)
  .command(logoutCommand)
  .command(publishCommand)
  .command(simulateCommand)
  .strict()
  .help()
  .version()
  .parse();
