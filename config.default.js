/*!
 * nodebox - config.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

module.exports = {
  port: 80,
  maxSize: 1024 * 1024 * 800, // 800mb
  user: 'foo',
  password: 'bar',
  qiniu: {
    ACCESS_KEY: 'YOUR_ACCESS_KEY',
    SECRET_KEY: 'YOUR_SECRET_KEY',
    bucket: 'nodebox',
    domain: 'cnavatar.qiniudn.com'
  }
};
