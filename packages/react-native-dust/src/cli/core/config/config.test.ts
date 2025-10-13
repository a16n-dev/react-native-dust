import { expectTypeOf, test } from 'vitest';
import type { Config, DustTheme } from '../../../config.js';
import type { InputConfig, InputTheme } from './configSchema.js';

test('config type Config should be compatible with zod schema type', () => {
  expectTypeOf<Config>().toExtend<InputConfig>();
});

test('config type DustTheme should be compatible with zod schema type', () => {
  expectTypeOf<DustTheme>().toExtend<InputTheme>();
});
