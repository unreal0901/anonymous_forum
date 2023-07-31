const express = require("express");
const {
  getAllRepliesHandler,
  createReplyHandler,
  getThreadRepliesHandler,
} = require("../controllers/reply.controller");

const router = express.Router();

router.get("/replies", getAllRepliesHandler);
router.get("/thread", getThreadRepliesHandler);
router.post("/create", createReplyHandler);

module.exports = router;
