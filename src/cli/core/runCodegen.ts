import { generateThemeFile } from '../templates/generateThemeFile.js';
import type { codegenOptions } from './codegenTypes.js';
import { GeneratedProject } from '../templates/generatedProject.js';
import { generateTokensFile } from '../templates/generateTokensFile.js';
import { generateUtilitiesFile } from '../templates/generateUtilitiesFile.js';
import { generateBarrelFile } from '../templates/generateBarrelFile.js';
import type { ParsedConfig } from './config/configSchema.js';
import { writeGeneratedLibFiles } from './fileSystemHelpers.js';

export async function constructCodegenProject(opts: codegenOptions) {
  const project = new GeneratedProject();

  // Add project
  generateThemeFile(project, opts);
  generateTokensFile(project, opts);
  generateUtilitiesFile(project, opts);
  generateBarrelFile(project);

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
    console.error(errors);
    process.exit(1);
  }

  await writeGeneratedLibFiles(outputFiles);
}
