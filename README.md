# Dynamic Utility Style Tokens (dust)

[![npm](https://img.shields.io/npm/v/react-native-dust)](https://www.npmjs.com/package/react-native-dust)
[![Types](https://img.shields.io/npm/types/react-native-dust.svg)](https://www.npmjs.com/package/react-native-dust)

Dust is a small toolkit for using utility classes in React Native, similar to TailwindCSS. It's built as a thin layer on top of [Unistyles](https://www.unistyl.es/v3/start/introduction).

```tsx
<View style={[t.bg_blue_100, t.pt_safe, t.flex_row]}>
  <Text style={[t.text_xl, t.text_blue_500]}>Hello World</Text>
</View>
```

## Features
 - Tree-shakeable: Only bundle the styles you use into your build
 - Type-safe: Full TypeScript support with autocompletion
 - Deep Unistyles integration: Use all of unistyles features like themes, responsive styles, and more

### Quick start

1. Follow the installation instructions for Unistyles [here](https://www.unistyl.es/v3/start/getting-started)

2. Install dust via your package manager of choice:
```bash
pnpm i react-native-dust
```

3. Setup your `dust.config.js` file:
```bash
pnpm dust init
```
This will create a `dust.config.js` file in your project root with a default configuration.

4. Update your babel config
```ts

plugins: [
  ['react-native-unistyles/plugin', {
    root: 'src',
    autoProcessPaths: ['react-native-dust'] // <- Add react-native-dust to autoProcessPaths
  }]  
]
```

5. Update your unistyles initialization file:
```ts
import { StyleSheet } from 'react-native-unistyles';
import { themes } from 'react-native-dust/theme';

type ThemesType = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends ThemesType {}
}

StyleSheet.configure({
  themes,
});

```

6. Start using dust in your components:
```tsx
import { t } from 'react-native-dust/tokens'; 

...

<View style={[ t.flex_row, t.p_safe ]}/>
```