const mongoose = require('mongoose')
const Schema = mongoose.Schema

let reminderSchema = new Schema({
    text: { type: String, required: true, max: 100 },
    remindOn: { type: Array, required: true },
    postedBy: { type: String, required: true },
})

// Export the model
module.exports = mongoose.model('Reminder', reminderSchema)
