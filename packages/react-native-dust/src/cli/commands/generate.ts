import { loadConfig } from '../core/config/loadConfig.js';
import { runCodegen } from '../core/runCodegen.js';
import { logger } from '../logger/logger.js';
import { c } from '../logger/format.js';

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const start = Date.now();

  if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
    logger.warn(
      c.yellow(
        'Warning: Production/CI environment detected. "dust generate" is intended for local development. Did you mean to run `dust build` instead? '
      )
    );
  }

  logger.info(
    `Generating dust tokens styleSheet (` +
      c.orange.bold(config.options.mode) +
      ')'
  );

  await runCodegen(config);

  const end = Date.now();

  logger.info('Done in ' + c.green(((end - start) / 1000).toFixed(2) + 's'));
}
