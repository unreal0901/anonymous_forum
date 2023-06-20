const { getAllThreads, createThread } = require("../services/thread.service");

module.exports.getAllThreadsContoller = async (req, res, next) => {
  try {
    const threads = await getAllThreads();
    res.status(200).json({
      message: "All threads fetched",
      data: threads,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.createThreadController = async (req, res, next) => {
  try {
    const { boardId, subject, user } = req.body;

    const userIP = req.ip;
    const thread = await createThread({
      boardId,
      subject,
      user,
      userIP,
    });

    res.status(201).json({
      message: "Thread created successfully",
      data: thread,
    });
  } catch (error) {
    next(error);
  }
};
