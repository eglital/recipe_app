const moment = require("moment");

var UtilsHelper = {};

UtilsHelper.formatDate = function(date) {
  return moment(date).format("MMM Do YY h:mmA");
};

UtilsHelper.isOwner = function(id1, id2) {
  return id1.toString() === id2.toString();
};

module.exports = UtilsHelper;
