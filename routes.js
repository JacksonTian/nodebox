/*!
 * nodebox - reouter.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var send = require('./controllers/send');
var store = require('./controllers/store');
var home = require('./controllers/home');

module.exports = function (app) {
  app.post('/send', send);
  app.post('/store', store);
  app.get('/', home);
};
