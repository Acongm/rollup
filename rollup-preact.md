# rollup-preact 最小通用组件

## 背景

基于 react + ts 技术背景下， 如何实现一个通用小组件
基于这样一个前提下， 我们选取了比 webpack 快的 rollup 作为打包工具，
号称 mini react 的 preact 最为组件开发框架

## rollup 真的快吗？

| name    | 纯 esm             | 纯 cjs                                          | 两者混用                                        |
| ------- | ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| webpack | 支持（有代码注入） | 支持（有代码注入）                              | 支持（有代码注入）                              |
| rollup  | 支持（无注入）     | 原生不支持（需增加插件@rollup/plugin-commonjs） | 原生不支持（需增加插件@rollup/plugin-commonjs） |

webpack 支持（有代码注入） 支持（有代码注入） 支持（有代码注入）
rollup 支持（无注入） 原生不支持（需增加插件@rollup/plugin-commonjs） 原生不支持（需增加插件@rollup/plugin-commonjs）

webpack 5 之前， 由于诞生于 esm 标准之前， 打包代码存在大量地兼容代码，目的是自己实现 require，modules.exports，export，让浏览器可以兼容 cjs 和 esm 语法
（可以理解为，webpack 自己实现 polyfill 支持模块语法，rollup 是利用高版本浏览器原生支持 esm(所以 rollup 无需代码注入)）

## preact 真的能替代 react 吗？

![preact](https://pic3.zhimg.com/v2-f0c8c85f610715fab12cd2bf77ec1bee_b.png)
