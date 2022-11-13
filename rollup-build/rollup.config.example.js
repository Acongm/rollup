import myExample from './rollup-plugin/my-example.js'
export default {
  input: 'virtual-module', // resolved by our plugin
  plugins: [myExample()],
  output: [
    {
      file: 'build/example/bundle.js',
      format: 'es',
    },
  ],
}
