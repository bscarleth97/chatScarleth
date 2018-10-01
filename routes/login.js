var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (req.user) {
    res.redirect("/profile");
  } else {
    res.render("login", {
      appTitle: "Rockstars",
      t1: "Introduce your username and password"
    });
  }
});

module.exports = router;
