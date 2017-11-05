const path = require('path')

module.exports = {
  title: 'react-prosemirror',
  styleguideDir: '../../docs',
  components: '../react-prosemirror/src/[A-Z]*.js',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'Wrapper')
  },
  webpackConfig: {
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
            {
              test: /\.module\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                }
              ]
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            }
          ]
        }
      ]
    }
  }
}
