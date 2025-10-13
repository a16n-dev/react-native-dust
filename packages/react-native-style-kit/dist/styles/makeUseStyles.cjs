const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../theme/useTheme.cjs');
require("react-native");
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/styles/makeUseStyles.tsx
function makeUseStyles() {
	return function innerMakeUseStyles(styleDefinition) {
		const useStyles = (variants) => {
			const theme = require_useTheme.useTheme();
			return (0, react.useMemo)(() => {
				const withTheme = typeof styleDefinition === "function" ? styleDefinition(theme) : styleDefinition;
				if (!variants) return withTheme;
				for (const key in withTheme) {
					if ("variants" in withTheme[key]) {
						for (const variantKey in variants) for (const variantValue in variants[variantKey]) if (variantValue === variants[variantKey]) Object.assign(withTheme[key], withTheme[key].variants[variantKey][variantValue]);
						delete withTheme[key].variants;
					}
					if ("compoundVariants" in withTheme[key]) {
						withTheme[key].compoundVariants.forEach((variant) => {
							let allMatch = true;
							for (const variantKey in variant) {
								if (variantKey === "style") continue;
								if (variants[variantKey] !== variant[variantKey]) {
									allMatch = false;
									break;
								}
							}
							if (allMatch) Object.assign(withTheme[key], variant.style);
						});
						delete withTheme[key].compoundVariants;
					}
				}
				return withTheme;
			}, [theme, ...variants ? Object.values(variants) : []]);
		};
		return useStyles;
	};
}

//#endregion
exports.makeUseStyles = makeUseStyles;