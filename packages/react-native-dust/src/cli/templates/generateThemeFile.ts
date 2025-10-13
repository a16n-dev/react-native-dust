import { GeneratedProject } from './generatedProject.js';
import { getJsonType } from 'get-json-type';
import { VariableDeclarationKind } from 'ts-morph';
import type { codegenOptions } from '../core/codegenTypes.js';

export function generateThemeFile(
  project: GeneratedProject,
  { config }: codegenOptions
) {
  const file = project.addSourceFile('theme.ts');

  if (config.options.mode === 'vanilla') {
    const themeType = getJsonType(config.theme, {
      useLiteralTypes: true,
    });

    // Add this typescript to the file
    file.addStatements(`export type AppTheme = ${themeType};`);
  }
  if (config.options.mode === 'unistyles') {
    const themeType = getJsonType(config.theme);

    // Add this typescript to the file
    file.addStatements(`export type AppTheme = ${themeType};`);
  }

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: 'theme',
        type: 'AppTheme',
        initializer: JSON.stringify(config.theme, null, 2),
      },
    ],
  });

  if (config.options.mode === 'unistyles') {
    // This adds a dummy interface override for `react-native-unistyles` so that
    // the types in the codegen project work as expected
    file.addTypeAlias({
      name: 'ThemesType',
      type: '{ default: AppTheme }',
    });

    file.addStatements(`declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends ThemesType {}
}`);
  }

  if (config.breakpoints) {
    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'breakpoints',
          initializer: JSON.stringify(config.breakpoints, null, 2),
        },
      ],
    });
  }
}
