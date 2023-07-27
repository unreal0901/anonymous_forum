const { Reply } = require("../models/Reply.model");
const Thread = require("../models/Thread.model");
const AppError = require("../utils/appError");

const createReply = async (payload) => {
  try {
    const reply = await Reply.create(payload);
    return reply;
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to create reply", 400);
  }
};

const getAllReplies = async () => {
  try {
    const replies = await Reply.find();
    return replies;
  } catch (error) {
    throw new Error("Failed to fetch replies");
  }
};

const getAllChildReplies = async (parentReplyId) => {
  try {
    // Find all replies that have the specified parentReplyId and sort them by createdAt in ascending order
    const childReplies = await Reply.find({ parentReplyId }).sort({
      createdAt: 1,
    });
    return childReplies;
  } catch (error) {
    throw new Error("Failed to fetch parent Replies");
  }
};

module.exports = { createReply, getAllReplies, getAllChildReplies };
