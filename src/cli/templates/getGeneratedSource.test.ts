import { expect, test } from 'vitest';
import { createSourceFile, getGeneratedSource } from './getGeneratedSource';
import { VariableDeclarationKind } from 'ts-morph';

test('Source files can be created without error', () => {
  const file = createSourceFile('example.ts');
  expect(file).toBeDefined();
});

test('generating output of a basic file produces the intended output', () => {
  const file = createSourceFile('example.ts');

  file.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{ name: 'example', initializer: "'Hello world'" }],
  });

  const output = getGeneratedSource(file);

  // Expect both .js and .d.ts
  expect(output).toHaveLength(2);

  // Snapshot both files to ensure the names & content don't change unexpectedly
  expect(output[0]).toMatchSnapshot();
  expect(output[1]).toMatchSnapshot();
});
