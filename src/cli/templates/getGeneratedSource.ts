import { Project, SourceFile, ts } from 'ts-morph';
import ModuleKind = ts.ModuleKind;
import ScriptTarget = ts.ScriptTarget;

export interface generatedFile {
  name: string;
  content: string;
}

/**
 * Creates a new in-memory TS file with some preconfigured compiler options.
 */
export function createSourceFile(fileName: string): SourceFile {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      declaration: true,
      module: ModuleKind.ESNext,
      target: ScriptTarget.ES2020,
    },
  });
  return project.createSourceFile(fileName, '', { overwrite: true });
}

/**
 * Takes a generated TS file, and returns the emitted .js & .d.ts files
 */
export function getGeneratedSource(file: SourceFile): generatedFile[] {
  const output = file.getEmitOutput({
    emitOnlyDtsFiles: false,
  });

  return output.getOutputFiles().map((file) => ({
    name: file.getFilePath(),
    content: file.getText(),
  }));
}
