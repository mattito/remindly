const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
    reminders: [],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
    reminders: [],
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    reminders: [],
  },
  {
    id: 4,
    name: "Matthew Quiring",
    email: "mattquiring06@gmail.com",
    password: "matt06",
    role: "admin",
    reminders: [],
  },
  {
    id: 5,
    name: "Jonathan",
    email: "jonathan1324@gmail.com",
    password: "registereduser1324!",
    role: "user",
    reminders: [],
  }
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  createGitHubUser: (profile) => {
    let newUser = {
      id: profile.id,
      name: profile.displayName,
      role: "user",
      reminders: []
    };
    database.push(newUser);
    return newUser;
  },
};


module.exports = { database, userModel };