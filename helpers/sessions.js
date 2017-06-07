const loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

const loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};
const adminOnly = (req, res, next) => {
  if (req.user.username === "admin") {
    next();
  } else {
    res.redirect("/");
  }
};
const notAdminOnly = (req, res, next) => {
  if (req.user.username !== "admin") {
    next();
  } else {
    res.redirect("/");
  }
};
module.exports = {
  loggedOutOnly,
  loggedInOnly,
  adminOnly,
  notAdminOnly
};
