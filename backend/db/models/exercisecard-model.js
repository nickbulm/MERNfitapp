const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExerciseCard = new Schema(

    {
      session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true
      },
      exercise: {
        type: String,
        required: [true, "Exercise required."]
      },
      card_no:{
        type: String,
        default: "A",
        required: [true, "Card number required."]
        },
      variation1:{
        type: String
        },
      variation2:{
        type: String
       },
      equpiment1: {
        type: String
      },
      equipment2:{
          type: String
      },
      rest: {
        type: String,
        default: "00:00",
      },
      tempo: {
        type: String,
        default: "0/0/0/0",
      },
      inputs: {
        type: [
          {
            input_type:{ 
              type: String,
              default: "Reps"
            },
            completed: {
                type: Boolean
            },
            sets: {
              type: [
                {
                  completed: {
                    type: Boolean
                    },
                  value: {
                    type: String
                    }
                }
              ],
              default: undefined 
            }
          }
        ],
        default: undefined
      },      
      comment: {
        type: String
      }
    }
)

ExerciseCard.statics.updateOrCreate = async function(card) {
  if (!card._id){
    try {
      let newcard = await this.create(card)
      return newcard.save()
    }catch(error){
      console.log(error)
    }
  }
  try {
    let updated = await this.findByIdAndUpdate({id: card._id}, card, {new:true, useFindAndModify: false})
    return updated
  } catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('ExerciseCard', ExerciseCard);