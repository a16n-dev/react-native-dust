import { useMemo, type PropsWithChildren } from 'react';
import {
  type StyleKitBreakpoints,
  type StyleKitTheme,
  ThemeContext,
  type ThemeContextValue,
} from './ThemeContext.js';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export interface ThemeProviderProps extends PropsWithChildren {
  theme: StyleKitTheme;
  breakpoints?: StyleKitBreakpoints;
}

export function ThemeProvider({
  theme,
  breakpoints,
  children,
}: ThemeProviderProps) {
  const insets = useSafeAreaInsets();
  const screen = useSafeAreaFrame();

  const value: ThemeContextValue = useMemo(
    () => ({
      theme,
      breakpoints,
      runtime: {
        insets,
        screen: {
          width: screen.width,
          height: screen.height,
        },
      },
    }),
    [theme, breakpoints, insets, screen.width, screen.height]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
