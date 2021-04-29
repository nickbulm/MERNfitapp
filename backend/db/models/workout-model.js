const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Workout = new Schema(
    {
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true
        },
        name: {
          type: String,
          default: "Workout 1",
          required: true
        },
        order: {
          type: Number,
          default: 0,
          required: true
        },
        warmup: {
          type: String
        },
        cooldown: {
          type: String
        },
        created: {
            type: Date
        },
        modified: {
            type: Date,
            default: Date.now 
        },
        sessions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }
        ]
      }
)

module.exports = mongoose.model('Workout', Workout);