module.exports = {
  rules: {
    /**
     * 禁止使用指定的类型
     * 不使用 Object, String, Number, Boolean 类型，而使用原生的 ts 类型，允许使用 Function 用于装饰器包装
     * @reason 统一代码风格
     */
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Function: false,
          Object: {
            message: "Use '{}' instead",
            fixWith: '{}',
          },
          String: {
            message: "Use 'string' instead",
            fixWith: 'string',
          },
          Number: {
            message: "Use 'number' instead",
            fixWith: 'number',
          },
          Boolean: {
            message: "Use 'boolean' instead",
            fixWith: 'boolean',
          },
        },
      },
    ],
  },
};
