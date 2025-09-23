import { loadConfig } from '../core/config/loadConfig.js';
import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles.js';
import { runCodegen } from '../core/runCodegen.js';
import { logger } from '../logger/logger.js';
import { c } from '../logger/format.js';

export async function buildCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const start = Date.now();

  logger.info(
    `Generating production dust tokens styleSheet (` +
      c.orange.bold(config.options.mode) +
      ')'
  );

  const whitelist = await collectUsedUtilityStyles(config);

  logger.info(
    `${c.green(whitelist.length)} tokens in use. Creating a production bundle`
  );

  await runCodegen(config, whitelist);

  const end = Date.now();

  logger.info('Done in ' + c.green(((end - start) / 1000).toFixed(2) + 's'));
}
