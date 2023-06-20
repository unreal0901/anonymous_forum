const { createReply, getAllReplies } = require("../services/reply.service");

module.exports.createReplyHandler = async (req, res, next) => {
  try {
    const reply = await createReply({
      threadId: req.body.threadId,
      parentReplyId: req.body.parentReplyId || null,
      text: req.body.text,
      user: req.body.user,
      userIP: req.ip,
    });
    reply.save();
    res.status(201).json({
      message: "Reply created",
      data: reply,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllRepliesHandler = async (req, res, next) => {
  try {
    const replies = await getAllReplies();
    res.status(200).json({
      message: "All replies fetched",
      data: replies,
    });
  } catch (error) {
    next(error);
  }
};
