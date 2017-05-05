const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const { loggedInOnly, loggedOutOnly } = require("../helpers/sessions");

router.get("/", loggedInOnly, (req, res) => {
  Recipe.find({})
    .populate("owner")
    .sort({ createdAt: "desc" })
    .then(recipes => {
      res.render("home", { recipes });
    });
});

router.get("/add", loggedInOnly, (req, res) => {
  res.render("addRecipe");
});

router.post("/add", loggedInOnly, (req, res) => {
  const {
    owner,
    name,
    ingredients,
    recipeYield,
    instructions,
    image,
    url
  } = req.body;
  var newRecipe = new Recipe({
    owner,
    name,
    ingredients,
    recipeYield,
    instructions,
    image,
    url
  });
  newRecipe
    .save()
    .then(recipe => {
      res.redirect("/");
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
