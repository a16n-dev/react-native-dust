import { GeneratedProject } from './getGeneratedSource';

/**
 * Adds a barrel file to the given generated project. This should reexport all the
 * required modules for the package.
 */
export function generateBarrelFile(project: GeneratedProject) {
  const file = project.addSourceFile('index.ts');

  // Add exports
  file.addExportDeclaration({ moduleSpecifier: './theme' });
  file.addExportDeclaration({ moduleSpecifier: './tokens' });
  file.addExportDeclaration({ moduleSpecifier: './utilities' });
}
