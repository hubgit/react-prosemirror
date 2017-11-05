const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  externals: [nodeExternals({
    whitelist: [/\.(?!js$).{1,5}$/i]
  })],
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
