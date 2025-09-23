import { expectTypeOf, test } from 'vitest';
import type { Config, DustTheme, ExtendedDustTheme } from '../../../config.js';
import type {
  InputConfig,
  InputExtendedTheme,
  InputTheme,
} from './configSchema.js';

test('config type Config should be compatible with zod schema type', () => {
  expectTypeOf<Config>().toExtend<InputConfig>();
});

test('config type DustTheme should be compatible with zod schema type', () => {
  expectTypeOf<DustTheme>().toExtend<InputTheme>();
});

test('config type ExtendedDustTheme should be compatible with zod schema type', () => {
  expectTypeOf<ExtendedDustTheme>().toExtend<InputExtendedTheme>();
});
