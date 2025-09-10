export type styleToken = {
  /**
   * the name of the token
   */
  key: string;
  /**
   * All of the properties this token applies
   * Each entry is a tuple of [property, value]
   *
   * Value should be a string of the JS to use for the property value.
   * Ie. strings should be double quoted: '"value"'
   */
  values: [property: string, value: string][];
  web?: boolean;
};
