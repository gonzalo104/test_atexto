const path = require('path')
const merge = require('webpack-merge')
const { base, webappDev } = require('./common')

module.exports = merge(base, webappDev, {
  devtool: 'cheap-eval-source-map',
  mode: 'development',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '../app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[id].[chunkhash].js'
  }
})
