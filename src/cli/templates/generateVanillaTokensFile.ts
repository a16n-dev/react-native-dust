import { Project, VariableDeclarationKind } from 'ts-morph';
import { Config } from '../../config';
import { getDefaultTokens } from '../core/utilityClassTokens/getDefaultTokens';
import { getThemeTokens } from '../core/utilityClassTokens/getThemeTokens';
import {
  styleToken,
  styleTokenValueProperty,
} from '../core/utilityClassTokens/types';
import { GeneratedProject } from './getGeneratedSource';
import { constructThemes } from '../core/constructThemes';
import { codegenOptions } from '../core/codegenTypes';

export function generateVanillaTokensFile(
  project: GeneratedProject,
  { whitelist, config }: codegenOptions
) {
  const file = project.addSourceFile('tokens.ts');

  const allThemes = constructThemes(config.theme, config.additionalThemes);

  const isUnistyles = config.options?.mode === 'unistyles';
  const defaultTokens = getDefaultTokens(config, whitelist);
  const themeTokens = getThemeTokens(allThemes, whitelist);
  const tokens: styleToken[] = [...defaultTokens, ...themeTokens];

  // Add imports to JS file
  if (isUnistyles) {
    // jsFile.addImportDeclaration({
    //   moduleSpecifier: "react-native-unistyles",
    //   namedImports: ["StyleSheet"],
    // });
  } else {
    file.addImportDeclaration({
      moduleSpecifier: 'react-native',
      namedImports: ['StyleSheet'],
    });
    file.addImportDeclaration({
      moduleSpecifier: './theme',
      namedImports: ['theme'],
    });
  }
  //
  // // Generate tokens object
  // const styleProperties = tokens
  //   .map(({ key, values }) => {
  //     const props = values
  //       .map(([prop, val]: styleTokenValueProperty) => `${prop}: ${val}`)
  //       .join(', ');
  //     return `${key}: { ${props} }`;
  //   })
  //   .join(',\n  ');
  //
  // if (isUnistyles) {
  //   const tokensInitializer = `StyleSheet.create((theme, runtime) => ({\n  ${styleProperties}\n}))`;
  //   jsFile.addVariableStatement({
  //     declarationKind: VariableDeclarationKind.Const,
  //     isExported: true,
  //     declarations: [{ name: 't', initializer: tokensInitializer }],
  //   });
  // } else {
  //   const tokensInitializer = `StyleSheet.create({\n  ${styleProperties}\n})`;
  //   jsFile.addVariableStatement({
  //     declarationKind: VariableDeclarationKind.Const,
  //     isExported: true,
  //     declarations: [{ name: 't', initializer: tokensInitializer }],
  //   });
  // }
  //
  // // Generate TypeScript declarations
  // dtsFile.addInterface({
  //   name: 'TokenStyles',
  //   isExported: true,
  //   properties: tokens.map(({ key, values }) => ({
  //     name: key,
  //     type: `{ ${values.map((v: styleTokenValueProperty) => `${v[0]}: ${v[2] ?? 'any'}`).join('; ')} }`,
  //   })),
  // });
  //
  // dtsFile.addVariableStatement({
  //   hasDeclareKeyword: true,
  //   isExported: true,
  //   declarations: [{ name: 't', type: 'TokenStyles' }],
  // });
  //
  // return {
  //   js: jsFile.getFullText(),
  //   dts: dtsFile.getFullText(),
  // };
}
