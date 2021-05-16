const Exercise = require("../db/models/exercise-model");

const getExercises = async (req, res) => {
    try {
      const exercises = await Exercise.find({});
      return res.status(200).json({ success: true, data: exercises });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  module.exports = {
    //createSession,
    getExercises,
    //deleteSession
  };