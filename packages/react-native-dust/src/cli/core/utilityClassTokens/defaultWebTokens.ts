import type { styleToken } from './types.js';

export const defaultWebTokens: styleToken[] = [
  // Default sizing tokens
  {
    key: 'web_fixed',
    values: [['position', '"fixed"', '"fixed"']],
  },
  {
    key: 'web_sticky',
    values: [['position', '"sticky"', '"sticky"']],
  },
  // min-content properties
  {
    key: 'web_w_min_content',
    values: [['width', '"min-content"', '"min-content"']],
  },
  {
    key: 'web_h_min_content',
    values: [['height', '"min-content"', '"min-content"']],
  },
  {
    key: 'web_min_w_min_content',
    values: [['minWidth', '"min-content"', '"min-content"']],
  },
  {
    key: 'web_min_h_min_content',
    values: [['minHeight', '"min-content"', '"min-content"']],
  },
  {
    key: 'web_max_w_min_content',
    values: [['maxWidth', '"min-content"', '"min-content"']],
  },
  {
    key: 'web_max_h_min_content',
    values: [['maxHeight', '"min-content"', '"min-content"']],
  },
  // max-content
  {
    key: 'web_w_max_content',
    values: [['width', '"max-content"', '"max-content"']],
  },
  {
    key: 'web_h_max_content',
    values: [['height', '"max-content"', '"max-content"']],
  },
  {
    key: 'web_min_w_max_content',
    values: [['minWidth', '"max-content"', '"max-content"']],
  },
  {
    key: 'web_min_h_max_content',
    values: [['minHeight', '"max-content"', '"max-content"']],
  },
  {
    key: 'web_max_w_max_content',
    values: [['maxWidth', '"max-content"', '"max-content"']],
  },
  {
    key: 'web_max_h_max_content',
    values: [['maxHeight', '"max-content"', '"max-content"']],
  },
];
