import { loadConfig } from "../core/loadConfig";
import { generateStyles } from "../core/generateStyles";

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  await generateStyles(config);
}
