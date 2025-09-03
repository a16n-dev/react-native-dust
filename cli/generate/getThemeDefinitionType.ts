import { debug } from "../debug";

const DEFAULT_THEME_KEYS = ["colors", "spacing", "radius", "shadow"];

/**
 * This takes in a theme object and generates a TypeScript type to account for any
 * custom properties the user may have defined in their theme.
 */
export async function getThemeDefinition(
  themes: Record<string, any>,
): Promise<string> {
  // Get custom properties (not in default DuckTheme)
  const themeNames = Object.keys(themes);
  const firstTheme = themes[themeNames[0]];

  // Extract only custom properties
  const customProperties = Object.keys(firstTheme).filter(
    (key) => !DEFAULT_THEME_KEYS.includes(key),
  );

  debug("Theme has custom properties:", customProperties);

  // Generate type definitions for custom properties only
  function generateCustomPropertyType(value: any): string {
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (Array.isArray(value)) {
      if (value.length === 0) return "any[]";
      const firstType = typeof value[0];
      return value.every((item) => typeof item === firstType)
        ? `${firstType}[]`
        : "any[]";
    }
    if (typeof value === "object" && value !== null) {
      const entries = Object.keys(value).map((key) => {
        const propType = generateCustomPropertyType(value[key]);
        return `    ${key}: ${propType};`;
      });
      return `{\n${entries.join("\n")}\n  }`;
    }
    return "any";
  }

  const customTypeEntries = customProperties.map((key) => {
    const value = firstTheme[key];
    const type = generateCustomPropertyType(value);
    return `  ${key}: ${type};`;
  });

  const appThemeContent =
    customTypeEntries.length > 0
      ? customTypeEntries.join("\n")
      : "  // No custom properties found";
  const themeEntries = themeNames
    .map((name) => `  ${name}: AppTheme;`)
    .join("\n");

  return `
    export interface AppTheme extends DuckTheme {
${appThemeContent}
}

export type AppThemes = {
${themeEntries}
};
`;
}
