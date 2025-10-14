import { generateThemeFile } from '../templates/generateThemeFile.js';
import type { codegenOptions } from './codegenTypes.js';
import { GeneratedProject } from '../templates/generatedProject.js';
import { generateTokensFile } from '../templates/generateTokensFile.js';
import { generateUtilitiesFile } from '../templates/generateUtilitiesFile.js';
import { generateBarrelFile } from '../templates/generateBarrelFile.js';
import type { ParsedConfig } from './config/configSchema.js';
import { writeGeneratedLibFiles } from './fileSystemHelpers.js';
import { logger } from '../logger/logger.js';
import { c } from '../logger/format.js';

export async function constructCodegenProject(opts: codegenOptions) {
  const project = new GeneratedProject();

  // Add project
  generateThemeFile(project, opts);
  generateTokensFile(project, opts);
  if (opts.config.options.generatePlatformHelpers) {
    generateUtilitiesFile(project, opts);
  }
  generateBarrelFile(project, opts);

  return project;
}

export async function runCodegen(
  config: ParsedConfig,
  whitelist?: string[]
): Promise<void> {
  const project = await constructCodegenProject({ config, whitelist });

  const outputFiles = project.getGeneratedFiles();

  const errors = project.typeCheck();
  if (errors) {
    // TODO: If this error is hit, it indicates a bug in the codegen rather than user error
    // We should probably get the user to file a bug report, or maybe get this to fire off
    // a network request somewhere to log the error automatically
    logger.error(
      c.red('Error: Failed to generate dynamic code due to type errors')
    );
    logger.error(errors);
    logger.error(
      'The above error is likely due to a bug in the library rather than your code or configuration. Please report the issue here: https://github.com/a16n-dev/react-native-dust/issues'
    );
  }

  await writeGeneratedLibFiles(outputFiles);
}
