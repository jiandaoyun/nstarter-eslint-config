module.exports = {
  /**
   * 建议使用 return await promise，利于调试与问题排查
   */
  rules: {
    '@typescript-eslint/return-await': ['warn', 'always'],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
};
