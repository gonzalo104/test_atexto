const nodeModules = require('webpack-node-externals')
const path = require('path')
const merge = require('webpack-merge')
const { base } = require('./common')

module.exports = merge(base, {
  mode: 'production',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../server/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js'
  },

  target: 'node',
  node: {
    __dirname: true // Make __dirname work properly
  },
  externals: nodeModules(),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
})
