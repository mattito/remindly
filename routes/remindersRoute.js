const express = require("express");
const router = express.Router();
const remindersController = require("../controllers/remindersController");
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");



// Case 2: User goes to localhost:8081/reminder -> Show a list of reminders
router.get("/", ensureAuthenticated, remindersController.list);

// Case 3: User goes to localhost:80831/reminder/new -> Show a CREATE A REMINDER PAGE
// Must have an active session
router.get("/new", ensureAuthenticated, remindersController.new);

// Case 4: User sends new reminders data to the server (Creating a reminder)
// QUESTION: Do I need to implement authentication here?
router.post("/", ensureAuthenticated, remindersController.create);

// Case 5: User wants to see an individual reminder
router.get("/:id", ensureAuthenticated, remindersController.listOne);  

// Case 6: User wants to edit one of their reminders
router.get("/edit/:id", ensureAuthenticated, remindersController.edit);

// Case 7: User clicks the UPDATE button from Case 6, and expects their reminder to be updated
router.post("/edit/:id", ensureAuthenticated, remindersController.update);

// Case 8: User clicks the DELETE button and the reminder will be deleted
router.post("/delete/:id", ensureAuthenticated, remindersController.delete);

module.exports = router;