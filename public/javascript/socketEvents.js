$(document).ready(function() {
  var socket = io.connect("http://localhost:3000");

  //Event Listeners
  socket.on("new recipe", recipe => {
    const {
      name,
      image,
      recipeYield,
      ingredients,
      instructions,
      url,
      username,
      date
    } = recipe;
    if ($("input[name='ifSearch'").val() !== "search") {
      $("#here").prepend(
        `<div class="content_box">
        <h2>${name}</h2>
        <div class="image_wrapper image_fr"><span></span><img src="${image}" style="width: 217px; height: 104px;" alt="image of recipe" /></div>
         <p style="color:blue" class="likesList"><strong>Likes: 0</strong></p>
        <p><strong>Servings: ${recipeYield}</strong></p>
        <p>${ingredients}</p>  

        <p>${instructions} <a href="${url}">${url}</a></p>
        <cite>${username} on ${date}</cite>

      </div>`
      );
    }
  });

  //Event Handlers
  $("#addRecipe").click(() => {
    let name = $("#name").val();
    let image = $("#image").val();
    let recipeYield = $("#recipeYield").val();
    let ingredients = $("#ingredients").val();
    let instructions = $("#instructions").val();
    let url = $("#url").val();
    let username = $("#ownerName").val();
    socket.emit("add recipe", {
      name,
      image,
      recipeYield,
      ingredients,
      instructions,
      url,
      username
    });
  });

  $(".like").click(e => {
    let recipeId = e.target.id.split("_")[1];
    $(`#likes_${recipeId}`).toggleClass("hidden");
  });
});
