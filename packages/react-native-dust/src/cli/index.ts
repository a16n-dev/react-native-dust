#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { buildCommand } from './commands/build.js';
import { exportCommand } from './commands/export.js';
import { debug } from './logger/logger.js';

const program = new Command();

program.name('dust').description('Dust CLI').version('1.0.0');

program
  .command('init')
  .description('Create a basic dust.config.js file')
  .action(async () => {
    await initCommand();
  });

program
  .command('generate')
  .description('Generate files based on configuration')
  .option('-c, --config <file>', 'Specify config file (.js/.json/.ts)')
  .option('-d, --debug', 'Enable debug logging')
  .action(async (options) => {
    if (options.debug) debug.setEnabled(true);

    await generateCommand(options.config);
  });

program
  .command('build')
  .description(
    'Generate a production stylesheet that includes only styles that are used in the project'
  )
  .option('-c, --config <file>', 'Specify config file (.js/.json/.ts)')
  .option('-d, --debug', 'Enable debug logging')
  .action(async (options) => {
    if (options.debug) debug.setEnabled(true);

    await buildCommand(options.config);
  });

program
  .command('export')
  .description(
    'Generates code as TS source files into the project instead of a compiled lib'
  )
  .option('-c, --config <file>', 'Specify config file (.js/.json/.ts)')
  .action(async (options) => {
    await exportCommand(options.config);
  });

program.parse();
