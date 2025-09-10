import { getThemeDefinition } from "./getThemeDefinitionType";
import { writeUIFile } from "../uiWriter";
import { loadConfig } from "../loadConfig";
import { Config } from "../../types";
import { getDefaultTokens } from "../utilityClassTokens/getDefaultTokens";
import { getThemeTokens } from "../utilityClassTokens/getThemeTokens";

async function generateThemesFile(config: Config) {
  // Generate Unistyles configuration file

  if (config.options?.mode === "unistyles") {
    const unistylesContent = `

const themes = ${JSON.stringify(config.themes, null, 2)};

const breakpoints = ${JSON.stringify(config.breakpoints ?? {}, null, 2)};

export { themes, breakpoints };
`;
    await writeUIFile("theme.js", unistylesContent);
  } else {
    const themesContent = `

const theme = ${JSON.stringify(config.themes[Object.keys(config.themes)[0]], null, 2)};

const breakpoints = ${JSON.stringify(config.breakpoints ?? {}, null, 2)};

export { theme, breakpoints };
`;
    await writeUIFile("theme.js", themesContent);
  }

  const unistylesDtsContent = await getThemeDefinition(config);
  await writeUIFile("theme.d.ts", unistylesDtsContent);
}

async function generateTokensFile(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  const defaultTokens = getDefaultTokens(config, whitelist);
  const themeTokens = getThemeTokens(config.themes, whitelist);

  const tokens = [...defaultTokens, ...themeTokens];

  if (whitelist) {
    console.log(`Generating minified tokens file (${tokens.length} tokens)`);
  } else {
    console.log(`Generating complete tokens file (${tokens.length} tokens)`);
  }

  const styles = tokens
    .map(
      ({ key, values }) =>
        `${key}: {${values.map(([prop, val]) => `${prop}: ${val}`).join(",")}}`,
    )
    .join(",\n  ");

  let tokensFile: string;

  if (config.options?.mode === "unistyles") {
    tokensFile = `import { StyleSheet } from 'react-native-unistyles';

export const t = StyleSheet.create((theme, runtime) => ({
  ${styles}
}));`;
  } else {
    tokensFile = `import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const t = StyleSheet.create({
  ${styles}
})
    `;
  }
  const tokensTypesFile = `export type TokenStyles = {
  ${tokens.map(({ key, values }) => `${key}: { ${values.map((v) => `${v[0]}: any`).join(";")} }`).join(";\n  ")};
};

export declare const t: TokenStyles;`;

  await writeUIFile("tokens.js", tokensFile);
  await writeUIFile("tokens.d.ts", tokensTypesFile);
}

export async function generate(
  configPath?: string,
  whitelist?: string[],
): Promise<void> {
  const config = loadConfig(configPath);

  await generateThemesFile(config);
  await generateTokensFile(config, whitelist);
}
