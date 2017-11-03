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
      runtimeHelpers: true,
      externalHelpers: false,
      plugins: [
        'external-helpers',
        'transform-runtime'
      ]
    })
  ]
}
