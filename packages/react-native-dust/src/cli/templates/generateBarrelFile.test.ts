import { describe, expect, test } from 'vitest';
import { generateBarrelFile } from './generateBarrelFile.js';
import { GeneratedProject } from './generatedProject.js';
import { TEST_VANILLA_CONFIG } from '../testUtils/exampleConfigs.js';

describe('generateBarrelFile', () => {
  test('output does not change unexpectedly', () => {
    const project = new GeneratedProject();

    generateBarrelFile(project, {
      config: TEST_VANILLA_CONFIG,
    });

    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
