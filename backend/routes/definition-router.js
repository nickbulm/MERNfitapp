const express = require("express");
const verifyToken = require("../db/verifyToken");
const DefinitionController = require("../controllers/definition-controller");

const router = express.Router();

//router.post("/program", verifyToken, ProgramController.createProgram);
//router.put("/program/:id", verifyToken, ProgramController.updateProgram);
//router.delete("/exercise/:id", verifyToken, SessionController.deleteSession);
//router.get("/program/:id", verifyToken, ProgramController.getProgramByID);
router.get("/definition", verifyToken, DefinitionController.getDefinitions);

module.exports = router;