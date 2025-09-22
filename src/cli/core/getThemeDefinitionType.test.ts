import { expect, test } from 'vitest';
import { generateTypeInterfaceFromObjects } from './getThemeDefinitionType';

test('Generates a type inline correctly', async () => {
  const result = await generateTypeInterfaceFromObjects(
    [
      {
        colors: {
          blue: {
            light: '#0000FF',
            default: '#0000CD',
            dark: '#00008B',
          },
          red: {
            light: '#FFA07A',
            default: '#FF0000',
            dark: '#8B0000',
          },
        },
      },
    ],
    'Example'
  );

  console.log(result);

  expect(result).toMatchSnapshot();
});
