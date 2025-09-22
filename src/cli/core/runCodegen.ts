import { writeGeneratedLibFiles } from './uiWriter';
import { generateVanillaThemeFile } from '../templates/generateVanillaThemeFile';
import { generateVanillaTokensFile } from '../templates/generateVanillaTokensFile';
import { GeneratedProject } from '../templates/getGeneratedSource';
import { generateBarrelFile } from '../templates/generateBarrelFile';
import { codegenOptions } from './codegenTypes';
import { ParsedConfig } from './loadConfig';

export function constructCodegenProject(opts: codegenOptions) {
  const project = new GeneratedProject();

  // Add project
  generateVanillaThemeFile(project, opts);
  generateVanillaTokensFile(project, opts);
  generateBarrelFile(project);

  return project;
}

export async function runCodegen(
  config: ParsedConfig,
  whitelist?: string[]
): Promise<void> {
  const project = constructCodegenProject({ config, whitelist });

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
