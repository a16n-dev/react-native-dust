import { loadConfig } from '../core/config/loadConfig.js';
import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles.js';
import { runCodegen } from '../core/runCodegen.js';

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const whitelist = await collectUsedUtilityStyles(config);

  await runCodegen(config, whitelist);
}
