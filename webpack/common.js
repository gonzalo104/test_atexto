const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const progressReport = {
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.blue.bold('App React')} building [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`
    })
  ]
}

const commonResolve = {
  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, '..'), 'node_modules'],
    alias: {
      Components: path.resolve('app', 'Components'),
      Views: path.resolve('app', 'Views'),
      Utils: path.resolve('app', 'Utils'),
      Graphql: path.resolve('app', 'Graphql'),
      Redux: path.resolve('app', 'Redux'),
      Assets: path.resolve('app', 'Assets'),
      Hooks: path.resolve('app', 'Hooks'),
      Routing: path.resolve('app', 'Routing')
    }
  }
}

const webapp = {
  optimization: {
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    },
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 1000,
            name: '[hash].[ext]',
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/index.html')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/index.html'),
      filename: path.resolve(__dirname, '../dist/public/index.edge')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'), // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dist/public/js/*.dll.js'),
      publicPath: '/js/'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.**']
    })
  ]
}

const webappDev = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/index.html')
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'), // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    })
  ]
}

module.exports = {
  base: merge(progressReport, commonResolve),
  webapp,
  webappDev
}
