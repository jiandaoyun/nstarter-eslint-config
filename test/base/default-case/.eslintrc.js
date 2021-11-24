module.exports = {
  rules: {
    /**
     * switch 语句必须有 default
     * @reason 避免部分场景下未调用 callback
     */
    'default-case': 'error',
  },
};
