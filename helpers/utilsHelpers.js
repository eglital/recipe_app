const moment = require("moment");

var UtilsHelper = {};

UtilsHelper.formatDate = function(date) {
  return moment(date).format("MMM Do YY h:mmA");
};

module.exports = UtilsHelper;
