const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Exercise = new Schema(
    {
        name: {
          type: String,
          required: true
        },
        category: {
          type: String
        },
        classification: {
          type: String
        },
        primary_action: {
          type: String
        },
        secondary_action1: {
          type: String
        },
        secondary_action2: {
          type: String
        },
        primary_muscle: {
          type: String
        },
        synergist1: {
          type: String
        },
        synergist2: {
          type: String
        },
        equipment1: {
          type: String
        },
        equipment2: {
          type: String
        },
        media: {
          type: String
        },
        instructions: {
          type: String
        }
      },
      { timestamps: true }
)

module.exports = mongoose.model('Exercise', Exercise);