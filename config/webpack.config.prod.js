const Path = require('path')
const Webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const Manifest = require('webpack-manifest-plugin')
const ChunkManifest = require('chunk-manifest-webpack-plugin')
const Gzip = require('compression-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: Path.resolve(__dirname, '../dist')
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
        exclude: [Path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: Path.resolve(__dirname, './src/app'),
        loader: ExtractPlugin.extract({
          loader: ['css-loader', 'postcss-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        exclude: Path.resolve(__dirname, './src/app'),
        loader: ExtractPlugin.extract({
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
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEVTOOLS__': false
    }),
    new HtmlPlugin({
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
    new ExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new Manifest(),
    new ChunkManifest({
      filename: 'chunk-manifest.json',
      manifestVariable: '__CHUNKS__'
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Gzip({
      asset: '{file}.gz',
      algorithm: 'gzip',
      regExp: /\.js$|\.css$/
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
