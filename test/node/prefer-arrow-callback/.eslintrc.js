module.exports = {
    rules: {
        /**
         * 必须使用箭头函数作为回调
         * @reason 避免产生闭包中 this 指向的问题。
         * 特殊规则，允许有名称定义的函数使用。
         */
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true
            }
        ]
    }
};
