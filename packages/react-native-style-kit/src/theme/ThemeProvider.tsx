import type { PropsWithChildren } from 'react';
import {
  type StyleKitBreakpoints,
  type StyleKitTheme,
  ThemeContext,
  type ThemeContextValue,
} from './ThemeContext.js';

export interface ThemeProviderProps extends PropsWithChildren {
  theme: StyleKitTheme;
  breakpoints?: StyleKitBreakpoints;
}

export function ThemeProvider({
  theme,
  breakpoints,
  children,
}: ThemeProviderProps) {
  const value: ThemeContextValue = {
    theme,
    breakpoints,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
