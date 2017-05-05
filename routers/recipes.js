const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const { loggedInOnly, loggedOutOnly } = require("../helpers/sessions");

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
    ingredients: ingredients.split("; "),
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

router.get("/edit/:id", loggedInOnly, (req, res) => {
  let recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then(recipe => {
      recipe.ingredients = recipe.ingredients.join("; ");
      res.render("editRecipe", { recipe });
    })
    .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
