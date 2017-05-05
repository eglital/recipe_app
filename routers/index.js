const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const { loggedInOnly, loggedOutOnly } = require("../helpers/sessions");
const passport = require("passport");

router.get("/", loggedInOnly, (req, res) => {
  Recipe.find({})
    .populate("owner")
    .sort({ createdAt: "desc" })
    .then(recipes => {
      res.render("home", { recipes });
    });
});

router.get("/login", loggedOutOnly, (req, res) => {
  res.render("login");
});

router.get("/register", loggedOutOnly, (req, res) => {
  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err, user) => {
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
