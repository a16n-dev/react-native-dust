import { ThemeContext } from "./ThemeContext.js";
import { useContext } from "react";

//#region src/theme/useTheme.tsx
function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
	return ctx.theme;
}

//#endregion
export { useTheme };