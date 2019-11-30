const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    modules: [
      'react',
      'react-dom',
      'seamless-immutable',
      'apollo-client',
      'redux-thunk',
      'react-loadable',
      'react-helmet',
      '@emotion/core',
      '@emotion/styled',
      'axios',
      'react-redux'
    ]
  },
  devtool: 'source-map',
  performance: {
    maxEntrypointSize: 10000,
    maxAssetSize: 10000,
    hints: false
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()]
  },
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    filename: 'js/[name].[hash].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json')
    })
  ]
}
