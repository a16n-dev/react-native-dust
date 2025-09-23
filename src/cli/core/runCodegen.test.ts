import { describe, expect, test } from 'vitest';
import type { ParsedConfig } from './config/configSchema.js';
import { constructCodegenProject } from './runCodegen.js';

const TEST_VANILLA_CONFIG: ParsedConfig = {
  include: ['src'],
  options: {
    mode: 'vanilla',
  },
  theme: {
    colors: {},
    radius: {},
    shadow: {},
    spacing: {},
    text: {},
  },
};

describe('constructCodegenProject', () => {
  test('should construct the expected output for the first sample configuration', async () => {
    const project = await constructCodegenProject({
      config: TEST_VANILLA_CONFIG,
    });

    expect(project.getSourceFiles()).toMatchSnapshot();
    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
