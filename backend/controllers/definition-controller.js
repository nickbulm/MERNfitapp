const Definition = require("../db/models/definition-model");

const getDefinitions = async (req, res) => {
    try {
      const definitions = await Definition.find({});
      return res.status(200).json({ success: true, data: definitions });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  module.exports = {
    //createSession,
    getDefinitions,
    //deleteSession
  };