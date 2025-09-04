const defaultTokens: { key: string; values: string[] }[] = [
  // Safe area padding tokens
  {
    key: "p_safe",
    values: [
      "paddingTop: runtime.insets.top",
      "paddingBottom: runtime.insets.bottom",
      "paddingLeft: runtime.insets.left",
      "paddingRight: runtime.insets.right",
    ],
  },
  {
    key: "px_safe",
    values: [
      "paddingLeft: runtime.insets.left",
      "paddingRight: runtime.insets.right",
    ],
  },
  {
    key: "py_safe",
    values: [
      "paddingTop: runtime.insets.top",
      "paddingBottom: runtime.insets.bottom",
    ],
  },
  { key: "pt_safe", values: ["paddingTop: runtime.insets.top"] },
  { key: "pb_safe", values: ["paddingBottom: runtime.insets.bottom"] },
  { key: "pl_safe", values: ["paddingLeft: runtime.insets.left"] },
  { key: "pr_safe", values: ["paddingRight: runtime.insets.right"] },

  // Safe area margin tokens
  {
    key: "m_safe",
    values: [
      "marginTop: runtime.insets.top",
      "marginBottom: runtime.insets.bottom",
      "marginLeft: runtime.insets.left",
      "marginRight: runtime.insets.right",
    ],
  },
  {
    key: "mx_safe",
    values: [
      "marginLeft: runtime.insets.left",
      "marginRight: runtime.insets.right",
    ],
  },
  {
    key: "my_safe",
    values: [
      "marginTop: runtime.insets.top",
      "marginBottom: runtime.insets.bottom",
    ],
  },
  { key: "mt_safe", values: ["marginTop: runtime.insets.top"] },
  { key: "mb_safe", values: ["marginBottom: runtime.insets.bottom"] },
  { key: "ml_safe", values: ["marginLeft: runtime.insets.left"] },
  { key: "mr_safe", values: ["marginRight: runtime.insets.right"] },

  // Default sizing tokens
  { key: "w_full", values: ['width: "100%"'] },
  { key: "h_full", values: ['height: "100%"'] },
  { key: "h_0", values: ["height: 0"] },
  { key: "w_0", values: ["width: 0"] },

  // Flexbox tokens
  { key: "flex_row", values: ['flexDirection: "row"'] },
  { key: "flex_row_reverse", values: ['flexDirection: "row-reverse"'] },
  { key: "flex_col", values: ['flexDirection: "column"'] },
  { key: "flex_col_reverse", values: ['flexDirection: "column-reverse"'] },
  { key: "items_start", values: ['alignItems: "flex-start"'] },
  { key: "items_center", values: ['alignItems: "center"'] },
  { key: "items_end", values: ['alignItems: "flex-end"'] },
  { key: "items_stretch", values: ['alignItems: "stretch"'] },
  { key: "items_baseline", values: ['alignItems: "baseline"'] },
  { key: "justify_start", values: ['justifyContent: "flex-start"'] },
  { key: "justify_center", values: ['justifyContent: "center"'] },
  { key: "justify_end", values: ['justifyContent: "flex-end"'] },
  { key: "justify_between", values: ['justifyContent: "space-between"'] },
  { key: "justify_around", values: ['justifyContent: "space-around"'] },
  { key: "justify_evenly", values: ['justifyContent: "space-evenly"'] },
  { key: "flex_wrap", values: ['flexWrap: "wrap"'] },
  { key: "flex_nowrap", values: ['flexWrap: "nowrap"'] },
  { key: "flex_1", values: ["flex: 1"] },
  { key: "flex_grow_0", values: ["flexGrow: 0"] },
  { key: "flex_grow_1", values: ["flexGrow: 1"] },
  { key: "flex_shrink_0", values: ["flexShrink: 0"] },
  { key: "flex_shrink_1", values: ["flexShrink: 1"] },

  // Positioning tokens
  { key: "absolute", values: ['position: "absolute"'] },
  { key: "relative", values: ['position: "relative"'] },
  { key: "inset_0", values: ["top: 0", "right: 0", "bottom: 0", "left: 0"] },
];

/**
 * Returns a collection of default utility style tokens.
 */
export function getDefaultTokens(whitelist?: string[]) {
  if (!whitelist) {
    return defaultTokens;
  }
  return defaultTokens.filter((token) => whitelist.includes(token.key));
}
