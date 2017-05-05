const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    ingredients: Array,
    recipeYield: Number,
    instructions: String,
    image: String,
    url: String,
    reportedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
