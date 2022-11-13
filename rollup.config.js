import jsx from 'acorn-jsx';
import ts from '@rollup/plugin-typescript';
// 帮助寻找node_modules里的包
import nodeResolve from '@rollup/plugin-node-resolve';
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from 'rollup-plugin-replace';
// 将非ES6语法的包转为ES6可用
import commonjs from '@rollup/plugin-commonjs';
// rollup 的 babel 插件，ES6转ES5
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
// import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss';
import typescript from 'typescript';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import terser from '@rollup/plugin-terser';
// import uglify from 'rollup-plugin-uglify'; // 压缩包
// import 'regenerator-runtime/runtime.js' // ??

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV', NODE_ENV);
export default {
  // don`t inlineDynamicImports iife
  // input: ['./src/Object.ts', './src/index.ts'],
  // input: {
  //   index: './src/index.ts',
  //   other: './src/Object.ts',
  // },
  input: './src/index.ts',
  external: [], // 外部插件
  onwarn(warning, warn) {
    console.log('NODE_ENV', NODE_ENV);
    console.log(warning, warn);
    // 自定義警告
    // do something...
  },
  output: [
    {
      dir: './dist',
      format: 'iife', // 五种输出格式：amd /  es6 / iife / umd / cjs
      name: 'demo', //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
      sourcemap: true, //生成bundle.map.js文件，方便调试
      inlineDynamicImports: true,
      // plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
    },
  ],
  // acornInjectPlugins: [jsx()],
  plugins: [
    // css({ output: 'bundle.css' }),
    nodeResolve({ browser: true, preferBuiltins: true }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    commonjs({ include: ['node_modules/**'] }),
    json(),
    builtins(),
    globals(),
    // ts({ typescript, jsx: 'preserve', jsxFactory: 'h', jsxFragmentFactory: 'Fragment' }),
    ts({
      typescript,
      jsx: 'react',
      jsxFactory: 'h',
      jsxFragmentFactory: 'Fragment',
    }),

    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      // extends: ['.js', 'jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
    }),
    postcss({
      modules: true,
      // Or with custom options for `postcss-modules`
      modules: {},
    }),
    NODE_ENV === 'production' && terser(),
  ],
};
