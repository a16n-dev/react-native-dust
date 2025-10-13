import { useTheme } from "../theme/useTheme.js";
import "react-native";
import { useMemo } from "react";

//#region src/styles/makeUseStyles.tsx
function makeUseStyles() {
	return function innerMakeUseStyles(styleDefinition) {
		const useStyles = (variants) => {
			const theme = useTheme();
			return useMemo(() => {
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
export { makeUseStyles };