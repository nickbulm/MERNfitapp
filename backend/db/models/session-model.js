const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Session = new Schema(
    {
        workout: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workout",
          required: true
        },
        name: {
          type: String,
          default: "Session 1",
          required: true
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        start: {
          type: Date,
          required: [true, "Start date required."]
        },
        order: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false
        },
        completedate: {
          type: Date
        },
        created: {
            type: Date
        },
        modified: {
          type: Date,
          default: Date.now 
        },
        exerciseCards: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExerciseCard"
          }
        ]
      }
)

module.exports = mongoose.model('Session', Session);