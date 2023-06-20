const mongoose = require("mongoose");
const { replySchema } = require("./Reply.model");

const threadSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  userIP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema],
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
