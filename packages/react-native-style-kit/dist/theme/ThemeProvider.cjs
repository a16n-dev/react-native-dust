const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_ThemeContext = require('./ThemeContext.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/theme/ThemeProvider.tsx
function ThemeProvider({ theme, children }) {
	const value = { theme };
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeContext.ThemeContext.Provider, {
		value,
		children
	});
}

//#endregion
exports.ThemeProvider = ThemeProvider;