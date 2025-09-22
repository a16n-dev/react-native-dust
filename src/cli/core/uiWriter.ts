import { writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import prettier from 'prettier';
import { GeneratedFile } from '../templates/getGeneratedSource';
import { existsSync } from 'fs';

/**
 * This initialises the directory that all generated code files will be written to
 */
async function setupLibDir() {
  const packageRoot = findPackageRoot(__dirname);
  const dir = resolve(packageRoot, 'dist/lib');

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

  let finalContent: string;

  if (minify) {
    // For minified output, skip prettier formatting and minimize whitespace
    finalContent = minifyJS(content);
  } else {
    finalContent = await prettier.format(content, {
      filepath: filePath,
      parser: getParserForFile(filename),
    });
  }

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

function minifyJS(code: string): string {
  // TODO: Make this more robust or find a 3rd party library to do this
  return (
    code
      // Remove single-line comments but preserve line breaks for multi-line context
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove extra whitespace but preserve necessary spaces
      .replace(/\s+/g, ' ')
      // Clean up specific patterns
      .replace(/;\s+/g, ';')
      .replace(/{\s+/g, '{')
      .replace(/\s+}/g, '}')
      .replace(/,\s+/g, ',')
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/\[\s+/g, '[')
      .replace(/\s+]/g, ']')
      // Remove leading/trailing whitespace
      .trim()
  );
}

function findPackageRoot(startDir: string): string {
  let currentDir = startDir;
  while (currentDir !== dirname(currentDir)) {
    if (existsSync(resolve(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }
  throw new Error('Could not find package.json');
}
