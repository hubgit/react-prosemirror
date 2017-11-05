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
              loader: 'babel-loader',
              exclude: /node_modules/
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
