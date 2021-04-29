const Session = require("../db/models/session-model");

const getSessions = async (req, res) => {
    try {
      const sessions = await Session.find({});
      return res.status(200).json({ success: true, data: sessions });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  const deleteSession = async (req, res) => {
    try {
      const session = await Session.findOneAndDelete({ _id: req.params.id });
  
      if (!session) {
        return res
          .status(404)
          .json({ success: false, error: `Session not found` });
      }
      await Issue.deleteMany({ sessionId: req.params.id });
      return res.status(200).json({ success: true, id: session._id });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };

  module.exports = {
    //createProgram,
    getSessions,
    //getProgramByID,
    deleteSession
  };