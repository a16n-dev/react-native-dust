import { existsSync } from 'fs';
import { resolve } from 'path';
import { createJiti } from 'jiti';
import { z } from 'zod';

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

const themeSchema = z
  .object({
    colors: z.record(z.string(), z.record(z.string(), z.string())),
    spacing: z.record(z.string(), z.number()),
    radius: z.record(z.string(), z.number()),
    shadow: z.record(z.string(), z.string()),
    text: z.record(
      z.string(),
      z.object({
        fontSize: z.number(),
        lineHeight: z.number().optional(),
        letterSpacing: z.number().optional(),
      })
    ),
  })
  .loose();

const extendedThemeSchema = z.object({
  extend: themeSchema.partial(),
});

const configSchema = z
  .object({
    include: z.array(z.string()),
    theme: themeSchema,
    additionalThemes: z
      .record(z.string(), z.union([themeSchema, extendedThemeSchema]))
      .optional(),
    breakpoints: z.record(z.string(), z.number()).optional(),
    options: z
      .object({
        targetsWeb: z.boolean().optional(),
        mode: z.enum(['vanilla', 'unistyles']).default('vanilla'),
      })
      .prefault({}),
  })
  .refine(
    (data) => {
      // If additionalThemes exists, mode must be "unistyles"
      if (data.additionalThemes && data.options.mode !== 'unistyles')
        return false;
      return true;
    },
    {
      message: "additionalThemes can only be present when mode is 'unistyles'",
      path: ['additionalThemes'],
    }
  );

export type ParsedConfig = z.infer<typeof configSchema>;
export type ParsedTheme = z.infer<typeof themeSchema>;
export type ParsedExtendedTheme = z.infer<typeof extendedThemeSchema>;

export type InputConfig = z.input<typeof configSchema>;
export type InputTheme = z.input<typeof themeSchema>;
export type InputExtendedTheme = z.input<typeof extendedThemeSchema>;
