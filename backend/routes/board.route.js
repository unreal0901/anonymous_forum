const express = require("express");
const {
  createBoardHandler,
  getAllBoardHandler,
} = require("../controllers/board.controller");
const router = express.Router();

router.get("/", getAllBoardHandler);
router.post("/create", createBoardHandler);

module.exports = router;
