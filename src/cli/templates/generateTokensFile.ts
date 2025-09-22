import { defaultTokens } from '../core/utilityClassTokens/defaultTokens';
import { getThemeTokens } from '../core/utilityClassTokens/getThemeTokens';
import { GeneratedProject } from './getGeneratedSource';
import { constructThemes } from '../core/constructThemes';
import { codegenOptions } from '../core/codegenTypes';
import { VariableDeclarationKind } from 'ts-morph';
import { defaultUnistylesRuntimeTokens } from '../core/utilityClassTokens/defaultUnistylesRuntimeTokens';

export function generateTokensFile(
  project: GeneratedProject,
  { whitelist, config }: codegenOptions
) {
  const file = project.addSourceFile('tokens.ts');

  const tokens = [...defaultTokens];

  const allThemes = constructThemes(config.theme, config.additionalThemes);
  tokens.push(...getThemeTokens(allThemes));
  if (config.options.mode === 'unistyles') {
    tokens.push(...defaultUnistylesRuntimeTokens);
  }

  const allTokens = !whitelist
    ? tokens
    : tokens.filter((token) => whitelist.includes(token.key));

  const styleObjectEntries = allTokens.map((token) => {
    const properties = token.values
      .map(([property, value]) => `${property}: ${value}`)
      .join(', ');
    return `${token.key}: { ${properties} }`;
  });

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
  }
}
