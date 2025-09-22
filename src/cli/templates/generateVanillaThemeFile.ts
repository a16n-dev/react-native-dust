import { ts, VariableDeclarationKind, StructureKind } from 'ts-morph';
import { GeneratedProject } from './getGeneratedSource';
import { codegenOptions } from '../core/codegenTypes';

export function generateVanillaThemeFile(
  project: GeneratedProject,
  { config }: codegenOptions
) {
  const file = project.addSourceFile('theme.ts');

  // get the interface for the theme
  file.addInterface({
    name: 'AppTheme',
  });

  const firstTheme = config.theme;

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      { name: 'theme', initializer: JSON.stringify(firstTheme, null, 2) },
    ],
  });

  // Export a "themes" object with multiple themes
  if (config.additionalThemes) {
    const varDec = file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: 'themes',
          initializer: '{}',
        },
      ],
    });

    const initializer = varDec
      .getDeclarations()[0]
      .getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression);

    initializer.addProperties([
      {
        name: 'default',
        initializer: `theme`,
        kind: StructureKind.PropertyAssignment,
      },
    ]);
  }

  if (config.breakpoints) {
    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'breakpoints',
          initializer: JSON.stringify(config.breakpoints ?? {}, null, 2),
        },
      ],
    });
  }
}
