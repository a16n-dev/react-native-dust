#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init";
import { build } from "./commands/build";
import { generate } from "./commands/generate";

const program = new Command();

program.name("dust").description("Dust CLI - Ready to quack!").version("1.0.0");

program
  .command("init")
  .description("Create a basic dust.config.js file")
  .action(async () => {
    init();
  });

program
  .command("generate")
  .description("Generate files based on configuration")
  .option("-c, --config <file>", "Specify config file (.js/.json/.ts)")
  .option("-d, --debug", "Enable debug logging")
  .action(async (options) => {
    await generate(options.config);
  });

program
  .command("build")
  .description(
    "Generate a production stylesheet that includes only styles that are used in the project",
  )
  .option("-c, --config <file>", "Specify config file (.js/.json/.ts)")
  .option("-d, --debug", "Enable debug logging")
  .action(async (options) => {
    await build(options.config);
  });

program.parse();
