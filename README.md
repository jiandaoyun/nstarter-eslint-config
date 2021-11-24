# [NStarter ESLint 规则](https://jiandaoyun.github.io/nstarter-eslint-config/)

[![Build Status](https://img.shields.io/travis/jiandaoyun/nstarter-eslint-config.svg)](https://travis-ci.org/jiandaoyun/nstarter-eslint-config) [![npm package](https://img.shields.io/npm/v/eslint-config-nstarter.svg)](https://www.npmjs.org/package/eslint-config-nstarter) [![npm downloads](http://img.shields.io/npm/dm/eslint-config-nstarter.svg)](https://www.npmjs.org/package/eslint-config-nstarter) 

NStarter ESLint 规则在腾讯 Alloy ESLint 规则基础上定制而来，用于规范化 nstarter 系列项目的代码编写规范。

## 规则列表

| 名称 | 包含规则 | 解析器 |
| --- | --- | --- |
| [标准规则](#标准规则) | [ESLint 规则][] | [@babel/eslint-parser][] |
| [TypeScript](#typescript) | ESLint 规则、[@typescript-eslint][] |[@typescript-eslint/parser][] |

[@babel/eslint-parser]: https://github.com/babel/babel-eslint
[@typescript-eslint/parser]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
[ESLint 规则]: https://eslint.org/docs/rules/
[@typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules

## 设计理念

- 传承 ESLint 的理念，帮助大家建立自己的规则
- 高度的自动化：先进的规则管理，测试即文档即[网站][]


### 传承 [ESLint 的理念][]，帮助大家建立自己的规则

大家还记得 ESLint 是怎么打败 JSHint 成为最受欢迎的 js 代码检查工具吗？就是因为 ESLint 推崇的插件化、配置化，满足了不同团队不同技术栈的个性的需求。

所以 eslint-config-nstarter 也传承了 ESLint 的设计理念，不会强调必须要使用我们这套规则，而是通过文档、示例、测试、网站等方便大家参考 nstarter 的规则，在此基础上做出自己的个性化。


### 高度的自动化：先进的规则管理，测试即文档即[网站][]

> 无情的推动自动化

eslint-config-nstarter 通过高度的自动化，将一切能自动化管理的过程都交给脚本处理，其中包括了：

- 通过 GitHub Actions，自动每周检查 ESLint 及相关插件是否有新版本，新版本中是否有新规则需要我们添加
- 自动检查我们的规则是否包含了 Prettier 的规则
- 自动检查我们的规则是否包含了已废弃（deprecated）的规则

除此之外，通过自动化的脚本，我们甚至可以将成百上千个 ESLint 配置文件分而治之，每个规则在一个单独的目录下管理：

- 通过脚本将单个的配置整合成最终的一个配置
- 通过脚本将单个配置中的 description 和 reason 构建成文档[网站][]，方便大家查看
- 通过脚本将单个配置中的 `bad.js` 和 `good.js` 输出到[网站][]中，甚至可以直接在[网站][]中看到 `bad.js` 的（真实运行 ESLint 脚本后的）报错信息

这样的好处是显而易见的，测试即文档即[网站][]，我们可以只在一个地方维护规则和测试，其他工作都交给自动化脚本，极大的降低了维护的成本。简单来说，当我们有个新规则需要添加时，只需要写三个文件 `test/index/another-rule/.eslintrc.js`, `test/index/another-rule/bad.js`, `test/index/another-rule/good.js` 即可。


## 使用方法

### 标准规则

安装：

```bash
npm install --save-dev eslint @babel/eslint-parser eslint-plugin-import eslint-config-nstarter
```

在你的项目根目录下创建 `.eslintrc.js`，并将以下内容复制到文件中：

```js
module.exports = {
    extends: [
        'nstarter',
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
npm install --save-dev eslint typescript @babel/eslint-parser eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-nstarter
```

在你的项目根目录下创建 `.eslintrc.js`，并将以下内容复制到文件中：

```js
module.exports = {
    extends: [
        'nstarter',
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

### 常用命令

```bash
# 安装依赖
npm install

# 构建 eslintrc 配置
npm run build

# 执行测试
npm test

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
