import { loadConfig } from '../core/loadConfig';
import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles';
import { constructCodegenProject, runCodegen } from '../core/runCodegen';
import { writeGeneratedExportFiles } from '../core/uiWriter';

/**
 * Allows the user to export the generated lib into their project as TS source files
 * This is useful either for debugging, or if the user wants to customise the generated
 * code outside the scope of what the library supports
 */
export async function exportCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const result = constructCodegenProject({ config });

  const sourceFiles = result.getSourceFiles();

  await writeGeneratedExportFiles(sourceFiles);
}
