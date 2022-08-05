const ensureAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else if (req.user.role !== 'admin') {
    res.redirect("/dashboard");
  } else {
    return next();
  }
}

module.exports = { ensureAuthenticated, forwardAuthenticated, isAdmin };



/* 
  QUESTIONS
  1. Where is the isAuthenticated() function located?  Is it part of Passport?
  2. Explain the function of next() in Express?
 */