const session = require("express-session");
const MongoStore = require("connect-mongo");

// Create a new MongoDB session store
const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1/forum", // Use existing Mongoose connection
  collection: "sessions", // Collection name for storing sessions
  stringify: true,
});

module.exports = store;
