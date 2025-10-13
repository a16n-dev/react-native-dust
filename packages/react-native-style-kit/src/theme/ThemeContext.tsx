import { createContext } from 'react';

// This type is intended to be overwritten by the user of the library
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StyleKitTheme {}

export interface ThemeContextValue {
  theme: StyleKitTheme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
