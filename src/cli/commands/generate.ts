import { runCodegen } from '../core/runCodegen';
import { loadConfig } from '../core/config/loadConfig';

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  await runCodegen(config);
}
