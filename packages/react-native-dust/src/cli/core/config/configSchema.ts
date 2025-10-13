import { z } from 'zod';

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

export const configSchema = z.object({
  include: z.array(z.string()),
  theme: themeSchema,
  breakpoints: z.record(z.string(), z.number()).optional(),
  options: z
    .object({
      targetsWeb: z.boolean().optional(),
      mode: z.enum(['vanilla', 'unistyles']).default('vanilla'),
      tokenAllowList: z.array(z.string()).default([]),
      tokenBlockList: z.array(z.string()).default([]),
      generatePlatformHelpers: z.boolean().default(true),
    })
    .prefault({}),
});

export type ParsedConfig = z.infer<typeof configSchema>;
export type ParsedTheme = z.infer<typeof themeSchema>;

export type InputConfig = z.input<typeof configSchema>;
export type InputTheme = z.input<typeof themeSchema>;
