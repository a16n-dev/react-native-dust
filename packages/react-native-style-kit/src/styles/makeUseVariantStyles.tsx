import { type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import {
  type StyleKitRuntime,
  type StyleKitTheme,
  ThemeContext,
} from '../theme/ThemeContext.js';
import { useContext, useMemo } from 'react';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type MaybeBoolToStringKeys<B> = B extends boolean ? 'true' | 'false' : B;

type VariantType = Record<string, string | number | boolean>;

type VariantStyle<V extends VariantType> =
  V extends Record<string, never>
    ? unknown
    : {
        variants?: {
          [K in keyof V]?: {
            [Vv in MaybeBoolToStringKeys<V[K]>]?: RNStyle;
          };
        };
        compoundVariants?: Array<Partial<V> & { style: RNStyle }>;
      };

type StyleDefinition<T, Variants extends VariantType> = {
  [P in keyof T]: RNStyle & VariantStyle<Variants>;
};

// Remove variant/compoundVariant keys from the resulting style
type ReturnStyleDefinition<T> = {
  [P in keyof T]: {
    [K in Exclude<keyof T[P], 'variants' | 'compoundVariants'>]: T[P][K];
  };
};

type useStyles<T> = () => ReturnStyleDefinition<T>;
type useStylesWithVariants<T, Variants extends VariantType> = (
  variants: Variants
) => ReturnStyleDefinition<T>;

export function makeUseVariantStyles<
  Variants extends VariantType = Record<string, never>,
>() {
  return function innerMakeUseStyles<T extends StyleDefinition<T, Variants>>(
    styleDefinition: (
      theme: StyleKitTheme,
      runtime: StyleKitRuntime
    ) => T & StyleDefinition<any, Variants>
  ): Variants extends Record<string, never>
    ? useStyles<T>
    : useStylesWithVariants<T, Variants> {
    const useStyles = (variants?: Variants): ReturnStyleDefinition<T> => {
      const ctx = useContext(ThemeContext);

      if (!ctx)
        throw new Error('useStyles must be used within a ThemeProvider');

      // Avoid recalculating unless theme or variants change
      return useMemo(() => {
        const withTheme = styleDefinition(ctx.theme, ctx.runtime);

        if (!variants) {
          return withTheme as ReturnStyleDefinition<T>;
        }

        for (const key in withTheme) {
          if ('variants' in withTheme[key]) {
            // deal with variants by applying the correct styles
            for (const variantKey in variants) {
              for (const variantValue in variants[variantKey]) {
                // Check if the variant is the currently set variant

                if ((variantValue as any) === variants[variantKey]) {
                  // Apply the styles set
                  Object.assign(
                    withTheme[key],
                    (withTheme[key].variants as any)[variantKey][variantValue]
                  );
                }
              }
            }

            // Get rid of the variants key
            delete withTheme[key].variants;
          }

          if ('compoundVariants' in withTheme[key]) {
            (
              withTheme[key].compoundVariants as Array<
                Partial<Variants> & { style: RNStyle }
              >
            ).forEach((variant) => {
              let allMatch = true;

              for (const variantKey in variant) {
                if (variantKey === 'style') continue;

                if (variants[variantKey] !== variant[variantKey]) {
                  allMatch = false;
                  break;
                }
              }

              if (allMatch) {
                Object.assign(withTheme[key], variant.style);
              }
            });

            delete withTheme[key].compoundVariants;
          }
        }

        return withTheme;
      }, [
        ctx.theme,
        ctx.runtime,
        ...(variants ? Object.values(variants) : []),
      ]);
    };

    return useStyles as any;
  };
}
