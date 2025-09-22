import { loadConfig } from '../core/loadConfig';
import { collectUsedUtilityStyles } from '../core/collectUsedUtilityStyles';
import { constructCodegenProject, runCodegen } from '../core/runCodegen';
import { getProjectRoot, writeGeneratedExportFiles } from '../core/uiWriter';
import { CLI_DIR_ROOT, LIB_DIR_ROOT } from '../root';

/**
 * Allows the user to export the generated lib into their project as TS source files
 * This is useful either for debugging, or if the user wants to customise the generated
 * code outside the scope of what the library supports
 */
export async function exportCommand(configPath?: string) {
  const config = loadConfig(configPath);

  const result = await constructCodegenProject({ config });

  const errors = result.typeCheck();

  if (errors) {
    console.error(errors);
    process.exit(1);
  }

  const sourceFiles = result.getSourceFiles();

  await writeGeneratedExportFiles(sourceFiles);
}
