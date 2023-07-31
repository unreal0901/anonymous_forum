const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const replySchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  parentReplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
    default: null,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  replyNumber: {
    type: String,
    unique: true,
  },
  userIP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to generate replyNumber based on counter and random component
replySchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await Reply.countDocuments();
    const randomComponent = uuidv4(); // Generate a random UUID using uuid
    this.replyNumber = `R${count}-${randomComponent}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = { Reply, replySchema };

// Basic structure of a thread will be something like this, where each thread can have multiple replies and each reply also can have multiple replies in it too.
// So baically top reply will have null as parentReplyId and all other replies will have a parentReplyId field in it, so it will use  a flat structure instead of nested one.
// {
//   "boardId": "6123456789abcdef0123456",
//   "subject": "Lorem Ipsum",
//   "user": "John Doe",
//   "userIP": "192.168.0.1",
//   "createdAt": "2023-05-15T10:30:00.000Z",
//   "replies": [
//     {
//       "threadId": "6123456789abcdef0123456",
//       "parentReplyId": null,
//       "text": "This is a reply to the thread.",
//       "user": "Jane Smith",
//       "userIP": "192.168.0.2",
//       "createdAt": "2023-05-15T11:00:00.000Z"
//     },
//     {
//       "threadId": "6123456789abcdef0123456",
//       "parentReplyId": "7123456789abcdef0123456",
//       "text": "This is a reply to another reply.",
//       "user": "Alice Johnson",
//       "userIP": "192.168.0.3",
//       "createdAt": "2023-05-15T11:30:00.000Z"
//     }
//   ]
// }
