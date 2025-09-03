import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

export function init(): void {
  const configPath = resolve(process.cwd(), "duck.config.js");

  if (existsSync(configPath)) {
    console.log("duck.config.js already exists");
    return;
  }

  const configContent = `// Duck configuration file
// @ts-check

/** @type {import('duck').DuckConfig} */
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
  console.log("Created duck.config.js");
}
