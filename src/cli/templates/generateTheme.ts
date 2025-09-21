import { Project, VariableDeclarationKind } from "ts-morph";
import { Config } from "../../config";

export interface GeneratedFiles {
  js: string;
  dts: string;
}

export function generateTheme(config: Config): GeneratedFiles {
  const project = new Project({ useInMemoryFileSystem: true });
  const jsFile = project.createSourceFile("theme.js", "");
  const dtsFile = project.createSourceFile("theme.d.ts", "");

  const isUnistyles = config.options?.mode === "unistyles";

  // Generate JS exports
  if (isUnistyles) {
    jsFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{ name: "themes", initializer: JSON.stringify(config.themes, null, 2) }],
    });
  } else {
    const firstTheme = config.themes[Object.keys(config.themes)[0]];
    jsFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{ name: "theme", initializer: JSON.stringify(firstTheme, null, 2) }],
    });
  }

  jsFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [{ name: "breakpoints", initializer: JSON.stringify(config.breakpoints ?? {}, null, 2) }],
  });

  // Generate TypeScript declarations
  if (isUnistyles) {
    const themeNames = Object.keys(config.themes);
    const themeEntries = themeNames.map((name) => `  ${name}: AppTheme;`).join("\n");

    dtsFile.addVariableStatement({
      hasDeclareKeyword: true,
      isExported: true,
      declarations: [{ name: "themes", type: `{\n${themeEntries}\n}` }],
    });
  } else {
    dtsFile.addVariableStatement({
      hasDeclareKeyword: true,
      isExported: true,
      declarations: [{ name: "theme", type: "AppTheme" }],
    });
  }

  const breakpointEntries = Object.entries(config.breakpoints ?? {})
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  dtsFile.addVariableStatement({
    hasDeclareKeyword: true,
    isExported: true,
    declarations: [{ name: "breakpoints", type: `{\n${breakpointEntries}\n}` }],
  });

  return {
    js: jsFile.getFullText(),
    dts: dtsFile.getFullText(),
  };
}