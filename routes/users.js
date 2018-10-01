var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("indexUsers", {
    appTitle: "Rockstars Users",
    title: "Rockstars Users"
  });
});

module.exports = router;
