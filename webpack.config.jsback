var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var stylelint = require('stylelint');
var webpack = require('webpack');

const PATHS = {
  config: path.join(__dirname, './config'),
  spec: path.join(__dirname, 'test'),
  app: path.join(__dirname, 'src'),
  components: path.join(__dirname, './components'),
  css: path.join(__dirname, 'scss')
};

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/index.jsx')
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Rebirth',
      template: 'build/index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    })
  ],
  module: {
    preLoaders: [

      {test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/},
      {test: /\.scss$/, loaders: ['postcss'], include: PATHS.css}

    ],
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: ['es2015', 'es2016', 'stage-0', 'react'],
        }
      },
      {
        test: /\.scss$/,
         loaders: ["style", "css?sourceMap?root=.", "sass?sourceMap"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192?',
          'img'
        ]
      },
      {
        test: /\.mp3$/,
        loaders: ["file-loader"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./sass")]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json']
  },
  postcss: function () {
    return [stylelint({
      extends: [PATHS.config + "/.stylelintrc"],
      rules: {
        'color-hex-case': 'lower'
      }
    })];
  },
  eslint: {
    configFile: PATHS.config + '/.eslintrc',
    rules: {
      "no-var": 0,
      "no-unused-vars": 0
    }
  }
}
