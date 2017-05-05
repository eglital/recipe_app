const moment = require("moment");

var UtilsHelper = {};

UtilsHelper.formatDate = function(date) {
  return moment(date).format("MMM Do YY h:mmA");
};

UtilsHelper.isOwner = function(id1, id2) {
  return id1.toString() === id2.toString();
};

UtilsHelper.isIn = function(id, array) {
  return array.filter(el => {
    if (el._id) {
      return el._id.toString() === id.toString();
    }
    return el.toString() === id.toString();
  }).length;
};

UtilsHelper.isAdmin = function(username) {
  return username === "admin";
};
UtilsHelper.bootstrapAlertClassFor = function(key) {
  return (
    {
      error: "danger",
      alert: "danger",
      notice: "info"
    }[key] || key
  );
};

module.exports = UtilsHelper;
