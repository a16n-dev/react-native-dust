import { ModuleKind, Project, ScriptTarget } from "ts-morph";
import { generatedSource } from "./getGeneratedSource";

/**
 * This file template generates a barrel file of all exports to be exported
 * under the main package entry point.
 */
export function generateBarrelFile(): generatedSource {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ScriptTarget.ES2019,
      module: ModuleKind.CommonJS,
      declaration: true,
    },
  });
  const file = project.createSourceFile("index.ts", "");

  // Add exports to both files

  file.addExportDeclaration({ moduleSpecifier: "./theme" });
  file.addExportDeclaration({ moduleSpecifier: "./tokens" });

  // get the .js and .d.ts files

  return {
    js:
  }

  // return {
  //   js: jsFile.getFullText(),
  //   dts: dtsFile.getFullText(),
  // };
}
