import jsx from 'acorn-jsx';
import ts from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser'
// import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss';
import typescript from 'typescript';

export default {
  // don`t inlineDynamicImports iife
  // input: ['./src/Object.js', './src/main.js'],
  input: './src/main.ts',
  output: [
    {
      dir: './dist',
      format: 'esm',
      inlineDynamicImports: true,
      plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
    },
  ],
  acornInjectPlugins: [jsx()],
  plugins: [
    // css({ output: 'bundle.css' }),
    resolve(),
    commonjs(),
    // ts({ typescript, jsx: 'preserve', jsxFactory: 'h', jsxFragmentFactory: 'Fragment' }),
    ts({ typescript, jsx: 'react', jsxFactory: 'h', jsxFragmentFactory: 'Fragment' }),

    // terser(),
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
  ],
};
