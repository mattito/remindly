const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

// localhost:8001/auth/login 
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));// render Login page

// localhost:8001/auth/login
router.post(                        // Code executed when Login button is clicked
  "/login",                         // send email and password to LocalStrategy
  passport.authenticate("local", {  // Provide passport with a strategy to authentication
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res, next) => { // Code executed when Logout button is clicked
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect("/auth/login");
  });                      
});

// localhost:8001/auth/github
router.get("/github", passport.authenticate("github"));

// localhost:8001/auth/github/callback
router.get("/github/callback", passport.authenticate("github", { failureRedirect: '/auth/login' }),
  function (req, res) {
    res.redirect("/dashboard  ");
  });

module.exports = router;