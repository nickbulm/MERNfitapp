const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('./exercisecard-model');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const exerciseCard = require("./exercisecard-model")

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
          type: Date,
          default: Date.now
        },
        modified: {
          type: Date,
          default: Date.now 
        },
        exerciseCards: [
          {
            type: ObjectId,
            ref: "ExerciseCard"
          }
        ]
    }
)
Session.statics.updateOrCreate = async function (condition, session) {
  let s = await this.findOne(condition)
  let cards = [...session.exerciseCards]
  delete session.exerciseCards
  // if session doesnt exist
  if(!s) {
    try{
      let newsession = await this.create(session)
      if(!cards){
        return newsession
      }
      let ids = await Promise.all(cards.map(card => {
        card.session = newsession._id
        let c = new Card(card)
        c.save()
        return c._id
      }))
      newsession.exerciseCards = ids
      return newsession.save()
    } catch(error) {
      console.log(error)
    }
  }
  try {
    if (!cards){
      let updated = await this.findByIdAndUpdate(condition, session, {new: true, useFindAndModify: false})
      return updated.save()
    }
    let ids = await Promise.all(cards.map(async function(card){
      try {
        let c = await exerciseCard.updateOrCreate(card)
        return c._id
      } catch(error){
        console.log(error)
      }
    }))
    session.exerciseCards = ids
    let updated = await this.findByIdAndUpdate(condition, session, {new: true, useFindAndModify: false})
    return updated
  } catch(error) {
    console.log(error)
  }
}

module.exports = mongoose.model('Session', Session);