module.exports = {
  extends: ['./index.js', './typescript.js'],
  globals: {
    Prism: false,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
