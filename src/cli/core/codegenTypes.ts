import { ParsedConfig } from './loadConfig';

export interface codegenOptions {
  config: ParsedConfig;
  whitelist?: string[];
}
