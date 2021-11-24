import path from 'path';
import assert from 'assert';
import eslint from 'eslint';
import { NAMESPACE_CONFIG, Namespace } from '../config';

const { ESLint } = eslint;
const eslintInstance = new ESLint({});

main();
async function main() {
  const goodResults = await eslintInstance.lintFiles(['./**/good.js', './**/good.ts']);

  goodResults.forEach((goodReportForOneFile) => {
    const { errorCount, filePath } = goodReportForOneFile;
    assert.strictEqual(errorCount, 0, `${filePath} should have no error`);
  });

  const badResults = await eslintInstance.lintFiles(['./**/bad.js', './**/bad.ts']);

  // 忽略这些规则的报错信息
  const badWhitelist: string[] = [
    'import-no-default-export',
    'max-lines-per-function',
    'no-duplicate-imports',
    'template-curly-spacing',
    'yoda',
    '@typescript-eslint/member-ordering',
    '@typescript-eslint/no-duplicate-imports',
    '@typescript-eslint/no-empty-interface',
    '@typescript-eslint/prefer-function-type',
  ];

  badResults.forEach((badReportForOneFile) => {
    const { errorCount, filePath, messages } = badReportForOneFile;

    const dirList = path.dirname(filePath).split(path.sep);
    const ruleName = dirList.pop();
    const namespace = dirList.pop() as Namespace;

    const fullRuleName = NAMESPACE_CONFIG[namespace].rulePrefix + ruleName;
    if (badWhitelist.includes(fullRuleName)) {
      return;
    }
    assert(errorCount > 0, `${filePath} should have at least one error`);

    messages.forEach((message) => {
      if (message.ruleId !== fullRuleName) {
        assert.strictEqual(
          message.ruleId,
          fullRuleName,
          `${filePath} should only have error ${fullRuleName}, but got ${message.ruleId}`,
        );
      }
    });
  });
}
