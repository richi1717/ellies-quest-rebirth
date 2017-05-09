const express = require('express');
const server = require('./server');

const port = process.env.PORT || 3000;
const app = express();

server.start(port, server.getApp(app));