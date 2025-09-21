import { loadConfig } from "../core/loadConfig";
import { collectUsedUtilityStyles } from "../core/analyse";
import { generateStyles } from "../core/generateStyles";

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const whitelist = await collectUsedUtilityStyles(config);

  await generateStyles(config, whitelist);
}
