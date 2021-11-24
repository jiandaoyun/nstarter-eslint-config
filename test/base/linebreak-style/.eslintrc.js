module.exports = {
  rules: {
    /**
     * 要求统一使用 unix 风格的换行符
     * @reason 避免部分多行模板字符串在输出时产生连续换行问题
     */
    'linebreak-style': ['error', 'unix'],
  },
};
