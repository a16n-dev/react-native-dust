import type { PropsWithChildren } from 'react';
import {
  type StyleKitTheme,
  ThemeContext,
  type ThemeContextValue,
} from './ThemeContext.js';

export interface ThemeProviderProps extends PropsWithChildren {
  theme: StyleKitTheme;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const value: ThemeContextValue = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
