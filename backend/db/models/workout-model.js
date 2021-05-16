const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Session = require("./session-model")
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
              type: ObjectId,
              ref: "Session"
            }
        ]
      }
)
Workout.statics.updateOrCreate = async function (condition, workout) {
  let result = await this.findOne(condition)
  let sessions = [...workout.sessions]
  delete workout.sessions
  // if new workout
  if(!result) {
    // if no sessions
    if(sessions === undefined){
      try {
        let newworkout = await this.create(workout)
        return newworkout
      } catch(error) {
        console.log(error)
      }
    }
    // if sessions create newworkout 
    try {
      let newworkout = await this.create(workout)
      let ids = await Promise.all(sessions.map(async function(session){
        session.workout = newworkout._id
        let newsession = await new Session(session)
        newsession.save()
        return newsession._id
      }))
      newworkout.sessions = ids
      newworkout.save()
      return newworkout
    }catch(error){
      console.log(error)
    }
  }
// workout exists
  // no sessions
  if(sessions === undefined) {
    try {
      let updated = await this.findByIdAndUpdate(condition._id, workout, {new:true, useFindAndModify: false})
      return updated
    }catch (error){
      console.log(error)
    }
  }
  // if sessions update or create session
  let ids = await Promise.all(sessions.map(async function(session) {
    try {
      let s = await Session.updateOrCreate({_id:session._id}, session)
      return s._id
    }catch(error) {
      console.log(error)
    }
  }))
  try {
    workout.sessions = ids
    let w = await this.findByIdAndUpdate(condition._id, workout, {new:true, useFindAndModify: false})
    return w
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('Workout', Workout);