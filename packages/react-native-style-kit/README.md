# React Native Style Kit

A very minimal styling API for react native that provides:

- 🧩 Component variants/compound variants inspired by CVA
- 🎨 Theming & theme switching
- 📱 Breakpoints
- 📏 Access to safe area insets
- 📦 No babel/metro plugin required

This library is intended to provide a set of foundational tools for building design systems & component libraries. It purposefully avoids any interoperability layer to maximise compatibility with 3rd party libraries & components.

## Installation

Start by installing the package
```bash
pnpm install react-native-style-kit
```

Then you'll need to wrap your app in `<StyleKitProvider>`. This provides global values such as theme, safe areas, etc... to style hooks:

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

Styles are created via the `makeUseStyles()` which is a drop-in replacement for `StyleSheet.create()`. This function returns a hook you can call within your component to access the styles.

```tsx
import { makeUseStyles } from 'react-native-style-kit';

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

If you're using TypeScript, you can augment the theme type globally
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

Styles are memoized and cached to ensure they are only recalculated when absolutely necessary. Computed styles are also passed to `StyleSheet.create()` to take advantage of its own optimisations.
