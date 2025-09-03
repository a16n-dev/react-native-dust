import { getThemeDefinition } from "./getThemeDefinitionType";
import { writeUIFile } from "../uiWriter";
import { loadConfig } from "../loadConfig";
import { Config } from "../../types";
import { getDefaultTokens } from "../utilityClassTokens/getDefaultTokens";
import { getThemeTokens } from "../utilityClassTokens/getThemeTokens";

async function generateUnistylesConfigFile(config: Config) {
  const themeDefinition = await getThemeDefinition(config.theme);

  // Generate Unistyles configuration file
  const unistylesContent = `import { UnistylesRegistry } from 'react-native-unistyles';

const themes = ${JSON.stringify(config.theme, null, 2)};

UnistylesRegistry.addThemes(themes);

export {};
`;

  // Generate Unistyles TypeScript declaration file
  const unistylesDtsContent = `${themeDefinition}

// React Native Unistyles integration
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

export {};
`;

  await writeUIFile("unistyles.js", unistylesContent);
  await writeUIFile("unistyles.d.ts", unistylesDtsContent);
}

async function generateTokensFile(config: Config): Promise<void> {
  const defaultTokens = getDefaultTokens();
  const themeTokens = getThemeTokens(config.theme);

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
