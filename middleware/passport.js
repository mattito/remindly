const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user ? done(null, user) : done(null, false, {
        message: "Your login details are not valid.  Please try again",
      });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: process.env['GITHUB_ID'],
    clientSecret: process.env['GITHUB_SECRET'],
    callbackURL: "http://localhost:8001/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('profile in githubLogin ', profile);
    let user = userController.getUserByGitHubIdOrCreate(profile);
    // return cb(null, user);  // The original suggestion was to include this...?
    return done(null, user);
  }
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id); 
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(githubLogin).use(localLogin);
