import { describe, expect, test } from 'vitest';
import { constructCodegenProject } from './runCodegen.js';
import { TEST_VANILLA_CONFIG } from '../testUtils/exampleConfigs.js';

describe('constructCodegenProject', () => {
  test('should construct the expected output for the first sample configuration', async () => {
    const project = await constructCodegenProject({
      config: TEST_VANILLA_CONFIG,
    });

    expect(project.getSourceFiles()).toMatchSnapshot();
    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
