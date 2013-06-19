/*!
 * nodebox - app.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var http = require('http');
var config = require('./config');
var fs = require('fs');
var http = require('http');
var connect = require('connect');
var urlrouter = require('urlrouter');
var render = require('connect-render');
var forward = require('forward');
var Loader = require('loader');

require('response-patch');

var config = require('./config');
var routes = require('./routes');

var app = connect();
// 记录access log
connect.logger.format('home', ':remote-addr :response-time - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :res[content-length]');
app.use(connect.logger({
  format: 'home',
  stream: fs.createWriteStream(__dirname + '/logs/access.log')
}));

// favicon
app.use('/favicon.ico', forward(__dirname + '/assets/favicon.ico'));

// 解析静态文件
app.use('/assets', connect.static(__dirname + '/assets', { maxAge: 3600000 * 24 * 365 }));

// 解析query
app.use(connect.query());
app.use(connect.bodyParser({uploadDir: '/tmp'}));

// 模版
app.use(render({
  root: __dirname + '/views',
  layout: false,
  viewExt: '.html',
  cache: !config.debug,
  helpers: {
    CDN: config.debug ? '' : 'http://qiniudn.com',
    version: config.version,
    Loader: function () {
      return Loader;
    },
    // assetsMap: require('./assets.json')
  }
}));

// 路由
app.use(urlrouter(routes));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  console.log(err.stack);
  res.statusCode = err.status || 500;
  res.render('500');
});

/**
 * Page not found handler
 */
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.render('404');
});

process.on('uncaughtException', function (err) {
  if (err.domain_thrown) {
    return;
  }
  // 测试情况下，断言异常不要抛出
  if (process.env.NODE_ENV === 'test' && err.name === 'AssertionError') {
    return;
  }
  throw err;
});

var server = http.createServer(app);
if (process.env.NODE_ENV !== 'test') {
  server.listen(config.port);
}

module.exports = server;
