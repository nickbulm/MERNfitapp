const express = require("express");
const verifyToken = require("../db/verifyToken");
const ExerciseController = require("../controllers/exercise-controller");

const router = express.Router();

//router.post("/program", verifyToken, ProgramController.createProgram);
//router.put("/program/:id", verifyToken, ProgramController.updateProgram);
//router.delete("/exercise/:id", verifyToken, SessionController.deleteSession);
//router.get("/program/:id", verifyToken, ProgramController.getProgramByID);
router.get("/exercise", verifyToken, ExerciseController.getExercises);

module.exports = router;