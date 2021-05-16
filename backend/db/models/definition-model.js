const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Definition = new Schema(
    {
        name: {
          type: String,
          required: true
        },
        classification: {
          type: String
        },
        input_type: {
          type: String
        },
        initials: {
          type: String
        },
        description: {
          type: String
        }
      },
      { timestamps: true }
)

module.exports = mongoose.model('Definition', Definition);