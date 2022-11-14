// 帮助寻找node_modules里的包
import nodeResolve from '@rollup/plugin-node-resolve';
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import ts from '@rollup/plugin-typescript';
import typescript from 'typescript';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const NODE_ENV = process.env.NODE_ENV || 'development';
const extensions = ['.ts', '.tsx'];

// 未使用babel打包， 仅编译
export default {
  input: './src/index.ts',
  external: [], // 外部插件
  output: [
    {
      dir: './dist',
      format: 'cjs', // 五种输出格式：amd /  es6 / iife / umd / cjs
      name: 'demo', //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
      sourcemap: true, //生成bundle.map.js文件，方便调试
      inlineDynamicImports: true,
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
    ts({
      typescript,
      jsx: 'react',
      jsxFactory: 'h',
      jsxFragmentFactory: 'Fragment',
    }),
    postcss({
      modules: true,
      // Or with custom options for `postcss-modules`
      modules: {},
    }),
    NODE_ENV === 'production' && terser(),
    NODE_ENV !== 'production' && serve({ contentBase: '' }),
    NODE_ENV !== 'production' && livereload(),
  ],
};
