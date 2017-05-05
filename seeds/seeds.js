const bcrypt = require("bcrypt");
module.exports = () => {
  //Create Users
  console.log("Creating Users");
  var users = [];
  ["test", "admin", "Rob", "Natalie", "Emma", "Jason"].forEach(name => {
    users.push(
      new User({
        username: name,
        passwordHash: bcrypt.hashSync(name, 8)
      })
    );
  });

  //Create recipes
  var recipes = [];
  var images = [
    "/images/sandwich.jpg",
    "/images/spaghetti.jpg",
    "/images/mexican.jpg",
    "/images/coated.jpg"
  ];
  var data = require("./recipeData");
  data.forEach(rec => {
    recipes.push(
      new Recipe({
        owner: users[Math.floor(Math.random() * 5)]._id,
        name: rec.name,
        ingredients: rec.ingredients.split("\n"),
        instructions: rec.description,
        image: images[Math.floor(Math.random() * 4)],
        recipeYield: rec.recipeYield,
        url: rec.url
      })
    );
  });

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [
    users,
    recipes
    //other models...
  ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
