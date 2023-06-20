const Board = require("../models/Board.model");

const createBoard = async (input) => {
  try {
    return Board.create(input);
  } catch (error) {
    throw error;
  }
};

const getAllBoards = async () => {
  return await Board.find();
};

module.exports = { createBoard, getAllBoards };
