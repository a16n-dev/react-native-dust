#!/usr/bin/env node

import { Command } from "commander";
import { generateCommand } from "./commands/generate";
import { buildCommand } from "./commands/build";
import { initCommand } from "./commands/init";

const program = new Command();

program.name("dust").description("Dust CLI").version("1.0.0");

program
  .command("init")
  .description("Create a basic dust.config.js file")
  .action(async () => {
    await initCommand();
  });

program
  .command("generate")
  .description("Generate files based on configuration")
  .option("-c, --config <file>", "Specify config file (.js/.json/.ts)")
  .option("-d, --debug", "Enable debug logging")
  .action(async (options) => {
    await generateCommand(options.config);
  });

program
  .command("build")
  .description(
    "Generate a production stylesheet that includes only styles that are used in the project",
  )
  .option("-c, --config <file>", "Specify config file (.js/.json/.ts)")
  .option("-d, --debug", "Enable debug logging")
  .action(async (options) => {
    await buildCommand(options.config);
  });

program.parse();
