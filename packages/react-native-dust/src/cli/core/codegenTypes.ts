import type { ParsedConfig } from './config/configSchema.js';

export interface codegenOptions {
  config: ParsedConfig;
  whitelist?: string[];
}
