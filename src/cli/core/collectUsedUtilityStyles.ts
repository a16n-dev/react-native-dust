import fg from 'fast-glob';
import { parse } from '@babel/parser';
import { readFileSync } from 'fs';
import traverse from '@babel/traverse';
import type { ParsedConfig } from './config/configSchema.js';
import { logger } from '../logger/logger.js';
import { c } from '../logger/format.js';
import chalk from 'chalk';

async function getListOfSourceFiles(includePaths: string[]) {
  const paths = await fg(includePaths);

  if (paths.length === 0) {
    logger.error(
      c.red(
        'No source files found. Please check the "include" patterns in your dust.config file.'
      )
    );
    logger.error(
      c.grey(
        'Dust searched the following paths: "' + includePaths.join(', ') + '"'
      )
    );
    process.exit(1);
  }

  return paths;
}

function analyzeFile(filePath: string): string[] {
  const code = readFileSync(filePath, 'utf-8');

  // Fast string check for import first
  if (!code.includes('react-native-dust')) {
    logger.debug(c.grey(filePath));
    return [];
  }

  let hasThemeImport = false;
  const accessedProperties = new Set<string>();

  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });

    traverse.default(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react-native-dust') {
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

  const arr = Array.from(accessedProperties);

  logger.debug(filePath + c.green(` ${arr.length} tokens`));

  return arr;
}

export async function collectUsedUtilityStyles(
  config: ParsedConfig
): Promise<string[]> {
  const files = await getListOfSourceFiles(config.include);

  logger.debug(
    chalk.bold(`Scanning ${files.length} files to collect used tokens:`)
  );

  const allAccessedProperties = new Set<string>();

  for (const file of files) {
    const properties = analyzeFile(file);
    if (properties.length > 0) {
      properties.forEach((prop) => allAccessedProperties.add(prop));
    }
  }

  const result = Array.from(allAccessedProperties);

  logger.debug(`Found the following ${result.length} used tokens:`);
  logger.debug(c.purple(result.join(', ')));

  return result;
}
