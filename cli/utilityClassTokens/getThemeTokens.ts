import { DuckTheme } from "../../types";

/**
 * Generates utility style tokens for the provided theme.
 */
export function getThemeTokens(
  theme: DuckTheme,
  whitelist?: string[],
): { key: string; values: string[] }[] {
  // define a data structure to hold structured information about the tokens
  const tokens: { key: string; values: string[] }[] = [];

  const addToken = (key: string, values: string[]) => {
    if (whitelist && !whitelist.includes(key)) return;

    tokens.push({ key, values });
  };

  // 1. Process theme colors
  // Colors map to bg_*, text_
  const colorGroups = Object.entries(theme.colors);
  for (const [groupName, group] of colorGroups) {
    for (const shade of Object.keys(group)) {
      addToken(`bg_${groupName}_${shade}`, [
        `backgroundColor: theme.colors.${groupName}["${shade}"]`,
      ]);
      addToken(`text_${groupName}_${shade}`, [
        `color: theme.colors.${groupName}["${shade}"]`,
      ]);
    }
  }
  // Process theme spacing
  for (const sizeName of Object.keys(theme.spacing)) {
    addToken(`m_${sizeName}`, [`margin: theme.spacing.${sizeName}`]);
    addToken(`mt_${sizeName}`, [`marginTop: theme.spacing.${sizeName}`]);
    addToken(`mb_${sizeName}`, [`marginBottom: theme.spacing.${sizeName}`]);
    addToken(`ml_${sizeName}`, [`marginLeft: theme.spacing.${sizeName}`]);
    addToken(`mr_${sizeName}`, [`marginRight: theme.spacing.${sizeName}`]);
    addToken(`mx_${sizeName}`, [`marginHorizontal: theme.spacing.${sizeName}`]);
    addToken(`my_${sizeName}`, [`marginVertical: theme.spacing.${sizeName}`]);

    addToken(`p_${sizeName}`, [`padding: theme.spacing.${sizeName}`]);
    addToken(`pt_${sizeName}`, [`paddingTop: theme.spacing.${sizeName}`]);
    addToken(`pb_${sizeName}`, [`paddingBottom: theme.spacing.${sizeName}`]);
    addToken(`pl_${sizeName}`, [`paddingLeft: theme.spacing.${sizeName}`]);
    addToken(`pr_${sizeName}`, [`paddingRight: theme.spacing.${sizeName}`]);
    addToken(`px_${sizeName}`, [
      `paddingHorizontal: theme.spacing.${sizeName}`,
    ]);
    addToken(`py_${sizeName}`, [`paddingVertical: theme.spacing.${sizeName}`]);
  }

  // Process theme radius

  // Process theme shadow

  // Convert the structured data into TypeScript code

  return tokens;
}
