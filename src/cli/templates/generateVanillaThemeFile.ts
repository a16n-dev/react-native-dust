import { ts, VariableDeclarationKind, StructureKind } from 'ts-morph';
import { GeneratedProject } from './getGeneratedSource';
import { codegenOptions } from '../core/codegenTypes';
import { getJsonType } from 'get-json-type';
import { constructThemes } from '../core/constructThemes';

export function generateVanillaThemeFile(
  project: GeneratedProject,
  { config }: codegenOptions
) {
  const file = project.addSourceFile('theme.ts');

  const themeType = getJsonType(config.theme);

  // Add this typescript to the file
  file.addStatements(`export type AppTheme = ${themeType};`);

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

  // TODO: remove this since it's only applicable for unistyles?
  // but actually I don't know if this file needs a vanilla/unistyles distinction
  // Export a "themes" object with multiple themes
  if (config.additionalThemes) {
    const varDec = file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: 'themes',
          type: 'Record<string, AppTheme>',
          initializer: '{}',
        },
      ],
    });

    const allThemes = constructThemes(config.theme, config.additionalThemes);

    const initializer = varDec
      .getDeclarations()[0]
      .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression);

    initializer.addProperties(
      Object.entries(allThemes).map(([name, themeJson]) => ({
        name,
        initializer:
          name === 'default' ? `theme` : JSON.stringify(themeJson, null, 2),
        kind: StructureKind.PropertyAssignment,
      }))
    );
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
