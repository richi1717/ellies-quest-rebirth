const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './client/js/index.js'],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'client/js/')],
        exclude: /node_modules/,
        options: { cacheDirectory: true }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap?root=.', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  watch: true
};
