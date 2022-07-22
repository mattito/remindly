const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

//------------------------Landing Page-------------------------------//
router.get("/", (req, res) => {
  res.send("Welcome to our landing page. Marketing content goes here");
});

//-----------------------Dashboard Page-----------------------------//
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = router;