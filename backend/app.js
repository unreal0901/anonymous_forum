require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const boardRouter = require("./routes/board.route");
const replyRouter = require("./routes/reply.route");
const threadRouter = require("./routes/thread.route");
const app = express();

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

// Routes
app.use("/api/boards", boardRouter);
app.use("/api/reply", replyRouter);
app.use("/api/thread", threadRouter);

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


