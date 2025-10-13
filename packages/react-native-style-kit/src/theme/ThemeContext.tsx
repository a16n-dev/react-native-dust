import { createContext } from 'react';

// This type is intended to be overwritten by the user of the library
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StyleKitTheme {}

// This type is intended to be overwritten by the user of the library
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StyleKitBreakpoints {}

export interface StyleKitRuntime {
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  screen: {
    width: number;
    height: number;
  };
}

export interface ThemeContextValue {
  // Theme that is currently applied
  theme: StyleKitTheme;
  // Runtime values like screen dimensions and safe area insets
  runtime: StyleKitRuntime;
  // Set of defined breakpoints
  breakpoints?: StyleKitBreakpoints;
  // The current breakpoint based on screen width
  breakpoint?: keyof StyleKitBreakpoints;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
