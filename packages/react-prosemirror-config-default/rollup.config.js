const babel = require('rollup-plugin-babel')

module.exports = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/index.js'
  },
  sourcemap: true,
  plugins: [
    babel({
      plugins: ['external-helpers']
    })
  ]
}
