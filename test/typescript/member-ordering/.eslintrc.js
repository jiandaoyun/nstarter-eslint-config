module.exports = {
    rules: {
        /**
         * 成员属性定义过程的指导性顺序约束
         * 不做强制性要求
         * @reason 优先级：
         * 1. static > instance
         * 2. field > constructor > method
         * 3. public > protected > private
         */
        '@typescript-eslint/member-ordering': [
            'warn',
            {
                default: [
                    // Fields
                    'static-field',
                    'instance-field',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    // Methods
                    'private-static-method',
                    'protected-static-method',
                    'public-static-method'
                ]
            }
        ]
    }
};
