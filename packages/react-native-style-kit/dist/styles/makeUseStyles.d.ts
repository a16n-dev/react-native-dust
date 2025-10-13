import { StyleKitTheme } from "../theme/ThemeContext.js";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

//#region src/styles/makeUseStyles.d.ts
type RNStyle = ViewStyle | TextStyle | ImageStyle;
type MaybeBoolToStringKeys<B> = B extends boolean ? 'true' | 'false' : B;
type VariantType = Record<string, string | number | boolean>;
type VariantStyle<V extends VariantType> = V extends Record<string, never> ? unknown : {
  variants?: { [K in keyof V]?: { [Vv in MaybeBoolToStringKeys<V[K]>]?: RNStyle } };
  compoundVariants?: Array<Partial<V> & {
    style: RNStyle;
  }>;
};
type StyleDefinition<T, Variants extends VariantType> = { [P in keyof T]: RNStyle & VariantStyle<Variants> };
type ReturnStyleDefinition<T> = { [P in keyof T]: { [K in Exclude<keyof T[P], 'variants' | 'compoundVariants'>]: T[P][K] } };
type useStyles<T> = () => ReturnStyleDefinition<T>;
type useStylesWithVariants<T, Variants extends VariantType> = (variants: Variants) => ReturnStyleDefinition<T>;
declare function makeUseStyles<Variants extends VariantType = Record<string, never>>(): <T extends StyleDefinition<T, Variants>>(styleDefinition: (theme: StyleKitTheme) => T & StyleDefinition<any, Variants>) => Variants extends Record<string, never> ? useStyles<T> : useStylesWithVariants<T, Variants>;
//#endregion
export { makeUseStyles };