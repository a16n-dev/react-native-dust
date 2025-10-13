import { type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import {
  type StyleKitRuntime,
  type StyleKitTheme,
  ThemeContext,
} from '../theme/ThemeContext.js';
import { useContext, useMemo } from 'react';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type StyleDefinition<T> = {
  [P in keyof T]: RNStyle;
};

// Remove variant/compoundVariant keys from the resulting style
type ReturnStyleDefinition<T> = StyleDefinition<T>;

type useStyles<T> = () => ReturnStyleDefinition<T>;

export function makeUseStyles() {
  return function innerMakeUseStyles<T extends StyleDefinition<T>>(
    styleDefinition: (
      theme: StyleKitTheme,
      runtime: StyleKitRuntime
    ) => T & StyleDefinition<any>
  ): useStyles<T> {
    return (): ReturnStyleDefinition<T> => {
      const ctx = useContext(ThemeContext);

      if (!ctx)
        throw new Error('useStyles must be used within a ThemeProvider');

      // Avoid recalculating unless theme or variants change
      return useMemo(() => {
        return styleDefinition(ctx.theme, ctx.runtime);
      }, [ctx.theme, ctx.runtime]);
    };
  };
}
