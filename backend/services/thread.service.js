const Thread = require("../models/Thread.model");

const getAllThreads = async () => {
  try {
    const threads = await Thread.find().exec();
    return threads;
  } catch (error) {
    throw new AppError("Failed to retrieve threads", 500);
  }
};

const createThread = async (payload) => {
  try {
    const thread = await Thread.create(payload);
    return thread;
  } catch (error) {
    throw new AppError("Failed to create thread", 400);
  }
};

module.exports = { getAllThreads, createThread };
