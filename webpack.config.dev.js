const { resolve } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const port = process.env.APP_PORT || 8080
const dist = resolve(__dirname, 'dist')
const src = resolve(__dirname, 'src')

module.exports = {
  entry: {
    app: ['babel-polyfill', 'react-hot-loader/patch', resolve(src, 'main.js')]
  },
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/'
  },
  devtool: 'eval',
  node: {
    fs: 'empty'
  },

  devServer: {
    hot: true,
    contentBase: src,
    port: port,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader?sourceMap=inline'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader?sourceMap=inline',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/media/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(src, './index.html')
    }),
    new ExtractTextPlugin({
      filename: 'assets/[name].[contenthash:8].css'
    }),
    new Webpack.NamedModulesPlugin()
  ]
}
