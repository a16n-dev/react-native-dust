import { getThemeDefinition } from "./getThemeDefinitionType";
import { writeUIFile } from "../uiWriter";
import { debug } from "../debug";
import { loadConfig } from "../loadConfig";

export async function generate(configPath?: string): Promise<void> {
  const config = loadConfig(configPath);

  // Generate basic index.js file
  const indexContent = `export const theme = ${JSON.stringify(config.theme, null, 2)};

// Add your generated UI components here
export default {
  theme
};
`;

  const themeDefinition = await getThemeDefinition(config.theme);

  // Generate Unistyles configuration file
  const unistylesContent = `import { UnistylesRegistry } from 'react-native-unistyles';

const themes = ${JSON.stringify(config.theme, null, 2)};

UnistylesRegistry.addThemes(themes);

export {};
`;

  // Generate Unistyles TypeScript declaration file
  const unistylesDtsContent = `import { DuckTheme } from '../types';

${themeDefinition}

// React Native Unistyles integration
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

export {};
`;

  await writeUIFile("index.js", indexContent);
  await writeUIFile("unistyles.js", unistylesContent);
  await writeUIFile("unistyles.d.ts", unistylesDtsContent);

  debug(
    "Generated Unistyles configuration with themes:",
    Object.keys(config.theme),
  );
}
