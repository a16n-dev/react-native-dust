import { Project, SourceFile, ts } from 'ts-morph';
import ModuleKind = ts.ModuleKind;
import ScriptTarget = ts.ScriptTarget;
import ModuleResolutionKind = ts.ModuleResolutionKind;
import { getProjectRoot } from '../core/fileSystemHelpers';

const ROOT_DIR = getProjectRoot();

/**
 * This defines the compiler options for generating code at runtime. As a general
 * rule of thumb, this should match up to what is defined in tsconfig.json
 */
const COMPILER_OPTIONS: ts.CompilerOptions = {
  declaration: true,
  module: ModuleKind.ESNext,
  target: ScriptTarget.ES2022,
  moduleResolution: ModuleResolutionKind.Node10,
  skipLibCheck: true,
};

export interface GeneratedFile {
  name: string;
  content: string;
}

export class GeneratedProject {
  private project: Project;

  constructor() {
    this.project = new Project({
      // useInMemoryFileSystem: true,
      compilerOptions: COMPILER_OPTIONS,
    });
  }

  /**
   * Adds a new TS file to the project, and returns a reference to the file
   */
  addSourceFile(fileName: string): SourceFile {
    return this.project.createSourceFile(fileName, '', {
      overwrite: true,
    });
  }

  /**
   * Runs diagnostics on the project. If there are any errors in the project,
   * this function will return a string representing the errors
   */
  typeCheck() {
    const diagnostics = this.project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      return this.project.formatDiagnosticsWithColorAndContext(diagnostics);
    }

    return;
  }

  /**
   * Gets all generated files for the entire project
   */
  getGeneratedFiles(): GeneratedFile[] {
    const result = this.project.emitToMemory();
    const files = result.getFiles();

    return files.map((file) => ({
      name: file.filePath.replace(ROOT_DIR, '.'),
      content: file.text,
    }));
  }

  /**
   * Gets all of the source (.ts) files for the entire project.
   */
  getSourceFiles(): GeneratedFile[] {
    // filenames should be relative to the project root
    return this.project.getSourceFiles().map((file) => ({
      name: file.getFilePath().replace(ROOT_DIR, '.'),
      content: file.getFullText(),
    }));
  }
}
