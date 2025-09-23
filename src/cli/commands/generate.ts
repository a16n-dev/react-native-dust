import { loadConfig } from '../core/config/loadConfig.js';
import { runCodegen } from '../core/runCodegen.js';

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  await runCodegen(config);
}
