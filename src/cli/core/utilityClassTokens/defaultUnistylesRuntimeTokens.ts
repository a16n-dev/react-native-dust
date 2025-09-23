import type { styleToken } from './types.js';

export const defaultUnistylesRuntimeTokens: styleToken[] = [
  // Safe area padding tokens
  {
    key: 'p_safe',
    values: [
      ['paddingTop', 'runtime.insets.top', 'number'],
      ['paddingBottom', 'runtime.insets.bottom', 'number'],
      ['paddingLeft', 'runtime.insets.left', 'number'],
      ['paddingRight', 'runtime.insets.right', 'number'],
    ],
  },
  {
    key: 'px_safe',
    values: [
      ['paddingLeft', 'runtime.insets.left', 'number'],
      ['paddingRight', 'runtime.insets.right', 'number'],
    ],
  },
  {
    key: 'py_safe',
    values: [
      ['paddingTop', 'runtime.insets.top', 'number'],
      ['paddingBottom', 'runtime.insets.bottom', 'number'],
    ],
  },
  { key: 'pt_safe', values: [['paddingTop', 'runtime.insets.top', 'number']] },
  {
    key: 'pb_safe',
    values: [['paddingBottom', 'runtime.insets.bottom', 'number']],
  },
  {
    key: 'pl_safe',
    values: [['paddingLeft', 'runtime.insets.left', 'number']],
  },
  {
    key: 'pr_safe',
    values: [['paddingRight', 'runtime.insets.right', 'number']],
  },

  // Safe area margin tokens
  {
    key: 'm_safe',
    values: [
      ['marginTop', 'runtime.insets.top', 'number'],
      ['marginBottom', 'runtime.insets.bottom', 'number'],
      ['marginLeft', 'runtime.insets.left', 'number'],
      ['marginRight', 'runtime.insets.right', 'number'],
    ],
  },
  {
    key: 'mx_safe',
    values: [
      ['marginLeft', 'runtime.insets.left', 'number'],
      ['marginRight', 'runtime.insets.right', 'number'],
    ],
  },
  {
    key: 'my_safe',
    values: [
      ['marginTop', 'runtime.insets.top', 'number'],
      ['marginBottom', 'runtime.insets.bottom', 'number'],
    ],
  },
  { key: 'mt_safe', values: [['marginTop', 'runtime.insets.top', 'number']] },
  {
    key: 'mb_safe',
    values: [['marginBottom', 'runtime.insets.bottom', 'number']],
  },
  { key: 'ml_safe', values: [['marginLeft', 'runtime.insets.left', 'number']] },
  {
    key: 'mr_safe',
    values: [['marginRight', 'runtime.insets.right', 'number']],
  },

  // Safe area positioning tokens
  { key: 'top_safe', values: [['top', 'runtime.insets.top', 'number']] },
  {
    key: 'bottom_safe',
    values: [['bottom', 'runtime.insets.bottom', 'number']],
  },
  { key: 'left_safe', values: [['left', 'runtime.insets.left', 'number']] },
  { key: 'right_safe', values: [['right', 'runtime.insets.right', 'number']] },
  {
    key: 'inset_safe',
    values: [
      ['top', 'runtime.insets.top', 'number'],
      ['bottom', 'runtime.insets.bottom', 'number'],
      ['left', 'runtime.insets.left', 'number'],
      ['right', 'runtime.insets.right', 'number'],
    ],
  },
];
