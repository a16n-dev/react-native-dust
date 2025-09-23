import { toMerged } from 'es-toolkit';
import type {
  ParsedExtendedTheme,
  ParsedTheme,
} from './config/configSchema.js';

/**
 * Resolves extended themes by merging them with the default theme
 */
export function constructThemes(
  defaultTheme: ParsedTheme,
  additionalThemes?: Record<string, ParsedTheme | ParsedExtendedTheme>
): { default: ParsedTheme; [key: string]: ParsedTheme } {
  const themes: { default: ParsedTheme; [key: string]: ParsedTheme } = {
    default: defaultTheme,
  };

  if (additionalThemes) {
    for (const [themeName, theme] of Object.entries(additionalThemes)) {
      if (isExtendedTheme(theme)) {
        themes[themeName] = toMerged(defaultTheme, theme.extend);
      } else {
        themes[themeName] = theme;
      }
    }
  }

  return themes;
}

function isExtendedTheme(
  theme: ParsedTheme | ParsedExtendedTheme
): theme is ParsedExtendedTheme {
  return 'extend' in theme && Object.keys(theme).length === 1;
}
