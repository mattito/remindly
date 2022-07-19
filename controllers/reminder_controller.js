let Database = require("../database.js");
// let myid = 0;
let remindersController = {
  list: function(req, res) {
    res.render("reminders/index", {reminders: Database.cindy.reminders});
  },
  new: function(req,res) {
    res.render("reminders/create"); // corresponds to reminders/create.ejs page
  },
  create: function(req, res) {      // info from browser POST request is in req
    let reminder = {
      id: Database.cindy.reminders.length + 1,    // some ID that uniquely identifies this reminder
      title: req.body.title,
      description: req.body.description,
      completed: false
    };
    Database.cindy.reminders.push(reminder);
    // Redirect to the /reminders page
    res.redirect("/reminders");
  },
  listOne: function(req, res) {
    let reminderToFind = parseInt(req.params.id);
    let searchResult = Database.cindy.reminders.find(function(reminder) {
      return parseInt(reminder.id) === reminderToFind;
    });
    // console.log(searchResult);
    if(searchResult != undefined) {    // Can this be rewritten if (!searchResult) { ... }
      res.render("reminders/single-reminder", {reminderItem: searchResult});
    } else {
      res.redirect("/reminders");
    }
  },
  edit: function(req, res) {
    // Find the reminder corresponding to the id
    let reminderToFind = parseInt(req.params.id);
    let reminders = Database.cindy.reminders;
    let searchResult = reminders.find(reminder => parseInt(reminder.id) === reminderToFind);

    res.render("reminders/edit", { reminderItem: searchResult });
  },
  update: function(req, res) {
    // Find the reminder corresponding to the id
    let reminderToFind = parseInt(req.params.id);
    let reminders = Database.cindy.reminders;
    let searchResult = reminders.find(reminder => parseInt(reminder.id) === reminderToFind);
    // Modify reminder's title and description
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    res.redirect("/reminders");
  },
  delete: function(req,res) {
    let reminderToDelete = parseInt(req.params.id);

    let reminders = Database.cindy.reminders;
    // use findIndex() instead of find()?
    let searchResult = reminders.find(function(reminder) {
      return parseInt(reminder.id) === reminderToDelete;
    });

    // Delete the designated reminder.  Adjust indices for other reminders?
    reminders.splice(reminderToDelete - 1, 1);

    for (let i = reminderToDelete; i <= reminders.length; i++) {
      reminders[i-1].id -= 1;     // renumber id's of extant reminders
    }
    res.redirect("/reminders");
    
    /* 
      Option 1: delete the selected reminder and create a sparse array.
          Problems: Depending on the number of reminders deleted/added over time, the sparse array would become too large.
      Option 2: splice the new array, remove the reminder and renumber the id's of the remaining reminders, if any.
     */
  }

}


module.exports = remindersController;