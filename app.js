const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.secret || "keyboard cat",
    saveUninitialized: false,
    resave: false
  })
);

//Flash messages
const flash = require("express-flash");
app.use(flash());

// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
  var method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
    for (let key in req.query) {
      req.body[key] = decodeURIComponent(req.query[key]);
    }
  } else if (typeof req.body === "object" && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});

// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header("Referer") || "/";
  next();
});

// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// Logging
// ----------------------------------------
var morgan = require("morgan");
app.use(morgan("tiny"));
app.use((req, res, next) => {
  ["query", "params", "body"].forEach(key => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${capKey}: ${value}`);
    }
  });
  next();
});

// ----------------------------------------
// Mongoose
// ----------------------------------------
var mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")(req).then(() => next());
  }
});

//require Passport and the Local Strategy
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      console.log(user);
      if (err) return done(err);
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: "Invalid username/password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use((req, res, next) => {
  if (req.user) {
    res.locals.currentUser = req.user;
  }
  next();
});

const formatDate = require("./helpers/utilsHelpers").formatDate;

const models = require("./models");
const Recipe = mongoose.model("Recipe");
// WEBSOCKETS

app.use(
  "/socket.io",
  express.static(__dirname + "node_modules/socket.io-client/dist/")
);

io.on("connection", client => {
  client.on("add recipe", recipe => {
    recipe.date = formatDate(new Date());
    io.emit("new recipe", recipe);
  });
});

// ----------------------------------------
// Routes
// ----------------------------------------
var indexRouter = require("./routers/index");
app.use("/", indexRouter);
var recipesRouter = require("./routers/recipes");
app.use("/recipes", recipesRouter);
var adminRouter = require("./routers/admin");
app.use("/admin", adminRouter);

// ----------------------------------------
// Template Engine
// ----------------------------------------
var expressHandlebars = require("express-handlebars");
var utilsHelpers = require("./helpers/utilsHelpers");

var hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "main",
  helpers: utilsHelpers
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";
server.listen(port, function(err) {
  console.log(`listening on ${port}`);
});

// var args;
// process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

// args.push(() => {
//   console.log(`Listening: http://${host}:${port}`);
// });

// app.listen.apply(app, args);

module.exports = app;
