/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../webpack/app-dev')

const compiler = webpack(webpackConfig)
const webpackDev = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  logLevel: 'warn',
  stats: true
})
const webpackHot = webpackHotMiddleware(compiler)

// Webpack middleware must be added at the beginning of routes, so this won't get
// imported in server/middleware/index.js, but directly into the server/index.js
module.exports = { compiler, webpackDev, webpackHot }
