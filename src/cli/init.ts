import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

export function init(): void {
  const configPath = resolve(process.cwd(), "dust.config.js");

  if (existsSync(configPath)) {
    console.log("dust.config.js already exists");
    return;
  }

  const configContent = `// Dust configuration file
// @ts-check

/** @type {import('react-native-dust').Config} */
export default {
  theme: {
    light: {
      colors: {
        primary: {
          100: '#1D3208',
          200: '#38691E',
          300: '#577E34',
          400: '#7FBF5F',
          500: '#AFE67F',
        },
        neutral: {
          100: '#131218',
          200: '#2A292F',
          300: '#49484F',
          400: '#8A8C88',
          500: '#FFFFFF',
        }
      },
      spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
      },
      borderRadius: {},
      shadow: {},
    },
  },
};
`;

  writeFileSync(configPath, configContent);
  console.log("Created dust.config.js");
}
