import { existsSync } from 'fs';
import { resolve } from 'path';
import { createJiti } from 'jiti';
import { z } from 'zod';
import { configSchema, ParsedConfig } from './configSchema';

/**
 * These are the locations where we expect to find a config file by default, relative to the root of the project.
 */
const DEFAULT_CONFIG_FILES = [
  'dust.config.ts',
  'dust.config.js',
  'dust.config.json',
];

/**
 * This loads the config for the dust CLI. If no config path is provided, this function will attempt to read a config
 * file at the default locations - dust.config.(json|js|ts).
 *
 * It will also validate that the config matches the expected type,
 */
export function loadConfig(configPath?: string): ParsedConfig {
  const resolvedPath = findConfigFile(configPath);

  if (!resolvedPath) {
    if (!configPath) {
      console.error('Error: No config file found. Looked for:');
      DEFAULT_CONFIG_FILES.forEach((file) => console.error(`  - ${file}`));
    } else {
      console.error(`Error: Config file not found at ${resolve(configPath)}`);
    }
    process.exit(1);
  }

  try {
    // jiti can load both .js and .ts files seamlessly
    const jiti = createJiti(__filename);
    const config = jiti(resolvedPath);

    const rawConfigJson = config.default || config;

    // Validate the config
    const parseResult = configSchema.safeParse(rawConfigJson);

    if (parseResult.error) {
      console.error('Invalid config file: ');
      console.error(z.prettifyError(parseResult.error));
      process.exit(1);
    }

    return parseResult.data;
  } catch (error) {
    console.error(`Error loading config file: ${error}`);
    process.exit(1);
  }
}

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
