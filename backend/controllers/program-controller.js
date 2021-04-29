const Program = require("../db/models/program-model");
const Workout = require("../db/models/workout-model");
const Session = require("../db/models/session-model");
const createProgram = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Please provide program information"
        });   
    }
    try {
        const program = new Program(body);
        await program.save()
        .then( program => {
          const workout = new Workout( {
            program: program._id,
            created: new Date()
          })
          workout.save()
          .then( workout => {
            program.workouts.push(workout._id)
            program.save()
            const session = new Session({
              workout: workout._id,
              created: new Date(),
              client: workout.program.client,
              start: new Date()
            })
            session.save()
            .then(session => {
              workout.sessions.push(session._id)
              workout.save()
            })
          })
        })
        return res.status(201).json({
            success: true,
            data: program,
            message: "New Program Created",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
            message: "Program not created."
        })
    }
};
const deleteProgram = async (req, res) => {
    try {
      const program = await Program.findOneAndDelete({ _id: req.params.id });
  
      if (!program) {
        return res
          .status(404)
          .json({ success: false, error: `Program not found` });
      }
      await Issue.deleteMany({ programId: req.params.id });
      return res.status(200).json({ success: true, id: program._id });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
const getProgramByID = async (req, res) => {
    try {
      const program = await Program.findOne({ key: req.params.key });
  
      if (!program) {
        return res
          .status(404)
          .json({ success: false, error: `Program not found` });
      }
  
      return res.status(200).json({ success: true, data: program });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
const getPrograms = async (req, res) => {
    try {
      const programs = await Program.find({});
      return res.status(200).json({ success: true, data: programs });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };

module.exports = {
    createProgram,
    getPrograms,
    getProgramByID,
    deleteProgram
  };