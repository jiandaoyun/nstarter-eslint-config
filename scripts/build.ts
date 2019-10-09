/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import path from 'path';

import doctrine from 'doctrine';
import prettier from 'prettier';
import { CLIEngine, Linter } from 'eslint';
const cli = new CLIEngine({});
import insertTag from 'insert-tag';
import xmlEscape from 'xml-escape';

import {
    RuleNamespaces,
    RuleNamespaceExtensionMap,
    RuleNamespacePrismLanguageMap,
    Rule
} from '../site/constants/rule';

import '../site/vendor/prism';
declare const Prism: any;

const pkg = require('../package.json');
class Builder {
    private namespace: RuleNamespaces = 'index';
    private ruleList: Rule[] = [];
    private rulesContent = '';
    private namespaceEslintrcContent = '';

    public build(namespace: RuleNamespaces) {
        this.namespace = namespace;
        this.ruleList = this.getRuleList();
        this.rulesContent = this.getRulesContent();
        this.namespaceEslintrcContent = this.getNamespaceEslintrc();
        this.buildRulesJson();
        if (this.namespace === 'index') {
            this.buildIndexEslintrc();
        } else {
            this.buildNamespaceEslintrc();
        }
    }

    private buildRulesJson() {
        fs.writeFileSync(
            path.resolve(__dirname, `../site/config/${this.namespace}.json`),
            prettier.format(
                JSON.stringify(
                    this.ruleList.reduce(
                        (prev, rule) => {
                            let newRule = { ...rule };
                            delete newRule.comments;
                            prev[newRule.name] = newRule;
                            return prev;
                        },
                        {} as any
                    )
                ),
                {
                    ...require('../prettier.config'),
                    parser: 'json'
                }
            ),
            'utf-8'
        );
    }

    private buildIndexEslintrc() {
        const eslintrcContent =
            this.buildEslintrcMeta() +
            `module.exports={extends:['./base.js'],rules:{${this.rulesContent}}};`;

        this.writeWithPrettier(path.resolve(__dirname, '../index.js'), eslintrcContent);
    }

