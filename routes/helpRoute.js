const express = require("express");
const router = express.Router();
// const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

//-----------------Help Route---------------------//

// http://localhost:8000/help
router.get("/", (req, res) => {
  res.send("Welcome to the Help page");
});

// http://localhost:8000/help/policy
router.get("/policy", (req, res) => {
  res.send("Welcome to the Policy page.");
});

// http://localhost:8000/help/contactus
router.get("/contactus", (req, res) => {
  res.send("Welcome to the Contact Us Page.");
});

module.exports = router;