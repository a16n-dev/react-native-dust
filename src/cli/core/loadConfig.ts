import { existsSync } from "fs";
import { resolve } from "path";
import { createJiti } from "jiti";
import { Config } from "../../config";

/**
 * These are the locations where we expect to find a config file by default, relative to the root of the project.
 */
const DEFAULT_CONFIG_FILES = [
  "dust.config.ts",
  "dust.config.js",
  "dust.config.json",
];

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

/**
 * This loads the config for the dust CLI. If no config path is provided, this function will attempt to read a config
 * file at the default locations - dust.config.(json|js|ts)
 */
export function loadConfig(configPath?: string): Config {
  const resolvedPath = findConfigFile(configPath);

  if (!resolvedPath) {
    if (!configPath) {
      console.error("Error: No config file found. Looked for:");
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

    const configJson: Config = config.default || config;

    // Validate the config

    // Multiple themes are only supported when mode: 'unistyles' is set
    if (
      Object.keys(configJson.themes).length > 1 &&
      configJson.options?.mode !== "unistyles"
    ) {
      console.error(
        "Error: Multiple themes are only supported when options.mode is set to 'unistyles'.",
      );
      process.exit(1);
    }

    return configJson;
  } catch (error) {
    console.error(`Error loading config file: ${error}`);
    process.exit(1);
  }
}
