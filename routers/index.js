const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const { loggedInOnly, loggedOutOnly } = require("../helpers/sessions");
const passport = require("passport");

router.get("/", loggedInOnly, (req, res) => {
  if (req.user.username === "admin") {
    res.redirect("/admin");
  } else {
    Recipe.find({})
      .populate("owner likedBy")
      .sort({ createdAt: "desc" })
      .then(recipes => {
        res.render("recipes/home", { recipes });
      });
  }
});

router.get("/login", loggedOutOnly, (req, res) => {
  res.render("sessions/login");
});

router.get("/register", loggedOutOnly, (req, res) => {
  res.render("sessions/register");
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
        req.flash("error", "Username already exists");
        return res.redirect("/register");
      }
      return res.redirect("/");
    });
  });
});

router.get("/logout", loggedInOnly, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
