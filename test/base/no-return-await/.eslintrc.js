module.exports = {
  rules: {
    /**
     * 禁止在 return 语句里使用 await
     *
     * @see https://eslint.org/docs/latest/rules/no-return-await
     * ECMA-262 行为变更，不再建议使用
     */
    'no-return-await': 'off',
  },
};
