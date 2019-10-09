module.exports = {
    rules: {
        /**
         * 回调函数嵌套禁止超过 5 层
         */
        'max-nested-callbacks': ['error', { max: 5 }]
    }
};
