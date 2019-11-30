const path = require('path')
const merge = require('webpack-merge')
const { base, webapp } = require('./common')

module.exports = merge(base, webapp, {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../app/index.js')
  },
  devtool: 'source-map',
  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false
  },
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: '/'
  }
})
