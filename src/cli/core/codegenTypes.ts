import { ParsedConfig } from './config/configSchema';

export interface codegenOptions {
  config: ParsedConfig;
  whitelist?: string[];
}
