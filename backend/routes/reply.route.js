const express = require("express");
const {
  getAllRepliesHandler,
  createReplyHandler,
} = require("../controllers/reply.controller");

const router = express.Router();

router.get("/replies", getAllRepliesHandler);
router.post("/create", createReplyHandler);

module.exports = router;
