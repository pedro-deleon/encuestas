"use strict";
exports.__esModule = true;
var util = require('util');
var crypto2 = require('crypto');
exports.randomBytes = util.promisify(crypto2.randomBytes);
