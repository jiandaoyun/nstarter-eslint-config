module.exports = {
    rules: {
        /**
         * 统一成员属性的分隔符形式
         * 对于对象或 Interface 声明，使用 ;。对于 type 声明使用 ,。
         * @reason 统一代码风格
         */
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                },
                overrides: {
                    typeLiteral: {
                        multiline: {
                            delimiter: 'comma',
                            requireLast: false
                        },
                        singleline: {
                            delimiter: 'comma',
                            requireLast: false
                        }
                    }
                }
            }
        ]
    }
};
