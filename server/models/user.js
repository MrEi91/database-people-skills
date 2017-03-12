'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  skills: [{
    name: {
      type: String,
      require: true,
      unique: true
    },
    score: Number
  }]
}, {
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user
