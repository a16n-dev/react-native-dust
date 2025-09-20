import { loadConfig } from "../core/loadConfig";
import { collectUsedUtilitySyles } from "../core/analyse/analyse";
import { generateStyles } from "../core/generate/generate";

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const whitelist = await collectUsedUtilitySyles(config);

  await generateStyles(config, whitelist);
}
