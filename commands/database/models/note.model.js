const mongoose = require('mongoose')
const Schema = mongoose.Schema

let noteSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    text: { type: String, required: true },
    postedBy: { type: String, required: true },
})

// Export the model
module.exports = mongoose.model('Note', noteSchema)
