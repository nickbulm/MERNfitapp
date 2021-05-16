const express = require("express");
const verifyToken = require("../db/verifyToken");
const WorkoutController = require("../controllers/workout-controller");

const router = express.Router();

//router.post("/program", verifyToken, ProgramController.createProgram);
//router.put("/program/:id", verifyToken, ProgramController.updateProgram);
router.delete("/workout/:id", verifyToken, WorkoutController.deleteWorkout);
router.get("/workout/:id", verifyToken, WorkoutController.getWorkoutByID);
router.get("/workout", verifyToken, WorkoutController.getWorkouts);

module.exports = router;