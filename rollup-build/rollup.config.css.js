import css from 'rollup-plugin-css-only'
import crypto from 'crypto'

const production = 'production'

function emitCSS(css, styles, bundle) {
  const md5 = crypto.createHash('md5').update(css).digest('hex').substr(0, 8)
  const filename = `bundle.${md5}.css`
  // bundle 中添加 css 文件信息
  bundle[filename] = { type: 'asset', fileName: filename, source: css }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: false,
    format: 'cjs',
    name: 'app',
    entryFileNames: production ? 'bundle.[hash].js' : 'bundle.js',
    chunkFileNames: production ? '[name].[hash].js' : '[name].js',
    dir: 'build',
  },
  plugins: [
    css({
      output: production ? emitCSS : 'bundle.css',
    }),
  ],
}
