import { DustTheme } from "../../types";
import { styleToken } from "./types";

/**
 * Generates utility style tokens for the provided theme.
 */
export function getThemeTokens(
  themes: Record<string, DustTheme>,
  whitelist?: string[],
): styleToken[] {
  const theme = themes[Object.keys(themes)[0]];

  // define a data structure to hold structured information about the tokens
  const tokens: styleToken[] = [];

  const addToken = (
    key: string,
    values: [property: string, value: string][],
  ) => {
    if (whitelist && !whitelist.includes(key)) return;

    tokens.push({ key, values });
  };

  // 1. Process theme colors
  // Colors map to bg_*, text_, border_*
  const colorGroups = Object.entries(theme.colors);
  for (const [groupName, group] of colorGroups) {
    for (const shade of Object.keys(group)) {
      addToken(`bg_${groupName}_${shade}`, [
        ["backgroundColor", `theme.colors.${groupName}["${shade}"]`],
      ]);
      addToken(`text_${groupName}_${shade}`, [
        ["color", `theme.colors.${groupName}["${shade}"]`],
      ]);
      addToken(`border_${groupName}_${shade}`, [
        ["borderColor", `theme.colors.${groupName}["${shade}"]`],
      ]);
    }
  }
  // Process theme spacing
  for (const sizeName of Object.keys(theme.spacing)) {
    // Margin
    addToken(`m_${sizeName}`, [["margin", `theme.spacing.${sizeName}`]]);
    addToken(`mt_${sizeName}`, [["marginTop", `theme.spacing.${sizeName}`]]);
    addToken(`mb_${sizeName}`, [["marginBottom", `theme.spacing.${sizeName}`]]);
    addToken(`ml_${sizeName}`, [["marginLeft", `theme.spacing.${sizeName}`]]);
    addToken(`mr_${sizeName}`, [["marginRight", `theme.spacing.${sizeName}`]]);
    addToken(`mx_${sizeName}`, [
      ["marginHorizontal", `theme.spacing.${sizeName}`],
    ]);
    addToken(`my_${sizeName}`, [
      ["marginVertical", `theme.spacing.${sizeName}`],
    ]);
    // Padding
    addToken(`p_${sizeName}`, [["padding", `theme.spacing.${sizeName}`]]);
    addToken(`pt_${sizeName}`, [["paddingTop", `theme.spacing.${sizeName}`]]);
    addToken(`pb_${sizeName}`, [
      ["paddingBottom", `theme.spacing.${sizeName}`],
    ]);
    addToken(`pl_${sizeName}`, [["paddingLeft", `theme.spacing.${sizeName}`]]);
    addToken(`pr_${sizeName}`, [["paddingRight", `theme.spacing.${sizeName}`]]);
    addToken(`px_${sizeName}`, [
      ["paddingHorizontal", `theme.spacing.${sizeName}`],
    ]);
    addToken(`py_${sizeName}`, [
      ["paddingVertical", `theme.spacing.${sizeName}`],
    ]);
    // Gap
    addToken(`gap_${sizeName}`, [["gap", `theme.spacing.${sizeName}`]]);
    // Width, Height and size
    addToken(`w_${sizeName}`, [["width", `theme.spacing.${sizeName}`]]);
    addToken(`h_${sizeName}`, [["height", `theme.spacing.${sizeName}`]]);
    addToken(`size_${sizeName}`, [
      ["width", `theme.spacing.${sizeName}`],
      ["height", `theme.spacing.${sizeName}`],
    ]);

    // Positioning
    addToken(`top_${sizeName}`, [["top", `theme.spacing.${sizeName}`]]);
    addToken(`bottom_${sizeName}`, [["bottom", `theme.spacing.${sizeName}`]]);
    addToken(`left_${sizeName}`, [["left", `theme.spacing.${sizeName}`]]);
    addToken(`right_${sizeName}`, [["right", `theme.spacing.${sizeName}`]]);
  }

  // Process theme radius
  for (const radiusName of Object.keys(theme.radius)) {
    addToken(`rounded_${radiusName}`, [
      ["borderRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_t_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`],
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_b_${radiusName}`, [
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`],
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_l_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`],
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_r_${radiusName}`, [
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`],
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_tl_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_tr_${radiusName}`, [
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_bl_${radiusName}`, [
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`],
    ]);
    addToken(`rounded_br_${radiusName}`, [
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`],
    ]);
  }

  // Process theme shadow
  for (const shadowName of Object.keys(theme.shadow)) {
    addToken(`shadow_${shadowName}`, [
      ["boxShadow", `theme.shadow["${shadowName}"]`],
    ]);
  }

  // Process theme text
  for (const textStyleName of Object.keys(theme.text)) {
    const textStyle = theme.text[textStyleName];
    const values: [string, string][] = [
      ["fontSize", `theme.text["${textStyleName}"].fontSize`],
    ];
    if (textStyle.fontWeight) {
      values.push(["fontWeight", `theme.text["${textStyleName}"].fontWeight`]);
    }
    if (textStyle.lineHeight) {
      values.push(["lineHeight", `theme.text["${textStyleName}"].lineHeight`]);
    }
    if (textStyle.letterSpacing) {
      values.push([
        "letterSpacing",
        `theme.text["${textStyleName}"].letterSpacing`,
      ]);
    }

    addToken(`text_${textStyleName}`, values);
  }

  return tokens;
}
