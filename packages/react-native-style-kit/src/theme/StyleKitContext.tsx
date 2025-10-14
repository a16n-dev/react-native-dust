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

export interface StyleKitContextValue {
  // Theme that is currently applied
  theme: unknown;
  // Runtime values like screen dimensions and safe area insets
  runtime: StyleKitRuntime;
  // Set of defined breakpoints
  breakpoints?: unknown;
  // The current breakpoint based on screen width
  breakpoint?: string;
}

export const StyleKitContext = createContext<StyleKitContextValue | null>(null);
