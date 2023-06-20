const { Reply } = require("../models/Reply.model");
const Thread = require("../models/Thread.model");
const AppError = require("../utils/appError");

const createReply = async (payload) => {
  try {
    const { threadId, parentReplyId } = payload;
    const reply = await Reply.create(payload);

    if (!parentReplyId) {
      const thread = await Thread.findById(threadId);
      if (thread) {
        thread.replies.push(reply);
        await thread.save();
      }
    }

    return reply;
  } catch (error) {
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

module.exports = { createReply, getAllReplies };