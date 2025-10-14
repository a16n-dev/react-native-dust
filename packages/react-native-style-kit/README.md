# React Native Style Kit

A very minimal styling API for react native that provides:

- 🧩 Component variants/compound variants inspired by CVA
- 🎨 Theming & theme switching
- 📱 Breakpoints
- 📏 Access to safe area insets

This library is intended to provide a set of foundational tools for building design systems & component libraries while remaining as unopinionated as possible. 

## Concepts

### Creating styles

Styles are created via the `makeUseStyles()` which is a replacement for `StyleSheet.create()`. This function returns a hook you can call within your component to access the styles.

```tsx

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

You can then create styles that access the theme via the `makeUseStyles()` function. This function returns a hook you can call within your component
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

Within your style definition, you can define variants for each style that apply different styles based on some set of props.

```tsx
import { makeUseStyles } from 'react-native-style-kit';

interface ButtonVariants {
    variant: 'outlined' | 'filled';
}

const useStyles = makeUseStyles<ButtonVariants>()(() => ({
  root: {
    variants: {
      outlined: { ... }, 
      filled: { ... },
    }  
  }
}));

const Button = ({ variant }: ButtonVariants) => {
    const styles = useStyles({ variant });
    
    return <Pressable style={styles.root}/>
}
```

### Compound variants

You can also define compound variants that apply when multiple variant conditions are met
```tsx