'use strict'

const mongoose = require('mongoose')
require('dotenv').config()

let mongoDB = `mongodb://${process.env.HOST_NAME}/${process.env.DATABASE_NAME}`
mongoose.Promise = global.Promise
mongoose.connect(mongoDB)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB Connection error'))
