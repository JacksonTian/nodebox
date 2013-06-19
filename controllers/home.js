/*!
 * nodebox - controllers/home.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var packagePath = path.join(__dirname, '..', 'package.json');
var version = JSON.parse(fs.readFileSync(packagePath)).version;

function home(req, res) {
  res.render('index', {version: version});
}

module.exports = home;
