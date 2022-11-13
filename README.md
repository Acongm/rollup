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

### webpack 4 - webpack 5 - rollup

### 为什么 webpack 需要注入这么多代码？

### rollup 如何处理公共模块？（比如， a、b、c 3 个模块 同时依赖 d）

有 2 种情况：

- 源代码内 不存在 动态 import，那么会打成一个 chunk（a、b、c、d 4 个模块都在一包内，d 只正常有一份）

- 源代码内 存在 懒加载模块，并且懒加载的模块也访问了公共依赖，比如

```js
// 入口 main.js
import { deepCopy } from '@xxx/methods/deepCopy.js'; // 这是放在公司的npm域内的一个包，可以理解为export一个简单的deepCopy函数
console.log(deepCopy(a));
import('./test/a').then((e) => {
  console.log(e);
});

// './test/a' 懒加载模块 也依赖 同一公共模块
import { deepCopy } from '@xxx/methods/deepCopy.js';
const a = { a: 1 };
export const b = deepCopy(a);
/* 
---------- 是否会把 公共依赖  打包2份呢?  --------------
答案是no，rollup还是牛p，公共依赖只会出来一份，然后对外 export  （此处举例是导出esm格式， 亲测导出cjs格式一样的可以，此处就不赘述，有兴趣可以自己test一下）

生成的目录结构，有3个文件
    a-19173be8.js
    main.js
    main-219c2eaf.js
 */
// main.js
import './main-219c2eaf.js';

// main-219c2eaf.js
const deepCopy = function (obj) {
  // do ..
};
console.log(deepCopy(a));
import('./a-19173be8.js').then((e) => {
  console.log(e);
});

// a-19173be8.js
import { d as deepCopy } from './main-219c2eaf.js';
const a = { a: 1 };
const b = deepCopy(a);
export { b };
```

总结：对于公共依赖，rollup 不会出现重复打包的情况！并且完全无注入代码！无需额外配置。 对比 webpack 的话，webpack 需要配置 optimization.splitChunks （webpack4.x 以上）

### 两者处理源代码模块的对比

| name    | 纯 esm             | 纯 cjs                                          | 两者混用                                        |
| ------- | ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| webpack | 支持（有代码注入） | 支持（有代码注入）                              | 支持（有代码注入）                              |
| rollup  | 支持（无注入）     | 原生不支持（需增加插件@rollup/plugin-commonjs） | 原生不支持（需增加插件@rollup/plugin-commonjs） |

webpack 支持（有代码注入） 支持（有代码注入） 支持（有代码注入）
rollup 支持（无注入） 原生不支持（需增加插件@rollup/plugin-commonjs） 原生不支持（需增加插件@rollup/plugin-commonjs）

## 总结 rollup vs webpack

rollup 诞生在 esm 标准出来后

出发点就是希望开发者去写 esm 模块，这样适合做代码静态分析，可以做 tree shaking 减少代码体积，也是浏览器除了 script 标签外，真正让 JavaScript 拥有模块化能力。是 js 语言的未来
rollup 完全依赖高版本浏览器原生去支持 esm 模块，所以无额外代码注入，打包后的代码结构也是清晰的（不用像 webpack 那样 iife）

目前浏览器支持模块化只有 3 种方法：

①script 标签（缺点没有作用域的概念）
②script 标签 + iife + window + 函数作用域（可以解决作用域问题。webpack 的打包的产物就这样）
③esm （什么都好，唯一缺点 需要高版本浏览器）

webpack 诞生在 esm 标准出来前，commonjs 出来后

当时的浏览器只能通过 script 标签加载模块

script 标签加载代码是没有作用域的，只能在代码内 用 iife 的方式 实现作用域效果，

这就是 webpack 打包出来的代码 大结构都是 iife 的原因
并且每个模块都要装到 function 里面，才能保证互相之间作用域不干扰。
这就是为什么 webpack 打包的代码为什么乍看会感觉乱，找不到自己写的代码的真正原因

关于 webpack 的代码注入问题，是因为浏览器不支持 cjs，所以 webpack 要去自己实现 require 和 module.exports 方法（才有很多注入）

这么多年了，甚至到现在 2022 年，浏览器为什么不支持 cjs？

cjs 是同步的，运行时的，node 环境用 cjs，node 本身运行在服务器，无需等待网络握手，所以同步处理是很快的
浏览器是 客户端，访问的是服务端资源，中间需要等待网络握手，可能会很慢，所以不能 同步的 卡在那里等服务器返回的，体验太差

后续出来 esm 后，webpack 为了兼容以前发在 npm 上的老包（并且当时心还不够决绝，导致这种“丑结构的包”越来越多，以后就更不可能改这种“丑结构了”），所以保留这个 iife 的结构和代码注入，导致现在看 webpack 打包的产物，乍看结构比较乱且有很多的代码注入，自己写的代码都找不到

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

## 兼容

![RUNOOB 图标](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0b0bf8de76c41dc9f96ad8c4ad7c313~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

# link

[为什么说 rollup 比 webpack 更适合打包库](https://segmentfault.com/a/1190000038708512)
[vite 原理浅析-dev 篇](https://juejin.cn/post/7050293652739850271)
[vite原理浅析-prd篇（对比rollup和webpack）](https://juejin.cn/post/7055474242535555085)
[如何看待 React 的替代框架 Preact？](https://www.zhihu.com/question/65479147)

[vite - rollup 代码](https://github.com/vitejs/vite/blob/main/packages/vite/rollup.config.ts)

[切换到 Preact（从 React）](https://preactjs.com/guide/v10/switching-to-preact/)