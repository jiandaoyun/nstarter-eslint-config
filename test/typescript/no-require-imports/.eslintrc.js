module.exports = {
  rules: {
    /**
     * 禁止使用 require
     * 原则上禁止动态引用，对于循环依赖，通过 IOC 的方式解决。
     * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
     */
    '@typescript-eslint/no-require-imports': 'error',
  },
};
