import { describe, expect, test } from 'vitest';
import { generateBarrelFile } from './generateBarrelFile.js';
import { GeneratedProject } from './generatedProject.js';

describe('generateBarrelFile', () => {
  test('output does not change unexpectedly', () => {
    const project = new GeneratedProject();

    generateBarrelFile(project);

    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
