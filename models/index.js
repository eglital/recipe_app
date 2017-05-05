var mongoose = require("mongoose");
var bluebird = require("bluebird");

mongoose.Promise = bluebird;

var models = {};

models.User = require("./user");
models.Recipe = require("./recipe");

module.exports = models;
