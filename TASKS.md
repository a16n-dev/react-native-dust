# Dust CLI Development Tasks

## In Progress

### Improve Code Generation
- **Context**: Currently using string templates for generating JS/TS files in `cli/generate.ts`
- **Goal**: Consider upgrading to more robust code generation approach
- **Options researched**:
  - **ts-morph**: TypeScript-first, great API, type-safe generation
  - **astring**: High performance (380x faster than Prettier), tiny footprint
  - **ESTemplate + ESCodegen**: AST-based templating with source maps
  - **Built-in TypeScript Compiler API**: `ts.createPrinter()` for official support
- **Current status**: String templates work but could be more maintainable
- **Priority**: Medium - current implementation functional but could be improved

## Completed

### Basic CLI Structure ✅
- Set up Commander.js for CLI framework
- Created `generate` command with config file support
- Added support for .js, .ts, and .json config files using jiti

### Config Loading ✅ 
- Implemented smart config file detection (duck.config.ts → duck.config.js → duck.config.json)
- Used jiti for universal config loading (handles all file types)
- Added proper error handling and user-friendly messages

### UI File Generation ✅
- Generate `ui/index.js` and `ui/index.d.ts` files from config
- Set up proper package.json exports for `duck/ui` imports
- Added TypeScript declaration files for type support
- Fixed path resolution to generate files in package directory

### Type System ✅
- Created DustTheme and Config types
- Updated Config type: `theme: Record<string, DustTheme>` (supports multiple themes)
- Export types from main package for user consumption

## Planned

### Enhanced Generation Features
- Support for generating UI components from config
- Template system for customizable output
- Watch mode for config file changes
- Validation for config file structure

### Developer Experience
- Add init command to scaffold config files
- Better error messages with suggestions
- Progress indicators for generation process
- Dry-run mode to preview changes

### Documentation
- Usage examples and tutorials
- API documentation for generated files
- Migration guides for config changes

---

*Last updated: 2025-09-03*