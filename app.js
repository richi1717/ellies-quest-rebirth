//
// var path = require('path');
// var express = require('express');
// var app = express();
//
// app.use(express.static(__dirname + '/dist' ));
// // app.get('/*', function response(req, res) {
// //    res.sendFile(path.join(__dirname, '/' , 'index.html'));
// // });
// // app.get('/', function(request, response) {
// //   response.render('dist/index')
// // });
// app.get('/*', function (req, res, next) {
//   if (req.accepts('html')) {
//     return res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
//   }
//   next();
// });
// app.use('/js', express.static(__dirname + '/js'));
//
// app.set('port', (process.env.PORT || 5000));
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
// // app.listen(8080, function () {
// //     console.log('Example app listening on port 8080!');
// // });
//
// // var express = require('express');
// // var app = express();
// //
// //
// //
// // app.use(express.static(__dirname + '/public'));
// //
// // // views is directory for all template files
// // app.set('views', __dirname + '/views');
// // // app.set('view engine', 'ejs');
// //
// // app.get('/', function(request, response) {
// //   response.render('pages/index')
// // });
//
// // var cool = require('cool-ascii-faces');
// // var express = require('express');
// // var app = express();
// // var pg = require('pg');
// //
// // app.get('/db', function (request, response) {
// //   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
// //     client.query('SELECT * FROM test_table', function(err, result) {
// //       done();
// //       if (err)
// //        { console.error(err); response.send("Error " + err); }
// //       else
// //        { response.render('pages/db', {results: result.rows} ); }
// //     });
// //   });
// // });
// //
// // app.set('port', (process.env.PORT || 5000));
// //
// // app.use(express.static(__dirname + '/public'));
// //
// // // views is directory for all template files
// //
// //
// // app.get('/', function(request, response) {
// //   response.render('pages/index')
// // });
// //
// // app.get('/cool', function(request, response) {
// //   response.send(cool());
// // });
// //
// // app.listen(app.get('port'), function() {
// //   console.log('Node app is running on port', app.get('port'));
// // });
var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname + '/resources'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

app.listen(PORT, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
