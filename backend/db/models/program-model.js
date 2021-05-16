const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Workout = require('./workout-model')
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
              type: ObjectId,
              ref: "Workout"
            }
        ]
      }
)

Program.statics.updateProgram = async function (condition, program) {
  let workouts = [...program.workouts]
  if (workouts === undefined) {
    await this.findByIdAndUpdate(condition._id, program, {new:true, useFindAndModify: false}, function(err, updated) {
      if(!updated){
        console.log(err)
        return err
      }
      return updated
    })
  }
  let ids = await Promise.all(workouts.map(async function(workout){
    try{
      let w = await Workout.updateOrCreate({_id: workout._id}, workout)
      return w._id
    } catch(error){
      console.log(error)
    }
  })
  )
  program.workouts = ids
  try {
    let updated = await this.findByIdAndUpdate(condition, program, {new:true, useFindAndModify: false})
    return updated
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('Program', Program);