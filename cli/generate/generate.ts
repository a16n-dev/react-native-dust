import { getThemeDefinition } from "./getThemeDefinitionType";
import { writeUIFile } from "../uiWriter";
import { loadConfig } from "../loadConfig";
import { Config } from "../../types";
import { getDefaultTokens } from "../utilityClassTokens/getDefaultTokens";
import { getThemeTokens } from "../utilityClassTokens/getThemeTokens";
import * as babel from "@babel/core";

async function generateUnistylesConfigFile(config: Config) {
  // Generate Unistyles configuration file
  const unistylesContent = `

const themes = ${JSON.stringify(config.themes, null, 2)};

const breakpoints = ${JSON.stringify(config.breakpoints ?? {}, null, 2)};

export { themes, breakpoints };
`;

  const unistylesDtsContent = await getThemeDefinition(config.themes);

  await writeUIFile("theme.js", unistylesContent);
  await writeUIFile("theme.d.ts", unistylesDtsContent);
}

async function generateTokensFile(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  const defaultTokens = getDefaultTokens(whitelist);
  const themeTokens = getThemeTokens(config.themes, whitelist);

  const tokens = [...defaultTokens, ...themeTokens];

  console.log(`Generating complete tokens file (${tokens.length} tokens)`);

  const styles = tokens
    .map(({ key, values }) => `${key}: {${values.join(",")}}`)
    .join(",\n  ");

  const tokensFile = `import { StyleSheet } from 'react-native-unistyles';

export const t = StyleSheet.create((theme, runtime) => ({
  ${styles}
}));`;

  const tokensTypesFile = `export type TokenStyles = {
  ${tokens.map(({ key }) => `${key}: any`).join(";\n  ")};
};

export declare const t: TokenStyles;`;

  await writeUIFile("tokens.js", tokensFile);
  await writeUIFile("tokens.d.ts", tokensTypesFile);
}

export async function generate(configPath?: string): Promise<void> {
  const config = loadConfig(configPath);

  await generateUnistylesConfigFile(config);
  await generateTokensFile(config);
}
