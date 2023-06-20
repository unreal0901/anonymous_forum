const config = require("config");
const { createBoard, getAllBoards } = require("../services/board.service");

module.exports.createBoardHandler = async (req, res, next) => {
  try {
    const board = await createBoard({
      name: req.body.name,
      description: req.body.description,
    });
    board.save();
    res.status(201).json({
      message: "Board created",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllBoardHandler = async (req, res, next) => {
  try {
    const boards = await getAllBoards();
    res.status(200).json({ message: "All boards fetched", data: boards });
  } catch (error) {
    next(error);
  }
};
