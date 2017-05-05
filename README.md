Recipe App by Egle Libby

Before using the app you should run $ npm install in your command line. Then seed database with $ npm run seeds so you wouldn't start with an empty main page. You have to have MongoDB running before doing that.

You can register a new account and login to start using the app.
If you want to sign in without registering, you can use "test" account with "test" password.

Home page contains all recipes submitted by all users. Each recipe shows number of likes it ever got. If you click on it - a list of people that liked it will appear. Click it again to hide it again.
If it's your own recipe, you have an option to edit it or delete it. If it's someone else's, you have an option to report it (if you think it shouldn't be there for some reason) or to like it. If you like it, the number of likes will increase and the button will be disabled. If you report it, an admin will get notification about it, and the button will be desabled too.
You can submit a new recipe if you click "Add recipe" in the navigation bar. (the form fields are prepopulated for easier testing). The recipe will appear immediately for all users that have main page open at the top of the feed (without refreshing the page).
You can view recipes you ever submitted if you click "My recipes" in the navigation bar.
User can search recipes by name, ingredient or instructions and get filtered results.

Admin user has different functionality. To test that, you need to login as "admin" with the password "admin". Admin has an ability to delete or edit any recipe ever submitted. Admin can view all reported recipes after clicking "Reported Recipes" in the nav bar. Admin has an option to delete all reports if he decides the recipe is good, or he edits it and makes it good. Admin cannot submit a recipe or like any recipe.

