/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * 批量删除 eslint-config-prettier 中的规则
 */
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

const prettier = require('eslint-config-prettier');
const prettierTypeScript = require('eslint-config-prettier/@typescript-eslint');

const prettierRules = {
    node: prettier.rules,
    typescript: prettierTypeScript.rules
};

const RULE_PREFIX_MAP = {
    node: '',
    typescript: '@typescript-eslint/'
};
type RulePrefix = keyof typeof RULE_PREFIX_MAP;
const namespaces: RulePrefix[] = ['node', 'typescript'];

namespaces.forEach((namespace) => {
    fs.readdirSync(path.resolve(__dirname, '../test', namespace))
        .filter((ruleName) =>
            fs.lstatSync(path.resolve(__dirname, '../test', namespace, ruleName)).isDirectory()
        )
        .forEach((ruleName) => {
            if (
                typeof prettierRules[namespace][`${RULE_PREFIX_MAP[namespace]}${ruleName}`] !==
                'undefined'
            ) {
                const rulePath = path.resolve(__dirname, '../test', namespace, ruleName);
                rimraf.sync(rulePath);
                console.log(`已删除 ${rulePath}`);
            }
        });
});
