const express = require("express");
const verifyToken = require("../db/verifyToken");
const ProgramController = require("../controllers/program-controller");

const router = express.Router();

router.post("/program", verifyToken, ProgramController.createProgram);
router.put("/program/:id", verifyToken, ProgramController.updateProgram);
router.delete("/program/:id", verifyToken, ProgramController.deleteProgram);
router.get("/program/:id", verifyToken, ProgramController.getProgramByID);
router.get("/program", verifyToken, ProgramController.getPrograms);

module.exports = router;