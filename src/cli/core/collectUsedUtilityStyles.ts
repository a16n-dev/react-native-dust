import fg from 'fast-glob';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { readFileSync } from 'fs';
import { ParsedConfig } from './loadConfig';

async function getListOfSourceFiles(includePaths: string[]) {
  const paths = await fg(includePaths);

  if (paths.length === 0) {
    console.error(
      'No source files found. Please check the "include" patterns in your dust.config file.'
    );
    process.exit(1);
  }

  return paths;
}

function analyzeFile(filePath: string): string[] {
  const code = readFileSync(filePath, 'utf-8');

  // Fast string check for import first
  if (!code.includes('react-native-dust/tokens')) {
    return [];
  }

  let hasThemeImport = false;
  const accessedProperties = new Set<string>();

  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });

    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react-native-dust/tokens') {
          const tImport = path.node.specifiers.find(
            (spec) =>
              spec.type === 'ImportSpecifier' &&
              spec.imported.type === 'Identifier' &&
              spec.imported.name === 't'
          );
          if (tImport) {
            hasThemeImport = true;
          }
        }
      },

      MemberExpression(path) {
        if (
          hasThemeImport &&
          path.node.object.type === 'Identifier' &&
          path.node.object.name === 't'
        ) {
          if (path.node.property.type === 'Identifier') {
            accessedProperties.add(path.node.property.name);
          }
        }
      },
    });
  } catch (error) {
    console.warn(`Could not parse ${filePath}:`, error);
  }

  return Array.from(accessedProperties);
}

export async function collectUsedUtilityStyles(
  config: ParsedConfig
): Promise<string[]> {
  const files = await getListOfSourceFiles(config.include);

  const allAccessedProperties = new Set<string>();

  for (const file of files) {
    const properties = analyzeFile(file);
    if (properties.length > 0) {
      properties.forEach((prop) => allAccessedProperties.add(prop));
    }
  }

  return Array.from(allAccessedProperties);
}
