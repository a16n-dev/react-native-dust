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

/** @type {import('dust').Config} */
export default {
  theme: {
    light: {
      colors: {},
      spacing: {},
      borderRadius: {},
      fontSize: {},
    },
  },
};
`;

  writeFileSync(configPath, configContent);
  console.log("Created dust.config.js");
}
