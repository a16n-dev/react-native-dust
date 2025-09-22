import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles';
import { runCodegen } from '../core/runCodegen';
import { loadConfig } from '../core/config/loadConfig';

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const whitelist = await collectUsedUtilityStyles(config);

  await runCodegen(config, whitelist);
}
