const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/theme/ThemeContext.tsx
const ThemeContext = (0, react.createContext)(null);

//#endregion
exports.ThemeContext = ThemeContext;