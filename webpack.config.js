const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: { loader: 'eslint-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, './src/app'),
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, './src/app'),
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEVTOOLS__': false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
