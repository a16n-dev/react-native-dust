import { existsSync } from 'fs';
import { resolve } from 'path';
import { createJiti } from 'jiti';
import {Config} from "../types";

const DEFAULT_CONFIG_FILES = ['duck.config.ts', 'duck.config.js', 'duck.config.json'];

function findConfigFile(configPath?: string): string | null {
  // If a specific path was provided, use it as-is
  if (configPath) {
    return resolve(configPath);
  }
  
  // Check for default config files in order of preference
  for (const config of DEFAULT_CONFIG_FILES) {
    const resolvedPath = resolve(config);
    if (existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }
  
  return null;
}

export function loadConfig(configPath?: string): Config {
  const resolvedPath = findConfigFile(configPath);
  
  if (!resolvedPath) {
    if (!configPath) {
      console.error('Error: No config file found. Looked for:');
      DEFAULT_CONFIG_FILES.forEach(file => console.error(`  - ${file}`));
    } else {
      console.error(`Error: Config file not found at ${resolve(configPath)}`);
    }
    process.exit(1);
  }

  try {
    // jiti can load both .js and .ts files seamlessly
    const jiti = createJiti(__filename);
    const config = jiti(resolvedPath);
    
    return config.default || config;
  } catch (error) {
    console.error(`Error loading config file: ${error}`);
    process.exit(1);
  }
}