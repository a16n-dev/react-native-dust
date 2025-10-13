const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_ThemeContext = require('./ThemeContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/theme/useTheme.tsx
function useTheme() {
	const ctx = (0, react.useContext)(require_ThemeContext.ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
	return ctx.theme;
}

//#endregion
exports.useTheme = useTheme;