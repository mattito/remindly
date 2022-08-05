const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 8001;
require('dotenv').config();
// console.log(process.env['GITHUB_ID'], process.env['GITHUB_SECRET']);


const app = express();
// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// User session object
const session_ = {
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
};
app.use(session(session_));

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const helpRoute = require("./routes/helpRoute");
const remindersRoute = require("./routes/remindersRoute");

// Middleware for Express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());                 // start up passport
app.use(passport.session());                    // hook into Express session

// Routes
// For Testing
app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/reminders", remindersRoute);
app.use("/help", helpRoute);



// http:localhost:8001
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
