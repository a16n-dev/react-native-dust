import type { styleToken } from './types.js';

export const defaultTokens: styleToken[] = [
  // Default sizing tokens
  { key: 'w_full', values: [['width', '"100%"', '"100%"']] },
  { key: 'h_full', values: [['height', '"100%"', '"100%"']] },
  { key: 'h_0', values: [['height', '0', '0']] },
  { key: 'w_0', values: [['width', '0', '0']] },

  // Flexbox tokens
  { key: 'flex_row', values: [['flexDirection', '"row"', '"row"']] },
  {
    key: 'flex_row_reverse',
    values: [['flexDirection', '"row-reverse"', '"row-reverse"']],
  },
  { key: 'flex_col', values: [['flexDirection', '"column"', '"column"']] },
  {
    key: 'flex_col_reverse',
    values: [['flexDirection', '"column-reverse"', '"column-reverse"']],
  },
  // Flex align items
  {
    key: 'items_start',
    values: [['alignItems', '"flex-start"', '"flex-start"']],
  },
  { key: 'items_center', values: [['alignItems', '"center"', '"center"']] },
  { key: 'items_end', values: [['alignItems', '"flex-end"', '"flex-end"']] },
  { key: 'items_stretch', values: [['alignItems', '"stretch"', '"stretch"']] },
  {
    key: 'items_baseline',
    values: [['alignItems', '"baseline"', '"baseline"']],
  },
  // Flex justify
  {
    key: 'justify_start',
    values: [['justifyContent', '"flex-start"', '"flex-start"']],
  },
  {
    key: 'justify_center',
    values: [['justifyContent', '"center"', '"center"']],
  },
  {
    key: 'justify_end',
    values: [['justifyContent', '"flex-end"', '"flex-end"']],
  },
  {
    key: 'justify_between',
    values: [['justifyContent', '"space-between"', '"space-between"']],
  },
  {
    key: 'justify_around',
    values: [['justifyContent', '"space-around"', '"space-around"']],
  },
  {
    key: 'justify_evenly',
    values: [['justifyContent', '"space-evenly"', '"space-evenly"']],
  },
  // Flex wrap
  { key: 'flex_wrap', values: [['flexWrap', '"wrap"', '"wrap"']] },
  { key: 'flex_nowrap', values: [['flexWrap', '"nowrap"', '"nowrap"']] },
  // Flex grow/shrink
  { key: 'flex_1', values: [['flex', '1', '1']] },
  { key: 'flex_grow_0', values: [['flexGrow', '0', '0']] },
  { key: 'flex_grow_1', values: [['flexGrow', '1', '1']] },
  { key: 'flex_shrink_0', values: [['flexShrink', '0', '0']] },
  { key: 'flex_shrink_1', values: [['flexShrink', '1', '1']] },
  // Align self tokens
  { key: 'self_stretch', values: [['alignSelf', '"stretch"', '"stretch"']] },
  {
    key: 'self_start',
    values: [['alignSelf', '"flex-start"', '"flex-start"']],
  },
  { key: 'self_center', values: [['alignSelf', '"center"', '"center"']] },
  { key: 'self_end', values: [['alignSelf', '"flex-end"', '"flex-end"']] },
  { key: 'self_baseline', values: [['alignSelf', '"baseline"', '"baseline"']] },
  // Flexbox shorthands
  {
    key: 'flex_center',
    values: [
      ['alignItems', '"center"', '"center"'],
      ['justifyContent', '"center"', '"center"'],
    ],
  },

  // Positioning tokens
  { key: 'absolute', values: [['position', '"absolute"', '"absolute"']] },
  { key: 'relative', values: [['position', '"relative"', '"relative"']] },
  {
    key: 'inset_0',
    values: [
      ['top', '0', '0'],
      ['right', '0', '0'],
      ['bottom', '0', '0'],
      ['left', '0', '0'],
    ],
  },
  {
    key: 'absolute_fill',
    values: [
      ['position', '"absolute"', '"absolute"'],
      ['top', '0', '0'],
      ['right', '0', '0'],
      ['bottom', '0', '0'],
      ['left', '0', '0'],
    ],
  },

  // Border tokens
  { key: 'border', values: [['borderWidth', '1', '1']] },
  { key: 'border_0', values: [['borderWidth', '0', '0']] },
  { key: 'border_t', values: [['borderTopWidth', '1', '1']] },
  { key: 'border_b', values: [['borderBottomWidth', '1', '1']] },
  { key: 'border_l', values: [['borderLeftWidth', '1', '1']] },
  { key: 'border_r', values: [['borderRightWidth', '1', '1']] },

  // Border radius tokens
  { key: 'rounded_0', values: [['borderRadius', '0', '0']] },
  {
    key: 'rounded_t_0',
    values: [
      ['borderTopLeftRadius', '0', '0'],
      ['borderTopRightRadius', '0', '0'],
    ],
  },
  {
    key: 'rounded_b_0',
    values: [
      ['borderBottomLeftRadius', '0', '0'],
      ['borderBottomRightRadius', '0', '0'],
    ],
  },
  {
    key: 'rounded_l_0',
    values: [
      ['borderTopLeftRadius', '0', '0'],
      ['borderBottomLeftRadius', '0', '0'],
    ],
  },
  {
    key: 'rounded_r_0',
    values: [
      ['borderTopRightRadius', '0', '0'],
      ['borderBottomRightRadius', '0', '0'],
    ],
  },
  { key: 'rounded_tl_0', values: [['borderTopLeftRadius', '0', '0']] },
  { key: 'rounded_tr_0', values: [['borderTopRightRadius', '0', '0']] },
  { key: 'rounded_bl_0', values: [['borderBottomLeftRadius', '0', '0']] },
  { key: 'rounded_br_0', values: [['borderBottomRightRadius', '0', '0']] },

  // Text tokens
  { key: 'text_center', values: [['textAlign', '"center"', '"center"']] },
  { key: 'text_left', values: [['textAlign', '"left"', '"left"']] },
  { key: 'text_right', values: [['textAlign', '"right"', '"right"']] },
  { key: 'text_justify', values: [['textAlign', '"justify"', '"justify"']] },

  // Overflow tokens
  { key: 'overflow_hidden', values: [['overflow', '"hidden"', '"hidden"']] },
  { key: 'overflow_visible', values: [['overflow', '"visible"', '"visible"']] },

  // Opacity tokens
  { key: 'opacity_0', values: [['opacity', '0', '0']] },
  { key: 'opacity_10', values: [['opacity', '0.1', '0.1']] },
  { key: 'opacity_25', values: [['opacity', '0.25', '0.25']] },
  { key: 'opacity_30', values: [['opacity', '0.3', '0.3']] },
  { key: 'opacity_40', values: [['opacity', '0.4', '0.4']] },
  { key: 'opacity_50', values: [['opacity', '0.5', '0.5']] },
  { key: 'opacity_60', values: [['opacity', '0.6', '0.6']] },
  { key: 'opacity_70', values: [['opacity', '0.7', '0.7']] },
  { key: 'opacity_75', values: [['opacity', '0.75', '0.75']] },
  { key: 'opacity_80', values: [['opacity', '0.8', '0.8']] },
  { key: 'opacity_90', values: [['opacity', '0.9', '0.9']] },
  { key: 'opacity_100', values: [['opacity', '1', '1']] },

  // Aspect ratio tokens
  { key: 'aspect_square', values: [['aspectRatio', '1', '"1 / 1"']] },
  { key: 'aspect_16_9', values: [['aspectRatio', '16 / 9', '"16 / 9"']] },
  { key: 'aspect_9_16', values: [['aspectRatio', '9 / 16', '"9 / 16"']] },
  { key: 'aspect_4_3', values: [['aspectRatio', '4 / 3', '"4 / 3"']] },
  { key: 'aspect_3_4', values: [['aspectRatio', '3 / 4', '"3 / 4"']] },
];
