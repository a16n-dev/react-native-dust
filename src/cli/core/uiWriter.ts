import { writeFile, mkdir, readFile } from 'fs/promises';
import { resolve } from 'path';
import prettier from 'prettier';
import { GeneratedFile } from '../templates/getGeneratedSource';
import { existsSync } from 'fs';
import { CLI_DIR_ROOT } from '../root';

/**
 * This initialises the directory that all generated code files will be written to
 */
async function setupLibDir() {
  const dir = resolve(CLI_DIR_ROOT, '..', 'lib');

  await mkdir(dir, { recursive: true });

  return dir;
}

export async function writeGeneratedLibFiles(files: GeneratedFile[]) {
  for (const file of files) {
    const shouldMinify = file.name.endsWith('.js');
    await writeLibFile(file.name, file.content, shouldMinify);
  }
}

export async function writeLibFile(
  filename: string,
  content: string,
  minify?: boolean
): Promise<void> {
  const libDir = await setupLibDir();
  const filePath = resolve(libDir, filename);

  const finalContent = await prettier.format(content, {
    filepath: filePath,
    parser: getParserForFile(filename),
  });

  await writeFile(filePath, finalContent);

  console.log(`Wrote lib file "${filename}" to ${filePath}`);
}

function getParserForFile(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'babel';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    default:
      return 'babel';
  }
}

/**
 * This initialises the directory that exported files will be written to (user's project root)
 */
async function setupExportDir() {
  const dir = resolve(process.cwd(), 'export');

  console.log(dir);
  await mkdir(dir, { recursive: true });

  return dir;
}

export async function writeGeneratedExportFiles(files: GeneratedFile[]) {
  for (const file of files) {
    await writeExportFile(file.name, file.content);
  }
}

export async function writeExportFile(
  filename: string,
  content: string
): Promise<void> {
  const exportDir = await setupExportDir();
  const filePath = resolve(exportDir, filename);

  const finalContent = await prettier.format(content, {
    filepath: filePath,
    parser: getParserForFile(filename),
  });

  await writeFile(filePath, finalContent);

  console.log(`Wrote export file "${filename}" to ${filePath}`);
}

// Find the root package.json for the project this CLI is being run in
export function getProjectRoot() {
  let currentDir = process.cwd();

  while (true) {
    const packageJsonPath = resolve(currentDir, 'package.json');
    if (existsSync(packageJsonPath)) {
      return currentDir;
    }
  }
}
