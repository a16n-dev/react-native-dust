import { Config } from "../../config";
import { writeLibFile } from "./uiWriter";
import { generateTheme } from "../templates/generateTheme";
import { generateTokens, getTokensCount } from "../templates/generateTokens";
import { generateBarrel } from "../templates/generateBarrel";
import { getThemeDefinition } from "./getThemeDefinitionType";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`;
  return `${Math.round(bytes / (1024 * 1024))}mb`;
}

async function generateThemesFile(config: Config) {
  const { js, dts } = generateTheme(config);

  await writeLibFile("theme.js", js, true);

  const themeDefinition = await getThemeDefinition(config);
  await writeLibFile("theme.d.ts", themeDefinition);
}

async function generateTokensFile(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  const { js, dts } = generateTokens(config, whitelist);

  const tokensCount = getTokensCount(config, whitelist);
  const jsFileSize = Buffer.byteLength(js, "utf8");

  if (whitelist) {
    console.log(
      `Generating minified tokens file (${tokensCount} tokens / ${formatFileSize(jsFileSize)})`,
    );
  } else {
    console.log(
      `Generating complete tokens file (${tokensCount} tokens / ${formatFileSize(jsFileSize)})`,
    );
  }

  await writeLibFile("tokens.js", js, true);
  await writeLibFile("tokens.d.ts", dts);
}

async function generateBarrelFile() {
  const { js, dts } = generateBarrel();

  await writeLibFile("index.js", js, true);
  await writeLibFile("index.d.ts", dts);
}

export async function generateStyles(
  config: Config,
  whitelist?: string[],
): Promise<void> {
  await generateThemesFile(config);
  await generateTokensFile(config, whitelist);
  await generateBarrelFile();
}
