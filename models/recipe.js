const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    ingredients: Array,
    recipeYield: Number,
    instructions: String,
    image: String
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

