import { describe, expect, test } from 'vitest';
import { generateBarrelFile } from './generateBarrelFile';
import { GeneratedProject } from './getGeneratedSource';

describe('generateBarrelFile', () => {
  test('output does not change unexpectedly', () => {
    const project = new GeneratedProject();

    generateBarrelFile(project);

    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
