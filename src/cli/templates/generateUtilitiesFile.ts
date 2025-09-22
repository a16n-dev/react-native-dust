import { ts, VariableDeclarationKind, StructureKind } from 'ts-morph';
import { GeneratedProject } from './getGeneratedSource';
import { codegenOptions } from '../core/codegenTypes';
import { getJsonType } from 'get-json-type';
import { constructThemes } from '../core/constructThemes';

export function generateUtilitiesFile(
  project: GeneratedProject,
  { config }: codegenOptions
) {
  const file = project.addSourceFile('utilities.ts');

  file.addImportDeclaration({
    moduleSpecifier: 'react-native',
    namedImports: ['Platform'],
  });

  if (config.options.targetsWeb) {
    file.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: 'isWeb',
          initializer: `Platform.OS === 'web'`,
        },
      ],
    });

    file.addStatements(
      `export function web<T>(arg: T): T | undefined { return isWeb ? arg : undefined; }`
    );
  }

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: 'isIOS',
        initializer: `Platform.OS === 'ios'`,
      },
    ],
  });

  file.addStatements(
    `export function ios<T>(arg: T): T | undefined { return isIOS ? arg : undefined; }`
  );

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: 'isAndroid',
        initializer: `Platform.OS === 'android'`,
      },
    ],
  });

  file.addStatements(
    `export function android<T>(arg: T): T | undefined { return isAndroid ? arg : undefined; }`
  );
}
