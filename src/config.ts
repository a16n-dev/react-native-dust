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

export type ExtendedDustTheme = { extend: Partial<DustTheme> };

export type Config = {
  include: string[];
  theme: DustTheme;
  additionalThemes?: Record<string, DustTheme | ExtendedDustTheme>;
  breakpoints?: Record<string, number>;
  options?: {
    /**
     * If true, will generate a set of web-only tokens, such as web_fixed.
     */
    targetsWeb?: boolean;
    /**
     * Determines the mode for the generated styles. Defaults to 'vanilla'.
     * - 'vanilla': Single theme support, plain stylesheet output, no runtime dependencies
     * - 'unistyles': Multiple themes support, safe area margin/padding utility classes. Requires unistyles.
     */
    mode?: "vanilla" | "unistyles";
  };
};
