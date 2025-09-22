import { loadConfig } from '../core/loadConfig';
import { runCodegen } from '../core/runCodegen';

export async function generateCommand(configPath?: string) {
  const config = loadConfig(configPath);

  await runCodegen(config);
}
