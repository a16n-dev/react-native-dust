import { useCallback, useContext } from 'react';
import {
  type StyleKitBreakpoints,
  StyleKitContext,
} from '../theme/StyleKitContext.js';

type ZeroBreakpoint<T> = {
  [K in keyof T]: T[K] extends 0 ? K : never;
}[keyof T];

type hasZeroBreakpoint<T> = [ZeroBreakpoint<StyleKitBreakpoints>] extends [
  never,
]
  ? false
  : T extends Record<ZeroBreakpoint<StyleKitBreakpoints>, any>
    ? true
    : false;

export function useBreakpoints() {
  const ctx = useContext(StyleKitContext);

  if (!ctx) {
    throw new Error('useBreakpoints must be used within a ThemeProvider');
  }

  const screenWidth = ctx.runtime.screen.width;
  const breakpoints = ctx.breakpoints as unknown as Record<string, number>;

  return useCallback(
    <T extends Partial<Record<keyof StyleKitBreakpoints, any>>>(
      values: T
    ): hasZeroBreakpoint<T> extends true
      ? T[keyof T]
      : T[keyof T] | undefined => {
      // Find the largest matched breakpoint

      if (!breakpoints) {
        throw new Error('No breakpoints defined');
      }

      let matchedBreakpoint: string | undefined;
      for (const key in breakpoints) {
        const value = breakpoints[key];
        if (screenWidth >= value) {
          if (
            !matchedBreakpoint ||
            (breakpoints[matchedBreakpoint] as number) < value
          ) {
            matchedBreakpoint = key;
          }
        }
      }

      return matchedBreakpoint ? (values as any)[matchedBreakpoint] : undefined;
    },
    [screenWidth, breakpoints]
  );
}
