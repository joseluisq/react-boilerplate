const { resolve } = require('path')
const Webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const Manifest = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: resolve(__dirname, 'dist')
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: { loader: 'eslint-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: resolve(__dirname, './src/main'),
        loader: ExtractPlugin.extract({
          use: [
            'css-loader?modules,localIdentName="[name]__[local]___[hash:base64:5]"',
            'postcss-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(scss|sass)$/,
        exclude: resolve(__dirname, './src/app'),
        loader: ExtractPlugin.extract({
          use: [
            'css-loader?modules,localIdentName="[name]__[local]___[hash:base64:5]"',
            'postcss-loader',
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'assets/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVTOOLS__: false
    }),
    new HtmlPlugin({
      template: './src/index.html',
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
    new ExtractPlugin({
      filename: 'assets/css/[name].[chunkhash:8].css',
      allChunks: true
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      async: false,
      children: true,
      minChunks: 3
    }),
    new Manifest({
      fileName: 'chunk-manifest.json'
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, 'src/manifest.json'),
        to: resolve(__dirname, 'dist/manifest.json')
      },
      {
        from: resolve(__dirname, 'src/assets/favicon.ico'),
        to: resolve(__dirname, 'dist/favicon.ico')
      },
      {
        from: resolve(__dirname, 'src/assets/icons'),
        to: resolve(__dirname, 'dist/assets/icons')
      }
    ]),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.optimize.OccurrenceOrderPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
