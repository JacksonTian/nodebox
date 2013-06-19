/*!
 * nodebox - controllers/store.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var crypto = require('crypto');
var config = require('../config');
var nfs = require('../common/nfs');

function md5(str) {
  var hash = crypto.createHash('md5');
  return hash.update(str).digest('hex');
}

function store(req, res) {
  var email = req.body.email;
  if (!email) {
    return res.end('no email');
  }
  var file = req.files.file;
  if (!email) {
    return res.end('no file');
  }
  var path = file.path;
  var mime = file.type;
  // create gavatar
  var filename = md5(email.toLowerCase());
  nfs.store(filename, path, mime, function (err, data) {
    res.redirect('/');
  });
}

module.exports = store;
