# [NStarter ESLint 规则](https://jiandaoyun.github.io/nstarter-eslint-config/)

[![Build Status](https://img.shields.io/travis/jiandaoyun/nstarter-eslint-config.svg)](https://travis-ci.org/jiandaoyun/nstarter-eslint-config) [![npm package](https://img.shields.io/npm/v/eslint-config-nstarter.svg)](https://www.npmjs.org/package/eslint-config-nstarter) [![npm downloads](http://img.shields.io/npm/dm/eslint-config-nstarter.svg)](https://www.npmjs.org/package/eslint-config-nstarter) 

NStarter ESLint 规则在腾讯 Alloy ESLint 规则基础上定制而来，用于规范化 nstarter 系列项目的代码编写规范。

## 规则列表

| 名称 | 包含规则 | 解析器 |
| --- | --- | --- |
| [标准规则](#标准规则) | [ESLint 规则][] | [babel-eslint][] |
| [TypeScript](#typescript) | ESLint 规则、[@typescript-eslint][] |[@typescript-eslint/parser][] |

[babel-eslint]: https://github.com/babel/babel-eslint
[@typescript-eslint/parser]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
[ESLint 规则]: https://eslint.org/docs/rules/
[@typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules

## 配置原则

我们依据以下三条原则，研读了 ESLint 所有的配置项，定制出了心目中的「完美」ESLint 配置。

1. 能够帮助发现代码错误的规则，全部开启
2. 配置不应该依赖于某个具体项目，而应该全局合理
3. 帮助保持团队的代码风格统一，而不是限制开发体验

## 配置解读

ESLint 的配置多达几百条，逐个查阅是一项非常繁重的工作，我们为了简化个性化配置的成本，针对每一条配置都有一句话的注释，以及对应的错误示例和正确示例。这样不仅方便了我们自己查阅某项配置的意义和原因，也使大家更容易配置出自己心目中的规则：

- 每一条配置都有一句话注释说明此配置的用途
- 每个开启的配置都有对应的错误示例和正确示例
- 每个示例都会在真实的 ESLint 脚本中运行，以保证报错项与配置一一匹配
- 对于有争议的配置，都在注释中说明了为什么要这么配置的原因

## 使用方法

### 标准规则

安装：

```bash
npm install --save-dev eslint eslint-config-nstarter
```

在你的项目根目录下创建 `.eslintrc.js`，并将以下内容复制到文件中：

```js
module.exports = {
    extends: [
        'nstarter/node',
    ],
    env: {
        // 这里填入你的项目用到的环境
        // 它们预定义了不同环境的全局变量，比如：
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // false 表示这个全局变量不允许被重新赋值，比如：
        //
        // myGlobal: false
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
    }
};
```

### TypeScript

安装：

```bash
npm install --save-dev eslint typescript eslint-config-nstarter
```

在你的项目根目录下创建 `.eslintrc.js`，并将以下内容复制到文件中：

```js
module.exports = {
    extends: [
        'nstarter/node',
        'nstarter/typescript',
    ],
    env: {
        // 这里填入你的项目用到的环境
        // 它们预定义了不同环境的全局变量，比如：
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // false 表示这个全局变量不允许被重新赋值，比如：
        //
        // myGlobal: false
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
    }
};
```

## Troubleshootings

### 在 VSCode 中使用

在 VSCode 中，默认 ESLint 并不能识别 `.ts` 文件，需要在「文件 => 首选项 => 设置」里做如下配置：

```json
{
    "eslint.validate": [
        "javascript",
        "typescript"
    ]
}
```

### VSCode 中的 autoFixOnSave 没有效果

如果需要针对 `.ts` 文件开启 ESLint 的 autoFix，则需要配置成：

```json
{
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        {
            "language": "typescript",
            "autoFix": true
        }
    ]
}
```

## Testing

```bash
npm test
```

## Contributing

为了实现高度自动化，此项目的整体架构如下：

- 所有 ESLint 配置均在 `test` 目录下
- 每一项配置存放在对应的目录下，如 `test/node/complexity/.eslintrc.js` 描述了规则 `complexity`
- 如果配置开启了，则需要有对应的示例，包括 `bad.js` 和 `good.js`
- 由于配置和示例在一个目录下，故编辑器中可以直接看到错误信息
- 由 `scripts/build.ts` 脚本将 `test` 目录下分散的配置生成整体的配置
- 运行测试脚本 `test/index.ts` 会检查每个示例是否按照要求报错

### 常用命令

```bash
# 安装依赖
npm i
# 构建 eslintrc 配置
npm run build
# 执行测试
npm test
# 自动修复 ESLint 错误
npm run eslint:fix
# 自动修复格式错误
npm run prettier:fix
# 发布新版本
npm version <major|minor|patch>
git push --follow-tags
npm publish
```

## 参考

- [ESlint Code Guide](http://eslint.org/docs/user-guide/configuring)
- [ESlint Shareable Config](http://eslint.org/docs/developer-guide/shareable-configs)
- [Alloyteam Code Guide](http://alloyteam.github.io/CodeGuide)
