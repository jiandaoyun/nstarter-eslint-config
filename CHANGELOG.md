# Changelog

## v4.1.0

* 规则变更
  - 不再使用因历史性能问题启用的 `no-return-await` 规则
  - 默认启用 `@typescript-eslint/return-await` 警告规则，建议优先使用 `return await promise`，便于调试与问题排查。避免 `try catch` 下异常处理控制流行为时机不符合预期的问题

* 锁定 `@typescript-eslint` 版本到 7.x，不完全兼容 8.x 版本后续的规则调整
* 启用 typescript 类型检查相关规则


## v4.0.1

* 规则调整
  - 默认关闭 `@typescript-eslint/no-unused-vars`

## v4.0.0

* 升级上游 alloy 规则 -> 5.1.2
  - 兼容 Typescript >=5.0, <5.6


## v3.0.0

* 升级上游 alloy 规则 -> 4.9.0


## v2.1.2

* 修正 @bable/core 的可选依赖提示问题

## v2.1.1

* 允许使用 Function 类型定义，用于不定参数的函数装饰器包装等场景


## v2.1.0

* 自动安装上游依赖
* 使用 eslint-plugin-node 取代部分弃用规则


## v2.0.0

* 升级上游 alloy 规则 -> 4.4.0
