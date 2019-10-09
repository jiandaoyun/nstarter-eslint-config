module.exports = {
    rules: {
        /**
         * 现阶段不要求 setter 必须有对应的 getter，getter 可以没有对应的 setter。取决于具体业务需要。
         * 待开闭原则确定后启用。
         */
        'accessor-pairs': 'off'
    }
};
