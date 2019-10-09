module.exports = {
    rules: {
        /**
         * 注释的斜线或 * 后必须有空格
         * 特殊规则，nstarter 模板中的代码块声明标签必须与注释符号相连。
         * @reason 提升可读性
         */
        'spaced-comment': [
            'error',
            'always',
            {
                block: {
                    exceptions: ['#alt', '#endalt'],
                    markers: ['#', '#module', '#endmodule']
                }
            }
        ]
    }
};
