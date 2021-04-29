const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Program = new Schema(
    {
        creator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          //required: [true, "Client is required."]
        },
        name: {
          type: String,
          required: [true, "Name is required."]
        },
        start: {
          type: Date,
          //required: [true, "Start date required."]
        },
        viewers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        created: {
          type: Date
        },
        modified: {
          type: Date,
          default: Date.now 
        },
        quadrennial: {
          type: String
        },
        macro: {
          type: String
        },
        meso: {
          type: String
        },
        workouts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Workout"
            }
        ]
      }
)

module.exports = mongoose.model('Program', Program);