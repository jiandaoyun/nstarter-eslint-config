module.exports = {
  extends: ['../base/.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-magic-numbers': 'off',
    'no-unused-vars': 'off',
  },
};
