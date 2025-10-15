import { useMemo, type PropsWithChildren } from 'react';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  type StyleKitBreakpoints,
  StyleKitContext,
  type StyleKitContextValue,
  type StyleKitTheme,
} from './StyleKitContext.js';

export type StyleKitProviderProps = PropsWithChildren &
  // Theme must be defined if types provided
  (keyof StyleKitTheme extends never
    ? { theme?: StyleKitTheme }
    : { theme: StyleKitTheme }) &
  // Breakpoints must be defined if types are provided
  (keyof StyleKitBreakpoints extends never
    ? { breakpoints?: StyleKitBreakpoints }
    : { breakpoints: StyleKitBreakpoints });

export function StyleKitProvider({
  theme,
  breakpoints,
  children,
}: StyleKitProviderProps) {
  const insets = useSafeAreaInsets();
  const screen = useSafeAreaFrame();

  const value: StyleKitContextValue = useMemo(
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
    <StyleKitContext.Provider value={value}>
      {children}
    </StyleKitContext.Provider>
  );
}
