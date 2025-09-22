import { toMerged } from 'es-toolkit';
import { DustTheme, ExtendedDustTheme } from '../../config';

export function constructThemes(
  defaultTheme: DustTheme,
  additionalThemes?: Record<string, DustTheme | ExtendedDustTheme>
): { default: DustTheme; [key: string]: DustTheme } {
  const themes: { default: DustTheme; [key: string]: DustTheme } = {
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
  theme: DustTheme | ExtendedDustTheme
): theme is ExtendedDustTheme {
  return 'extend' in theme && Object.keys(theme).length === 1;
}
