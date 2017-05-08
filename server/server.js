'use strict';
const express = require('express');
const chalk = require('chalk');
const index = require('../public/indexHTML');
var path = require('path');

module.exports = {
  getApp: (app = express()) => {
    app.use(express.static('public'));
    app.use('/*', (req, res) => res.send(index()));

    return app;
  },
  start: (port, app) => {
    app.listen(port, () =>
      console.log(`\n${'~'.repeat(30)}\n${chalk.blue.underline.bold('Server started on port:' + port)}\n${'~'.repeat(30)}\n`))
  }
};