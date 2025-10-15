# React Native Style Kit

Styling API for React Native, engineered as a foundational layer for building design systems and component libraries. What you get:

- 🧩 Variants/compound variants inspired by CVA
- 🎨 Theming & theme switching
- 📱 Breakpoint-based styles
- 📏 Access to runtime values (safe area insets, screen dimensions) in stylesheets

All with no babel/metro plugins, full compatibility with 3rd party components, and a focus on performance.

## Installation

You know the drill 😄
```bash
pnpm install react-native-style-kit
```


You're ready to go! Although if you want to access theme or runtime values in your stylesheets, you'll need to wrap your app in `<StyleKitProvider>`:

```tsx
import { StyleKitProvider } from 'react-native-style-kit';

const Main = () => {
  return (
    <StyleKitProvider>
      <App />
    </StyleKitProvider>
  );
}
```

## Concepts

### Creating styles

Styles are created via `makeUseStyles()` which is a drop-in replacement for `StyleSheet.create()`. This function returns a hook you can call within your component to access the styles.

```tsx
import { makeUseStyles } from 'react-native-style-kit';

// Note the double parentheses "()({...})" this is important
const useStyles = makeUseStyles()({
  root: {
    backgroundColor: 'white',
    padding: 16,
  }
});

const Button = () => {
    const styles = useStyles();
    
    return <Pressable style={styles.root}/>
}
```

### Theming

Wrap your app with theme provider, and pass it a theme object
```tsx
import { ThemeProvider } from 'react-native-style-kit';

const theme = {...};

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
```

You can then create styles that access the theme by passing a function to`makeUseStyles()`
```tsx
import { makeUseStyles } from 'react-native-style-kit';

const useStyles = makeUseStyles()((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  }
}));

const Button = () => {
    const styles = useStyles();
    
    return <Pressable style={styles.root}/>
}
```

You can also access the theme directly with the `useTheme()` hook.

```tsx
import { useTheme } from 'react-native-style-kit';
```

If you're using TypeScript, you'll need to augment the theme type to match the type of your theme
```tsx

type ThemeType = typeof theme;

declare module 'react-native-style-kit' {
    interface StyleKitTheme extends ThemeType {}
}
```


### Variants

To add variants, define a type for your variants, and pass it as a generic to `makeUseStyles()`. You can then define variant-specific styles within the `variants` key of your style definition.

Then, in the `useStyles()` hook within your component, pass it an object with the current variant values.

```tsx
import { makeUseStyles } from 'react-native-style-kit';

interface ButtonVariants {
    variant: 'outlined' | 'filled';
}

const useStyles = makeUseStyles<ButtonVariants>()({
  root: {
    variants: {
      outlined: { ... }, 
      filled: { ... },
    }  
  }
});

const Button = ({ variant = 'filled' }: Partial<ButtonVariants>) => {
  const styles = useStyles({ variant });
    
  return <Pressable style={styles.root}/>
}
```

### Compound variants

You can also define compound variants that apply when multiple variant conditions are met
```tsx
import { makeUseStyles } from 'react-native-style-kit';

interface ButtonVariants {
    variant: 'outlined' | 'filled';
    size: 'sm' | 'md' | 'lg';
}

const useStyles = makeUseStyles<ButtonVariants>()(() => ({
  root: {
    variants: {...},
    compoundVariants: [
      {
        size: 'sm',
        variant: 'outlined',
        style: { ... }
      }
    ]  
  }
}));
```

> Note: Compound variants are applied in the order they are defined, so later definitions will override earlier ones. Compound variants also take precedence over regular variants.

### Runtime values

You can also access runtime values such as screen dimensions or safe area insets within your stylesheets.

```tsx
import { makeUseStyles } from 'react-native-style-kit';

const useStyles = makeUseStyles()((_, rt) => ({
  root: {
    paddingTop: rt.insets.top,
  }
}));

const Button = () => {
  const styles = useStyles();
    
  return <Pressable style={styles.root}/>
}
```

### Performance
`react-native-style-kit` is designed to be as performant as possible without leveraging any compile-time optimisations. Only styles that depend on theme or runtime values subscribe to state updates (although in practice these are not likely to change often). 

Styles are memoized and cached to ensure they are only recalculated when absolutely necessary. Computed styles are also passed to `StyleSheet.create()` to take advantage of the optimisations provided by React Native.
