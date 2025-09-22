import { loadConfig } from '../core/loadConfig';
import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles';
import { runCodegen } from '../core/runCodegen';

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const whitelist = await collectUsedUtilityStyles(config);

  await runCodegen(config, whitelist);
}
