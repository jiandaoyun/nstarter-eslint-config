module.exports = {
  rules: {
    /**
     * 禁止在类之外的地方使用 this
     * @reason 会与 typescript 的类属性检测冲突
     */
    'no-invalid-this': 'off',
  },
};
