module.exports = {
    rules: {
        /**
         * 必须使用 a = {b} 而不是 a = {b: b}
         * @reason 减少代码冗余
         */
        'object-shorthand': ['error', 'always']
    }
};
