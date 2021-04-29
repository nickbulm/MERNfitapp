const express = require("express");
const verifyToken = require("../db/verifyToken");
const SessionController = require("../controllers/session-controller");

const router = express.Router();

//router.post("/program", verifyToken, ProgramController.createProgram);
//router.put("/program/:id", verifyToken, ProgramController.updateProgram);
router.delete("/session/:id", verifyToken, SessionController.deleteSession);
//router.get("/program/:id", verifyToken, ProgramController.getProgramByID);
router.get("/session", verifyToken, SessionController.getSessions);

module.exports = router;