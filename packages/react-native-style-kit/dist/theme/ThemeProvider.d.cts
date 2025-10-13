import { StyleKitTheme } from "./ThemeContext.cjs";
import { PropsWithChildren } from "react";
import * as react_jsx_runtime0 from "react/jsx-runtime";

//#region src/theme/ThemeProvider.d.ts
interface ThemeProviderProps extends PropsWithChildren {
  theme: StyleKitTheme;
}
declare function ThemeProvider({
  theme,
  children
}: ThemeProviderProps): react_jsx_runtime0.JSX.Element;
//#endregion
export { ThemeProvider, ThemeProviderProps };