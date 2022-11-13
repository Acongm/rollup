import css from 'rollup-plugin-css-only'
import terser from '@rollup/plugin-terser'

export default {
  // don`t inlineDynamicImports iife
  // input: ['./src/Object.js', './src/main.js'],
  input: './src/main.js',
  output: [
    {
      dir: './build/cjs',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    ,
    {
      dir: './build/es',
      format: 'es',
    },
    {
      dir: './build/amd',
      format: 'amd',
      name: 'asyFn',
    },
    {
      dir: './build/esm',
      format: 'esm',
    },
    {
      dir: './build/iife',
      format: 'iife',
      inlineDynamicImports: true,
    },
    {
      dir: './build/terser',
      format: 'iife',
      inlineDynamicImports: true,
      plugins: [terser()],
    },
  ],
  plugins: [css({ output: 'bundle.css' })],
}
