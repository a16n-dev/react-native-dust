import { ThemeContext } from "./ThemeContext.js";
import { jsx } from "react/jsx-runtime";

//#region src/theme/ThemeProvider.tsx
function ThemeProvider({ theme, children }) {
	const value = { theme };
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value,
		children
	});
}

//#endregion
export { ThemeProvider };