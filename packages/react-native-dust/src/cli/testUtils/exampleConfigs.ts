import type { ParsedConfig } from '../core/config/configSchema.js';

export const TEST_VANILLA_CONFIG: ParsedConfig = {
  include: ['src'],
  options: {
    mode: 'vanilla',
    generatePlatformHelpers: true,
    targetsWeb: false,
    tokenAllowList: [],
    tokenBlockList: [],
  },
  theme: {
    colors: {},
    radius: {},
    shadow: {},
    spacing: {},
    text: {},
  },
};
