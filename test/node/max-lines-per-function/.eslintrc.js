module.exports = {
    rules: {
        /**
         * 限制函数块中的代码行数
         */
        'max-lines-per-function': [
            'error',
            {
                max: 50,
                skipComments: true,
                skipBlankLines: true
            }
        ]
    }
};
