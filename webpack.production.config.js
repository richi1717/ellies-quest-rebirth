const path = require('path');
const webpack = require('webpack');
const p = require('./oldpkg.json');

module.exports = {
  entry: ['whatwg-fetch', './client/js/index.js'],
  output: {
    path: path.join(__dirname, 'resources/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: false
      }
    },
    {
      test: /\.scss$/,
                      //loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      loaders: ['style', 'css?sourceMap?root=.', 'postcss', 'sass?outputStyle=compressed&sourceMap']
                      //loader: "style-loader!css-loader!autoprefixer-loader!sass-loader",
    },
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    }
    ]
  },
  resolve: {
        // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.jsx', '.js', '.json', '.coffee']
  }
};