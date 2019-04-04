const mongoose = require('mongoose')
const Schema = mongoose.Schema

let pinSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    text: { type: String, required: true },
    postedIn: { type: String, required: true },
})

// Export the model
module.exports = mongoose.model('Pin', pinSchema)
