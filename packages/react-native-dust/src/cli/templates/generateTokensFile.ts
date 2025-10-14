import { GeneratedProject } from './generatedProject.js';
import { defaultTokens } from '../core/utilityClassTokens/defaultTokens.js';
import { getThemeTokens } from '../core/utilityClassTokens/getThemeTokens.js';
import { safeAreaTokens } from '../core/utilityClassTokens/defaultUnistylesRuntimeTokens.js';
import { defaultWebTokens } from '../core/utilityClassTokens/defaultWebTokens.js';
import { VariableDeclarationKind } from 'ts-morph';
import type { codegenOptions } from '../core/codegenTypes.js';
import { logger } from '../logger/logger.js';
import { c } from '../logger/format.js';

export function generateTokensFile(
  project: GeneratedProject,
  { whitelist, config }: codegenOptions
) {
  const file = project.addSourceFile('tokens.ts');

  const tokens = [...defaultTokens];

  tokens.push(...getThemeTokens(config.theme));
  if (
    config.options.mode === 'unistyles' ||
    config.options.mode === 'style-kit'
  ) {
    tokens.push(...safeAreaTokens);
  }
  if (config.options.targetsWeb) {
    tokens.push(...defaultWebTokens);
  }

  const allTokens = !whitelist
    ? tokens
    : tokens.filter((token) => whitelist.includes(token.key));

  logger.info(c.purple.bold(allTokens.length) + ` tokens generated`);

  const styleObjectEntries = allTokens.map((token) => {
    const properties = token.values
      .map(([property, value]) => `${property}: ${value}`)
      .join(', ');
    return `${token.key}: { ${properties} }`;
  });

  const styleObjectTypeEntries = `{ ${allTokens.map((token) => `${token.key}: any`).join(';')} }`;

  if (config.options.mode === 'vanilla') {
    file.addImportDeclaration({
      moduleSpecifier: 'react-native',
      namedImports: ['StyleSheet'],
    });
    file.addImportDeclaration({
      moduleSpecifier: './theme',
      namedImports: ['theme'],
    });

    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 't',
          initializer: `StyleSheet.create({\n  ${styleObjectEntries.join(',\n  ')}\n})`,
        },
      ],
    });
  } else if (config.options.mode === 'unistyles') {
    file.addImportDeclaration({
      moduleSpecifier: 'react-native-unistyles',
      namedImports: ['StyleSheet'],
    });

    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 't',
          initializer: `StyleSheet.create((theme, runtime) => ({\n  ${styleObjectEntries.join(',\n  ')}\n}))`,
        },
      ],
    });
  } else if (config.options.mode === 'style-kit') {
    file.addImportDeclaration({
      moduleSpecifier: 'react-native-style-kit',
      namedImports: ['makeUseStyles'],
    });

    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'useTokens',
          initializer: `makeUseStyles()((theme, runtime) => ({\n  ${styleObjectEntries.join(',\n  ')}\n}))`,
        },
      ],
    });
  }
}
