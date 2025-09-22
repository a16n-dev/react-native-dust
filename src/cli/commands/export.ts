import { constructCodegenProject } from '../core/runCodegen';
import { writeGeneratedExportFiles } from '../core/fileSystemHelpers';
import { loadConfig } from '../core/config/loadConfig';

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
