export type DustTheme = {
  colors: Record<string, Record<string, string>>;
  spacing: Record<string, number>;
  radius: Record<string, number>;
  shadow: Record<string, string>;
  text: Record<
    string,
    {
      fontSize: number;
      lineHeight?: number;
      letterSpacing?: number;
      fontWeight?: string | number;
    }
  >;
  [key: string]: any;
};

export type Config = {
  include: string[];
  themes: Record<string, DustTheme>;
  breakpoints?: Record<string, number>;
  options?: {
    /**
     * If true, will generate web__ & native__ prefixes for all tokens.
     * It will also generate a set of web-only tokens, such as web__fixed.
     */
    targetsWeb?: boolean;
    /**
     * Determines the mode for the generated styles. Defaults to 'vanilla'.
     * - 'vanilla': Generates standard React Native StyleSheet objects. Only a maximum of 1 theme
     * is supported.
     * - 'unistyles': Multiple themes are supported. Also includes safe area variants for
     * padding, margin and positioning utilities.
     */
    mode: "vanilla" | "unistyles";
  };
};
