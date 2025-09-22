import { describe, expect, test } from 'vitest';
import { constructCodegenProject } from './runCodegen';
import { Config } from '../../config';

const TEST_VANILLA_CONFIG: Config = {
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
  test('should construct the expected output for the first sample configuration', () => {
    const project = constructCodegenProject({ config: TEST_VANILLA_CONFIG });

    expect(project.getSourceFiles()).toMatchSnapshot();
    expect(project.getGeneratedFiles()).toMatchSnapshot();
  });
});
