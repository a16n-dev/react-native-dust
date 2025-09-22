import { expect, test } from 'vitest';
import { VariableDeclarationKind } from 'ts-morph';
import { GeneratedProject } from './getGeneratedSource';

test('Source files can be created without error', () => {
  const project = new GeneratedProject();
  const file = project.addSourceFile('example.ts');
  expect(file).toBeDefined();
});

test('generating output of a basic file produces the intended output', () => {
  const project = new GeneratedProject();

  const file = project.addSourceFile('example.ts');

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{ name: 'example', initializer: "'Hello world'" }],
  });

  const output = project.getGeneratedFiles();

  // Expect both a single .js and .d.ts file
  expect(output).toHaveLength(2);
  expect(output).toMatchSnapshot();
});
