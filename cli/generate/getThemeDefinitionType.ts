import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";

async function generateTypeInterfaceFromObjects(
  objs: any[],
  interfaceName: string,
): Promise<string> {
  const jsonInput = jsonInputForTargetLanguage("typescript");
  await jsonInput.addSource({
    name: interfaceName,
    samples: objs.map((v) => JSON.stringify(v)),
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "typescript",
    inferMaps: false,
    rendererOptions: {
      "just-types": true,
      "explicit-unions": true,
      "prefer-unions": false,
    },
  });

  return lines.join("\n");
}

/**
 * This takes in a theme object and generates a TypeScript type to account for any
 * custom properties the user may have defined in their theme.
 *
 * If the user has defined multiple themes, any properties that are not defined in all themes
 * will be marked as optional in the generated types
 */
export async function getThemeDefinition(
  themes: Record<string, any>,
): Promise<string> {
  const allThemeObjects = Object.values(themes);

  const appThemeInterface = await generateTypeInterfaceFromObjects(
    allThemeObjects,
    "AppTheme",
  );

  const themeNames = Object.keys(themes);

  const themeEntries = themeNames
    .map((name) => `  ${name}: AppTheme;`)
    .join("\n");

  const appThemesType = `
export declare const themes: {
${themeEntries}
};`;

  const appBreakpointsType = `
export declare const breakpoints: {};
`;

  return `${appThemeInterface}${appThemesType}\n${appBreakpointsType}`;
}
