module.exports = {
  rules: {
    /**
     * 禁止使用默认导出模块。
     * @reason 默认导出会允许被引用时重命名，不便于重构与统一目标对象理解。
     * 不过对于 npm 模块的最外层封装，建议使用默认导出。
     */
    'import/no-default-export': 'error',
  },
};
