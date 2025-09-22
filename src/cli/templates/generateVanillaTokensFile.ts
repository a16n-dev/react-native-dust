import { getDefaultTokens } from '../core/utilityClassTokens/getDefaultTokens';
import { getThemeTokens } from '../core/utilityClassTokens/getThemeTokens';
import { styleToken } from '../core/utilityClassTokens/types';
import { GeneratedProject } from './getGeneratedSource';
import { constructThemes } from '../core/constructThemes';
import { codegenOptions } from '../core/codegenTypes';
import { VariableDeclarationKind } from 'ts-morph';

export async function generateVanillaTokensFile(
  project: GeneratedProject,
  { whitelist, config }: codegenOptions
) {
  const file = project.addSourceFile('tokens.ts');

  const allThemes = constructThemes(config.theme, config.additionalThemes);

  const defaultTokens = getDefaultTokens(config, whitelist);
  const themeTokens = getThemeTokens(allThemes, whitelist);
  const tokens: styleToken[] = [...defaultTokens, ...themeTokens];

  file.addImportDeclaration({
    moduleSpecifier: 'react-native',
    namedImports: ['StyleSheet'],
  });
  file.addImportDeclaration({
    moduleSpecifier: './theme',
    namedImports: ['theme'],
  });

  const styleObjectEntries = tokens.map(token => {
    const properties = token.values.map(([property, value]) => `${property}: ${value}`).join(', ');
    return `${token.key}: { ${properties} }`;
  });

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{
      name: 't',
      initializer: `StyleSheet.create({\n  ${styleObjectEntries.join(',\n  ')}\n})`
    }],
  });
}
