const Workout = require("../db/models/workout-model");

const getWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find({});
      return res.status(200).json({ success: true, data: workouts });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  const getWorkoutByID = async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
  
      if (!workout) {
        return res
          .status(404)
          .json({ success: false, error: `workout not found` });
      }
      
      return res.status(200).json({ success: true, data: workout });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  const deleteWorkout = async (req, res) => {
    try {
      const workout = await Workout.findOneAndDelete({ _id: req.params.id });
  
      if (!workout) {
        return res
          .status(404)
          .json({ success: false, error: `Workout not found` });
      }
      await Issue.deleteMany({ workoutId: req.params.id });
      return res.status(200).json({ success: true, id: workout._id });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };

  module.exports = {
    //createWorkout,
    getWorkoutByID,
    getWorkouts,
    deleteWorkout,
    
  };