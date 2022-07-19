const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const remindersController = require("./controllers/reminder_controller");

// Create a simple Expresss.js server
app.use(express.static(__dirname + "/public"));
/* const bodyParser = require('body-parser');  // Is bodyParser deprecated?
app.use(bodyParser.urlencoded({ extended: false })); */
app.use(express.urlencoded({extended: false}));  // includes middleware that allows Express to get content from POST requests
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Case 1: User goes to localhost:8081/ -> Homepage/Marketing Page
app.get("/", (req, res) => {
  res.send("Welcome to our landing page. Marketing content goes here");
});

// Case 2: User goes to localhost:8081/reminder -> Show a list of reminders
app.get("/reminders", remindersController.list);

// Case 3: User goes to localhost:80831/reminder/new -> Show a CREATE A REMINDER PAGE
app.get("/reminders/new", remindersController.new);

// Case 4: User sends new reminders data to the server (Creating a reminder)
app.post("/reminders", remindersController.create);

// Case 5: User wants to see an individual reminder
app.get("/reminders/:id", remindersController.listOne);   // :id indicates dynamic id

// Case 6: User wants to edit one of their reminders
app.get("/reminders/edit/:id", remindersController.edit);

// Case 7: User clicks the UPDATE button from Case 6, and expects their reminder to be updated
app.post("/reminders/edit/:id", remindersController.update);

// Case 8: User clicks the DELETE button and the reminder will be deleted
app.post("/reminders/delete/:id", remindersController.delete);



// http:localhost:8081
app.listen(8081);
