module.exports = {
    rules: {
        /**
         * 可以简写为函数类型的接口或字面类型的话，则必须简写
         * @reason 不要求函数类型接口的简写，因为可读性并不好。
         */
        '@typescript-eslint/prefer-function-type': 'off'
    }
};
