import { getThemeDefinition } from "./getThemeDefinitionType";
import { Config } from "../../config";
import { writeLibFile } from "./uiWriter";
import { getDefaultTokens } from "./utilityClassTokens/getDefaultTokens";
import { getThemeTokens } from "./utilityClassTokens/getThemeTokens";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`;
  return `${Math.round(bytes / (1024 * 1024))}mb`;
}

async function generateThemesFile(config: Config) {
  // Generate Unistyles configuration file

  if (config.options?.mode === "unistyles") {
    const unistylesContent = `

const themes = ${JSON.stringify(config.themes, null, 2)};

const breakpoints = ${JSON.stringify(config.breakpoints ?? {}, null, 2)};

export { themes, breakpoints };
`;
    await writeLibFile("theme.js", unistylesContent, true);
  } else {
    const themesContent = `

const theme = ${JSON.stringify(config.themes[Object.keys(config.themes)[0]], null, 2)};

const breakpoints = ${JSON.stringify(config.breakpoints ?? {}, null, 2)};

export { theme, breakpoints };
`;
    await writeLibFile("theme.js", themesContent, true);
  }

  const unistylesDtsContent = await getThemeDefinition(config);
  await writeLibFile("theme.d.ts", unistylesDtsContent);
}

async function generateTokensFile(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  const defaultTokens = getDefaultTokens(config, whitelist);
  const themeTokens = getThemeTokens(config.themes, whitelist);

  const tokens = [...defaultTokens, ...themeTokens];

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
  ${tokens.map(({ key, values }) => `${key}: { ${values.map((v) => `${v[0]}: ${v[2] ?? "any"}`).join(";")} }`).join(";\n  ")};
};

export declare const t: TokenStyles;`;

  const jsFileSize = Buffer.byteLength(tokensFile, "utf8");

  if (whitelist) {
    console.log(
      `Generating minified tokens file (${tokens.length} tokens / ${formatFileSize(jsFileSize)})`,
    );
  } else {
    console.log(
      `Generating complete tokens file (${tokens.length} tokens / ${formatFileSize(jsFileSize)})`,
    );
  }

  await writeLibFile("tokens.js", tokensFile, true);
  await writeLibFile("tokens.d.ts", tokensTypesFile);
}

async function generateBarrelFile() {
  const barrelContent = `export * from './theme';
export * from './tokens';
`;
  await writeLibFile("index.js", barrelContent, true);
  // Write a typescript declaration file for the barrel
  await writeLibFile("index.d.ts", barrelContent);
}

export async function generateStyles(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  await generateThemesFile(config);
  await generateTokensFile(config, whitelist);
  await generateBarrelFile();
}
