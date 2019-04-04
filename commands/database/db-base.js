const mongoose = require('mongoose')

let config = require('../../config.json')
let mongoDB = process.env.MONGODB_URI || config.dbUrl

const dataB = () => {
    mongoose.connect(mongoDB)
    mongoose.Promise = global.Promise
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

module.exports = dataB