    private buildNamespaceEslintrc() {
        const eslintrcContent =
            this.buildEslintrcMeta() +
            this.namespaceEslintrcContent
                .replace(/extends:.*],/, '')
                .replace(/(,\s*rules: {([\s\S]*?)})?\s*};/, (_match, _p1, p2) => {
                    const rules = p2 ? `${p2},${this.rulesContent}` : this.rulesContent;
                    return `,rules:{${rules}}};`;
                });

        this.writeWithPrettier(path.resolve(__dirname, `../${this.namespace}.js`), eslintrcContent);
    }

    /** 获取规则列表，根据字母排序 */
    private getRuleList() {
        const ruleList = fs
            .readdirSync(path.resolve(__dirname, '../test', this.namespace))
            .filter((ruleName) =>
                fs
                    .lstatSync(path.resolve(__dirname, '../test', this.namespace, ruleName))
                    .isDirectory()
            )
            .map((ruleName) => {
                const filePath = path.resolve(
                    __dirname,
                    '../test',
                    this.namespace,
                    ruleName,
                    '.eslintrc.js'
                );
                return this.getRule(filePath);
            });

        return ruleList;
    }

    private buildEslintrcMeta() {
        return `
/**
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * 贡献者：
 *     ${pkg.author}
 *     ${pkg.contributors.join('\n *     ')}
 *
 * 依赖版本：
 *     ${[
                'eslint',
                'babel-eslint',
                '@typescript-eslint/parser',
                '@typescript-eslint/eslint-plugin'
            ]
                .map((key) => `${key} ${pkg.devDependencies[key]}`)
                .join('\n *     ')}
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @category 此规则属于哪种分类
 * @reason 为什么要开启（关闭）此规则
 */
`;
    }

    private writeWithPrettier(filePath: string, content: string) {
        fs.writeFileSync(
            filePath,
            // 使用 prettier 格式化文件内容
            prettier.format(content, {
                ...require('../prettier.config'),
                parser: 'babel'
            }),
            'utf-8'
        );
    }

    private getRule(filePath: string) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fileModule = require(filePath);
        const ruleName = Object.keys(fileModule.rules)[0];
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const comments = /\/\*\*.*\*\//gms.exec(fileContent);
        let rule: Rule = {
            name: ruleName,
            value: fileModule.rules[ruleName],
            description: '',
            category: '',
            comments: '',
            badExample: '',
            goodExample: ''
        };
        if (comments !== null) {
            const commentsAST = doctrine.parse(comments[0], { unwrap: true });
            rule.description = commentsAST.description;
            commentsAST.tags.forEach(({ title, description }) => {
                rule[title] = description === null ? true : description;
            });
            rule.comments = comments[0];
        }
        const badFilePath = path.resolve(
            path.dirname(filePath),
            `bad.${RuleNamespaceExtensionMap[this.namespace]}`
        );
        const goodFilePath = path.resolve(
            path.dirname(filePath),
            `good.${RuleNamespaceExtensionMap[this.namespace]}`
        );

        if (fs.existsSync(badFilePath)) {
            const { results } = cli.executeOnFiles([badFilePath]);
            rule.badExample = this.insertMark(
                Prism.highlight(
                    fs.readFileSync(badFilePath, 'utf-8'),
                    Prism.languages[RuleNamespacePrismLanguageMap[this.namespace]],
                    RuleNamespacePrismLanguageMap[this.namespace]
                ),
                results[0].messages
            ).trim();
        }
        if (fs.existsSync(goodFilePath)) {
            rule.goodExample = Prism.highlight(
                fs.readFileSync(goodFilePath, 'utf-8'),
                Prism.languages[RuleNamespacePrismLanguageMap[this.namespace]],
                RuleNamespacePrismLanguageMap[this.namespace]
            ).trim();
        }
        return rule;
    }

    // private getRuleMap() {
    //     return this.ruleList.reduce<RuleMap>((prev, rule) => {
    //         prev[rule.name] = rule;
    //         return prev;
    //     }, {});
    // }

    private getNamespaceEslintrc() {
        const namespaceEslintrcPath = path.resolve(
            __dirname,
            `../test/${this.namespace}/.eslintrc.js`
        );
        if (!fs.existsSync(namespaceEslintrcPath)) {
            return '';
        }
        return fs.readFileSync(namespaceEslintrcPath, 'utf-8');
    }

    private getRulesContent() {
        return this.ruleList
            .map(
                (rule) =>
                    `\n${rule.comments}\n'${rule.name}': ${JSON.stringify(rule.value, null, 4)},`
            )
            .join('');
    }

    /** 依据 ESLint 结果，给 badExample 添加 <mark> 标签 */
    private insertMark(badExample: string, eslintMessages: Linter.LintMessage[]) {
        let insertedBadExample = badExample;
        eslintMessages.forEach(({ ruleId, message, line, column, endLine, endColumn }) => {
            let insertLine = line - 1;
            let insertColumn = column - 1;
            let insertLineEnd = (endLine || line) - 1;
            let insertColumnEnd = (endColumn || column + 1) - 1;
            if (insertLineEnd === insertLine && insertColumnEnd === insertColumn) {
                insertColumnEnd = insertColumnEnd + 1;
            }
            insertedBadExample = insertTag(
                insertedBadExample,
                `<mark class="eslint-error" data-tip="${xmlEscape(
                    `${message}<br/><span class='eslint-error-rule-id'>eslint(${ruleId})</span>`
                )}">`,
                [insertLine, insertColumn, insertLineEnd, insertColumnEnd]
            );
        });
        return insertedBadExample;
    }
}

const builder = new Builder();
builder.build('index');
builder.build('typescript');
