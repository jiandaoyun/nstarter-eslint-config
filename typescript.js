/**
 * nstarter ESLint 规则
 * https://github.com/jiandaoyun/nstarter-eslint-config
 *
 * 贡献者：
 *
 *
 *
 * 依赖版本：
 *     eslint ^6.2.2
 *     babel-eslint ^10.0.1
 *     @typescript-eslint/parser ^2.0.0
 *     @typescript-eslint/eslint-plugin ^2.0.0
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @category 此规则属于哪种分类
 * @reason 为什么要开启（关闭）此规则
 */
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'no-magic-numbers': 'off',
        'no-unused-vars': 'off',
        /**
         * 重载的函数必须写在一起
         * @reason 增加可读性
         */
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        /**
         * 限制数组类型必须使用 Array<T> 或 T[]
         * @reason 允许灵活运用两者
         */
        '@typescript-eslint/array-type': 'off',
        /**
         * 禁止对没有 then 方法的对象使用 await
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/await-thenable': 'off',
        /**
         * 是否允许使用 // @ts-ignore 来忽略编译错误
         * @reason 既然已经使用注释来忽略编译错误了，说明已经清楚可能带来的后果
         */
        '@typescript-eslint/ban-ts-ignore': 'off',
        /**
         * 禁止使用指定的类型
         */
        '@typescript-eslint/ban-types': 'off',
        /**
         * 变量名必须是 camelcase 风格的
         * @reason 很多 api 或文件名都不是 camelcase 风格的
         */
        '@typescript-eslint/camelcase': 'off',
        /**
         * 类名与接口名必须为驼峰式
         */
        '@typescript-eslint/class-name-casing': 'error',
        /**
         * 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
         * @reason <Type> 容易被理解为 jsx
         */
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'never'
            }
        ],
        /**
         * 优先使用 interface 而不是 type
         * @reason interface 可以 implement, extend 和 merge
         */
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        /**
         * 函数返回值必须与声明的类型一致
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/explicit-function-return-type': 'off',
        /**
         * 必须设置类的成员的可访问性
         * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
         */
        '@typescript-eslint/explicit-member-accessibility': 'error',
        /**
         * 约束泛型的命名规则
         */
        '@typescript-eslint/generic-type-naming': 'off',
        /**
         * 接口名称必须以 I 开头
         */
        '@typescript-eslint/interface-name-prefix': 'off',
        /**
         * 私有成员必须以 _ 开头
         * @reason 已有 private 修饰符了，没必要限制变量名
         */
        '@typescript-eslint/member-naming': 'off',
        /**
         * 指定类成员的排序规则
         * @reason 优先级：
         * 1. static > instance
         * 2. field > constructor > method
         * 3. public > protected > private
         */
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'static-field',
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    'static-method',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'public-field',
                    'protected-field',
                    'private-field',
                    'instance-field',
                    'field',
                    'constructor',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    'public-method',
                    'protected-method',
                    'private-method',
                    'instance-method',
                    'method'
                ]
            }
        ],
        /**
         * 禁止使用 Array 构造函数
         */
        '@typescript-eslint/no-array-constructor': 'off',
        /**
         * 禁止定义空的接口
         */
        '@typescript-eslint/no-empty-interface': 'error',
        /**
         * 禁止使用 any
         */
        '@typescript-eslint/no-explicit-any': 'off',
        /**
         * 禁止定义没必要的类，比如只有静态方法的类
         */
        '@typescript-eslint/no-extraneous-class': 'off',
        /**
         * 禁止对 array 使用 for in 循环
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/no-for-in-array': 'off',
        /**
         * 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
         * @reason 可以简化代码
         */
        '@typescript-eslint/no-inferrable-types': 'error',
        /**
         * 禁止使用 magic numbers
         */
        '@typescript-eslint/no-magic-numbers': 'off',
        /**
         * 禁止在接口中定义 constructor，或在类中定义 new
         */
        '@typescript-eslint/no-misused-new': 'off',
        /**
         * 避免错误的使用 Promise
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/no-misused-promises': 'off',
        /**
         * 禁止使用 namespace 来定义命名空间
         * @reason 使用 es6 引入模块，才是更标准的方式。
         * 但是允许使用 declare namespace ... {} 来定义外部命名空间
         */
        '@typescript-eslint/no-namespace': [
            'error',
            {
                allowDeclarations: true,
                allowDefinitionFiles: true
            }
        ],
        /**
         * 禁止使用 non-null 断言（感叹号）
         * @reason 使用 non-null 断言时就已经清楚了风险
         */
        '@typescript-eslint/no-non-null-assertion': 'off',
        /**
         * 禁止给类的构造函数的参数添加修饰符
         */
        '@typescript-eslint/no-parameter-properties': 'error',
        /**
         * 禁止使用 require
         * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
         */
        '@typescript-eslint/no-require-imports': 'error',
        /**
         * 禁止将 this 赋值给其他变量，除非是解构赋值
         */
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true
            }
        ],
        /**
         * 禁止使用类型别名
         */
        '@typescript-eslint/no-type-alias': 'off',
        /**
         * 在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        /**
         * 禁止无用的类型断言
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        /**
         * 已定义的变量必须使用
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/no-unused-vars': 'off',
        /**
         * 禁止在定义变量之前就使用它
         * @reason 编译阶段检查就足够了
         */
        '@typescript-eslint/no-use-before-define': 'off',
        /**
         * 禁止出现没必要的 constructor
         */
        '@typescript-eslint/no-useless-constructor': 'error',
        /**
         * 禁止使用 require 来引入模块
         * @reason no-require-imports 规则已经约束了 require
         */
        '@typescript-eslint/no-var-requires': 'off',
        /**
         * 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
         * @reason for of 循环更加易读
         */
        '@typescript-eslint/prefer-for-of': 'error',
        /**
         * 可以简写为函数类型的接口或字面类型的话，则必须简写
         */
        '@typescript-eslint/prefer-function-type': 'error',
        /**
         * 使用 includes 而不是 indexOf
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/prefer-includes': 'off',
        /**
         * 禁止使用 module 来定义命名空间
         * @reason module 已成为 js 的关键字
         */
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        /**
         * 私有变量如果没有在构造函数外被赋值，则必须设为 readonly
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/prefer-readonly': 'off',
        /**
         * 使用 RegExp#exec 而不是 String#match
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/prefer-regexp-exec': 'off',
        /**
         * 使用 String#startsWith 而不是其他方式
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        /**
         * async 函数的返回值必须是 Promise
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/promise-function-async': 'off',
        /**
         * 使用 sort 时必须传入比较函数
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/require-array-sort-compare': 'off',
        /**
         * async 函数中必须存在 await 语句
         */
        '@typescript-eslint/require-await': 'off',
        /**
         * 使用加号时，两者必须同为数字或同为字符串
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/restrict-plus-operands': 'off',
        /**
         * 条件判断必须传入布尔值
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/strict-boolean-expressions': 'off',
        /**
         * 禁止使用三斜杠导入文件
         * @reason 三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的
         */
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                path: 'never',
                types: 'always',
                lib: 'always'
            }
        ],
        /**
         * interface 和 type 定义时必须声明成员的类型
         */
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: false,
                memberVariableDeclaration: false,
                objectDestructuring: false,
                parameter: false,
                propertyDeclaration: true,
                variableDeclaration: false
            }
        ],
        /**
         * 方法调用时需要绑定到正确的 this 上
         * @reason 统一关闭 requires type information 的规则
         */
        '@typescript-eslint/unbound-method': 'off',
        /**
         * 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
         */
        '@typescript-eslint/unified-signatures': 'error'
    }
};
