const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

/* Complete this */
const getUserByGitHubIdOrCreate = (profile) => {
  try {
    const user = userModel.findById(profile.id);
    return user;
  } catch (err) {     // if no user found by that GitHub ID
    let newUser = userModel.createGitHubUser(profile);
    console.log(`GitHub profile information: ${profile}`);
    return newUser;
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};