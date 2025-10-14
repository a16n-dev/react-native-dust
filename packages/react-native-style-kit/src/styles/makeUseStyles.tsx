import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  StyleKitContext,
  type StyleKitRuntime,
  type StyleKitTheme,
} from '../theme/StyleKitContext.js';
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
    // Create a cache to store previously computed styles. This ensures that if
    // an instance of `useStyles` is used across multiple components,
    // we don't recalculate styles unnecessarily.
    const cache = new WeakMap();

    return (): ReturnStyleDefinition<T> => {
      const ctx = useContext(StyleKitContext);

      if (!ctx)
        throw new Error('useStyles must be used within a StyleKitProvider');

      // Avoid recalculating unless runtime changes
      return useMemo(() => {
        if (cache.has(ctx)) {
          return cache.get(ctx);
        }

        const styles = StyleSheet.create(
          styleDefinition(ctx.theme as StyleKitTheme, ctx.runtime)
        );

        // Store the computed styles in the cache
        cache.set(ctx, styles);

        return styles;
      }, [ctx]);
    };
  };
}
