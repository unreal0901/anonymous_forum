const express = require("express");
const {
  getAllThreadsContoller,
  createThreadController,
} = require("../controllers/thread.controller");

const router = express.Router();

router.get("/threads", getAllThreadsContoller);
router.post("/create", createThreadController);
module.exports = router;
