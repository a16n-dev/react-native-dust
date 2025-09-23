import { GeneratedProject } from './generatedProject.js';
import type { codegenOptions } from '../core/codegenTypes.js';

/**
 * Adds a barrel file to the given generated project. This should reexport all the
 * required modules for the package.
 */
export function generateBarrelFile(
  project: GeneratedProject,
  opts: codegenOptions
) {
  const file = project.addSourceFile('index.ts');

  // Add exports
  file.addExportDeclaration({ moduleSpecifier: './theme' });
  file.addExportDeclaration({ moduleSpecifier: './tokens' });
  if (opts.config.options.generatePlatformHelpers) {
    file.addExportDeclaration({ moduleSpecifier: './utilities' });
  }
}
