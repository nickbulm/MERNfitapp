const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema(
    {
        username: {
          type: String,
          required: true
        },
        password: {
            type: String,
            required: true,
        },
        data_joined: {
          type: Date
        },
        accounttype: {
          type: String,
        },
        first_name: {
          type: String,
          required: [true, "First name required."]
        },
        last_name: {
          type: String,
          required: [true, "Last name required."]
        },
        email_address: {
          type: String,
          required: [true, "Email address required"]
        },
        staff_status: {
          type: Boolean,
          default: false
        },
        active: {
          type: Boolean
        },
        last_login: {
          type: Date,
          default: Date.now 
        }
      }
)

module.exports = mongoose.model('User', User);