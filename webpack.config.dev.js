const { resolve } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const port = process.env.APP_PORT || 8080

module.exports = {
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?http://localhost:${port}`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: '#eval',
  node: {
    fs: 'empty'
  },

  devServer: {
    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: resolve(__dirname, 'dist'),

    port: port,

    // match the output `publicPath`
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
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
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap=inline'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap=inline',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new Webpack.NamedModulesPlugin()
  ]
}
