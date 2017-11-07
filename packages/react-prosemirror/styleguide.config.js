const path = require('path')

module.exports = {
  title: 'react-prosemirror',
  styleguideDir: '../../docs',
  components: './src/[A-Z]*.js',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide', 'Wrapper')
  },
  webpackConfig: require('./webpack.config.js')
}
