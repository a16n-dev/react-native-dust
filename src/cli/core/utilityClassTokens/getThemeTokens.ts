import { styleToken, styleTokenValueProperty } from "./types";
import { DustTheme } from "../../../config";
import { uniq } from "es-toolkit";

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

  const addToken = (key: string, values: styleTokenValueProperty[]) => {
    if (whitelist && !whitelist.includes(key)) return;

    tokens.push({ key, values });
  };

  const getTypeValue = (
    accessor: (theme: DustTheme) => any,
    defaultType: "string" | "number" = "string",
    quoteStrings = false,
  ) => {
    const possibleValues = uniq(Object.values(themes).map(accessor));
    if (possibleValues.length === 1) {
      const value = possibleValues[0];
      return quoteStrings && defaultType === "string"
        ? `"${value}"`
        : `${value}`;
    }
    return defaultType;
  };

  // 1. Process theme colors
  // Colors map to bg_*, text_, border_*
  const colorGroups = Object.entries(theme.colors);
  for (const [groupName, group] of colorGroups) {
    for (const shade of Object.keys(group)) {
      // Figure out the typescript type for this token
      const typeValue = getTypeValue(
        (theme) => theme.colors[groupName]?.[shade],
        "string",
        true,
      );

      addToken(`bg_${groupName}_${shade}`, [
        ["backgroundColor", `theme.colors.${groupName}["${shade}"]`, typeValue],
      ]);
      addToken(`text_${groupName}_${shade}`, [
        ["color", `theme.colors.${groupName}["${shade}"]`, typeValue],
      ]);
      addToken(`border_${groupName}_${shade}`, [
        ["borderColor", `theme.colors.${groupName}["${shade}"]`, typeValue],
      ]);
    }
  }
  // Process theme spacing
  for (const sizeName of Object.keys(theme.spacing)) {
    const typeValue = getTypeValue(
      (theme) => theme.spacing[sizeName],
      "number",
    );

    // Margin
    addToken(`m_${sizeName}`, [
      ["margin", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`mt_${sizeName}`, [
      ["marginTop", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`mb_${sizeName}`, [
      ["marginBottom", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`ml_${sizeName}`, [
      ["marginLeft", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`mr_${sizeName}`, [
      ["marginRight", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`mx_${sizeName}`, [
      ["marginHorizontal", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`my_${sizeName}`, [
      ["marginVertical", `theme.spacing.${sizeName}`, typeValue],
    ]);
    // Padding
    addToken(`p_${sizeName}`, [
      ["padding", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`pt_${sizeName}`, [
      ["paddingTop", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`pb_${sizeName}`, [
      ["paddingBottom", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`pl_${sizeName}`, [
      ["paddingLeft", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`pr_${sizeName}`, [
      ["paddingRight", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`px_${sizeName}`, [
      ["paddingHorizontal", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`py_${sizeName}`, [
      ["paddingVertical", `theme.spacing.${sizeName}`, typeValue],
    ]);
    // Gap
    addToken(`gap_${sizeName}`, [
      ["gap", `theme.spacing.${sizeName}`, typeValue],
    ]);
    // Width, Height and size
    addToken(`w_${sizeName}`, [
      ["width", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`h_${sizeName}`, [
      ["height", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`size_${sizeName}`, [
      ["width", `theme.spacing.${sizeName}`, typeValue],
      ["height", `theme.spacing.${sizeName}`, typeValue],
    ]);

    // Positioning
    addToken(`top_${sizeName}`, [
      ["top", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`bottom_${sizeName}`, [
      ["bottom", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`left_${sizeName}`, [
      ["left", `theme.spacing.${sizeName}`, typeValue],
    ]);
    addToken(`right_${sizeName}`, [
      ["right", `theme.spacing.${sizeName}`, typeValue],
    ]);
  }

  // Process theme radius
  for (const radiusName of Object.keys(theme.radius)) {
    const typeValue = getTypeValue(
      (theme) => theme.radius[radiusName],
      "number",
    );

    addToken(`rounded_${radiusName}`, [
      ["borderRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_t_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_b_${radiusName}`, [
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_l_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_r_${radiusName}`, [
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`, typeValue],
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_tl_${radiusName}`, [
      ["borderTopLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_tr_${radiusName}`, [
      ["borderTopRightRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_bl_${radiusName}`, [
      ["borderBottomLeftRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
    addToken(`rounded_br_${radiusName}`, [
      ["borderBottomRightRadius", `theme.radius["${radiusName}"]`, typeValue],
    ]);
  }

  // Process theme shadow
  for (const shadowName of Object.keys(theme.shadow)) {
    const typeValue = getTypeValue(
      (theme) => theme.shadow[shadowName],
      "string",
      true,
    );

    addToken(`shadow_${shadowName}`, [
      ["boxShadow", `theme.shadow["${shadowName}"]`, typeValue],
    ]);
  }

  // Process theme text
  for (const textStyleName of Object.keys(theme.text)) {
    const textStyle = theme.text[textStyleName];

    const values: [string, string, string][] = [
      [
        "fontSize",
        `theme.text["${textStyleName}"].fontSize`,
        getTypeValue((theme) => theme.text[textStyleName]?.fontSize, "number"),
      ],
    ];

    if (textStyle.fontWeight) {
      values.push([
        "fontWeight",
        `theme.text["${textStyleName}"].fontWeight`,
        getTypeValue(
          (theme) => theme.text[textStyleName]?.fontWeight,
          "number",
        ),
      ]);
    }

    if (textStyle.lineHeight) {
      values.push([
        "lineHeight",
        `theme.text["${textStyleName}"].lineHeight`,
        getTypeValue(
          (theme) => theme.text[textStyleName]?.lineHeight,
          "number",
        ),
      ]);
    }

    if (textStyle.letterSpacing) {
      values.push([
        "letterSpacing",
        `theme.text["${textStyleName}"].letterSpacing`,
        getTypeValue(
          (theme) => theme.text[textStyleName]?.letterSpacing,
          "number",
        ),
      ]);
    }

    addToken(`text_${textStyleName}`, values);
  }

  return tokens;
}
