import { loadConfig } from "../core/loadConfig";
import { generateStyles } from "../core/generate/generate";

export async function generate(configPath?: string) {
  const config = loadConfig(configPath);

  await generateStyles(config);
}
