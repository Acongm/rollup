# rollup

## 入门

```js
// rollup.config.js

const config = {
  input: 'index.js', // 進入點
  plugins: [], // 插件
  external: [], // 外部插件
  onwarn(warning, warn) {
    // 自定義警告
    // do something...
  },
  treeshake: true, // 刪除沒用到的程式碼
  output: {
    // 輸出檔案
    name: 'bundle', // 全域名稱
    file: 'dist/bundle.js', // 輸出檔案
    format: umd, // 輸出格式
    sourcemap: true, // 是否產生 sourcemap
  },
};

export default config;

// package.json

{
  "scripts": {
    "build": "rollup -c"
  }
}
```

## rollup 的特点

- 优点
- 缺点

## 为什么 webpack 没他快

webpack 打包效果（有很多注入代码）

实际上，我们自己写的代码在最下面。上面注入的大段代码 都是 webpack 自己的兼容代码，目的是自己实现 require，modules.exports，export，让浏览器可以兼容 cjs 和 esm 语法
（可以理解为，webpack 自己实现 polyfill 支持模块语法，rollup 是利用高版本浏览器原生支持 esm(所以 rollup 无需代码注入)）

### 两者处理源代码模块的对比

| name    | 纯 esm             | 纯 cjs                                          | 两者混用                                        |
| ------- | ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| webpack | 支持（有代码注入） | 支持（有代码注入）                              | 支持（有代码注入）                              |
| rollup  | 支持（无注入）     | 原生不支持（需增加插件@rollup/plugin-commonjs） | 原生不支持（需增加插件@rollup/plugin-commonjs） |

webpack 支持（有代码注入） 支持（有代码注入） 支持（有代码注入）
rollup 支持（无注入） 原生不支持（需增加插件@rollup/plugin-commonjs） 原生不支持（需增加插件@rollup/plugin-commonjs）

## es6 模块与 commonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  - module.exports / export default
  - ES6 模块 输出的值可能存在修改
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

### es6 模块

- Node.js 要求 ES6 模块采用.mjs 后缀文件名。

### commonJS

- CommonJS 脚本的后缀名都改成.cjs。

## vite

## 配套使用

- gulp

# link

[为什么说 rollup 比 webpack 更适合打包库](https://segmentfault.com/a/1190000038708512)
