require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const session = require("express-session");

const store = require("./utils/sessionStore");

// Routers
const boardRouter = require("./routes/board.route");
const replyRouter = require("./routes/reply.route");
const threadRouter = require("./routes/thread.route");
const { defaultSession } = require("./middleware/sessionCreator");

const app = express();

// Setting session and storing them in mongo store on basis of ip of user:
app.use(
  session({
    secret: config.get("sessionSecret"),
    resave: false,
    saveUninitialized: true,
    store: store,
    genid: (req) => {
      const userIP = req.ip;
      const sessionIdPrefix = "user-session:";
      return `${sessionIdPrefix}${userIP}`;
    },
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
  })
);

// 1. Body parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie parser
app.use(cookieParser());

const allowedOrigins = [config.get("origin")];

// 3.Cors
app.use(cors({ origin: allowedOrigins, credentials: true }));

//4. logger
console.log(config.get("deployStage"));
if (config.get("deployStage") === "development") app.use(morgan("dev"));

//Default Session creator
app.use(defaultSession);

// Routes
app.use("/api/boards", boardRouter);
app.use("/api/reply", replyRouter);
app.use("/api/thread", threadRouter);

// Route to update an_name and an_pass in the session
app.get("/updateSessionData", (req, res) => {
  // Check if the session exists
  if (!req.session) {
    return res.status(404).json({ error: "Session not found" });
  }

  // Update the an_name and an_pass properties in the session
  req.session.an_name = "updated_name";
  req.session.an_pass = "updated_password";

  // Save the updated session to the database with the user's IP address as the key
  const sessionKey = `user-session:${req.ip}`;
  store.set(sessionKey, req.session, (err) => {
    if (err) {
      console.error("Error saving session to the database:", err);
    }
    res.send("Session data updated");
  });
});

// Testing
app.get("/api/healthChecker", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Anonymous forum working fine",
  });
});

// unknown routes
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global error handler middleware
// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});

module.exports = app;
