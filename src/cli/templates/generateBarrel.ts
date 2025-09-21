import { Project } from "ts-morph";

export interface GeneratedFiles {
  js: string;
  dts: string;
}

export function generateBarrel(): GeneratedFiles {
  const project = new Project({ useInMemoryFileSystem: true });
  const jsFile = project.createSourceFile("index.js", "");
  const dtsFile = project.createSourceFile("index.d.ts", "");

  // Add exports to both files
  [jsFile, dtsFile].forEach((file) => {
    file.addExportDeclaration({ moduleSpecifier: "./theme" });
    file.addExportDeclaration({ moduleSpecifier: "./tokens" });
  });

  return {
    js: jsFile.getFullText(),
    dts: dtsFile.getFullText(),
  };
}