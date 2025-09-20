import { loadConfig } from "../core/loadConfig";
import { generateStyles } from "../core/generate/generate";

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  await generateStyles(config);
}
