TODOs:
- [ ] Improve the `init` command: presets, ts-morph based file gen. Interactive wizard
- [x] Implement web utility classes when web mode is enabled 
- [x] Restructure project into a monorepo with a `packages/` directory 
- [ ] Initialise a docs site and map out what documentation pages are needed
- [ ] More robust build process, possibly with tsdown
- [ ] Breakpoint utility helper function
- [ ] `validate` command to validate dust config
- [x] ESLint setup for tighter code quality rules


Notes on dust going forward:

- simple is better. dust's job is to do 2 things really well:
1. generate a bunch of tokens from a theme. This is mostly a time-saving measure
2. Provide a way to tree-shake only used styles at runtime. 

on 1:
- ideally this should be as framework agnostic as possible. Maybe not 100% possible, but maybe the alternative is to let the user have more control over the code-gen part of the process. 

Ideally it looks something like this:
Dust generates a single 'tokens.ts' file to a location of the users choice (or any filename tbh)
This can be committed, ignored, or whatever doesn't matter. Different adapters for different frameworks.

There aren't many theme-specific tokens really:
- spacing/padding/margin
- colors (bg color, text color etc...)
- font (size, weight, family, line height etc...)
- border (width, radius, color etc...)
- shadows

Mode vanilla:
outputs a function `makeTokens` `(theme) => StyleSheet.create()` call. 
This lets the user pass in their theme where they need it

Mode unistyles:
outputs a unistyles stylesheet that reads from the theme `tokens = stylesheet.create()`

Mode style-kit:
Outputs a tokens hook `useTokens = makeUseStyles()(() => ({...}))`

Each adapter needs 2 things:
1. a generator that takes a theme and outputs the relevant code
2. a babel plugin for collecting used tokens at compile time

All these libs provide their own tools anyway, dust should focus purely on the utility stylesheet

babel plugin:
- can specify a "variable name" - defaults to "t". Any `t.[token_name]` will be collected as usage. This also allows for simple *string based* file search instead of a full AST parse. Simpler and with possible extra class names, but easier to implement too.

new dust config:
```ts

export default {
    "output":  "./path/to/tokens.ts",
    "type": "style-kit",
    "generate": {
            
        }
}
}
```
