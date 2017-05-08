/* eslint global-require: "off" */
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const cssimport = require('gulp-cssimport');
const autoprefixer = require('gulp-autoprefixer');

// RUN TASKS
gulp.task('server', () => {
  process.env.port = 3000;
  process.env.NODE_ENV = 'development';
  nodemon({
    script: './server/runServer.js',
    ext: '.js',
    ignore: ['client/', 'public/']
  });
});

gulp.task('webpack', () => {
  const webpackConfig = process.env.NODE_ENV === 'production' ?
    require('./webpack.production.config') :
    require('./webpack.config');

  return gulp.src('./client/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('public/'));
});

gulp.task('dev', [
  // 'stylesheetsWatch',
  'webpack',
  'server'
]);

// STYLE TASKS
function stylesheets(compileSass) {
  return gulp.src('client/scss/*.scss')
    .pipe(compileSass())
    .pipe(plumber())
    .pipe(cssimport())
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/'));
}

gulp.task('stylesheetsNoThrow', () => stylesheets(() => sass().on('error', sass.logError)));

gulp.task('stylesheets', () => stylesheets(() => sass()));

gulp.task('stylesheetsWatch', ['stylesheetsNoThrow'], () => gulp.watch('client/styles/*.scss', ['stylesheetsNoThrow']));
