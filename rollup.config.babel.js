// 帮助寻找node_modules里的包
import nodeResolve from '@rollup/plugin-node-resolve';
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from 'rollup-plugin-replace';
// rollup 的 babel 插件，ES6转ES5
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
// import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
// import uglify from 'rollup-plugin-uglify'; // 压缩包
// import 'regenerator-runtime/runtime.js' // ??
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const NODE_ENV = process.env.NODE_ENV || 'development';
const extensions = ['.ts', '.tsx'];

// console.log('NODE_ENV', NODE_ENV);
export default {
  input: './src/index.ts',
  external: [], // 外部插件
  onwarn(warning, warn) {
    // 自定義警告
  },
  output: [
    {
      dir: './dist',
      format: 'cjs', // 五种输出格式：amd /  es6 / iife / umd / cjs
      name: 'demo', //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
      sourcemap: true, //生成bundle.map.js文件，方便调试
      inlineDynamicImports: true,
      plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: true,
      extensions,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    babel({
      presets: ['@babel/env', '@babel/preset-react'],
      babelHelpers: 'bundled',
      extensions,
    }),
    postcss({
      modules: true,
      modules: {},
    }),
    NODE_ENV === 'production' && terser(),
    NODE_ENV !== 'production' && serve({ contentBase: '' }),
    NODE_ENV !== 'production' && livereload(),
  ],
};
