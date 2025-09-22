import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';
import { constructThemes } from './constructThemes';
import { ParsedConfig } from './loadConfig';
import { getJsonType } from 'get-json-type';

export async function generateTypeInterfaceFromObjects(
  objs: any[],
  interfaceName: string
): Promise<string> {
  const jsonInput = jsonInputForTargetLanguage('typescript');
  await jsonInput.addSource({
    name: interfaceName,
    samples: objs.map((v) => JSON.stringify(v)),
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: 'typescript',
    inferMaps: false,
    rendererOptions: {
      'just-types': true,
      'no-interfaces': true,
      'explicit-unions': true,
      'prefer-unions': false,
    },
  });

  return lines.join('\n');
}

// Converts an arbitrary JSON object to a TypeScript interface (ts morph format)
export function getInterfaceForJson(json: any): string {
  return getJsonType(json, {
    multiline: true,
  });
}

/**
 * This takes in a theme object and generates a TypeScript type to account for any
 * custom properties the user may have defined in their theme.
 *
 * If the user has defined multiple themes, any properties that are not defined in all themes
 * will be marked as optional in the generated types
 */
export async function getThemeDefinition(
  config: ParsedConfig
): Promise<string> {
  const allThemeObjects = constructThemes(
    config.theme,
    config.additionalThemes
  );

  const appThemeInterface = await generateTypeInterfaceFromObjects(
    Object.values(allThemeObjects),
    'AppTheme'
  );

  if (config.options?.mode === 'unistyles') {
    const themeNames = Object.keys(allThemeObjects);

    const themeEntries = themeNames
      .map((name) => `  ${name}: AppTheme;`)
      .join('\n');

    const appThemesType = `
export declare const themes: {
${themeEntries}
};`;

    const appBreakpointsType = `
export declare const breakpoints: {
${Object.entries(config.breakpoints ?? {})
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}`;

    return `${appThemeInterface}${appThemesType}\n${appBreakpointsType}`;
  }

  const appThemeType = `
export declare const theme: AppTheme;`;

  const appBreakpointsType = `
export declare const breakpoints: {
${Object.entries(config.breakpoints ?? {})
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}`;

  return `${appThemeInterface}${appThemeType}\n${appBreakpointsType}`;
}
