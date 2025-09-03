#!/usr/bin/env node

import { Command } from "commander";
import { setDebugMode } from "./debug";
import { generate } from "./generate/generate";

const program = new Command();

program.name("duck").description("Duck CLI - Ready to quack!").version("1.0.0");

program
  .command("generate")
  .description("Generate files based on configuration")
  .option("-c, --config <file>", "Specify config file (.js/.json/.ts)")
  .option("-d, --debug", "Enable debug logging")
  .action(async (options) => {
    if (options.debug) {
      setDebugMode(true);
    }
    await generate(options.config);
  });

program.parse();
