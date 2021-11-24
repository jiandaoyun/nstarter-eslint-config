module.exports = {
  rules: {
    /**
     * 禁止保留未使用的模块依赖
     * @reason 避免产生循环依赖的问题。
     */
    'import/no-unused-modules': 'error',
  },
};
