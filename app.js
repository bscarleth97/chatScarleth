var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var login = require("./routes/login");
var profile = require("./routes/profile");
var app = express();

const SpotifyStrategy = require("passport-spotify").Strategy;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: "6f3c711205ea47f19492adcdd6943d66",
      clientSecret: "5a5daf69984d4ca6a7045a7001dda274",
      callbackURL: "http://localhost:3000/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

var authRouter = require("./routes/auth")(app, express, passport);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", login);
app.use("/profile", profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//var passport = express();

module.exports = app;
