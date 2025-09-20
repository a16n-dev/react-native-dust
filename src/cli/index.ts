#!/usr/bin/env node

import { Command } from "commander";
import { generate } from "./generate/generate";
import { init } from "./init";
import { analyse } from "./analyse/analyse";

const program = new Command();

program.name("dust").description("Dust CLI - Ready to quack!").version("1.0.0");

program
  .command("init")
  .description("Create a basic dust.config.js file")
  .action(async () => {
    init();

    await generate();
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
    await analyse(options.config);
  });

program.parse();
