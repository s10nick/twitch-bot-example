const mongoose = require('mongoose')
const { Schema } = mongoose;
const schema = new Schema({
    name: String,
    type: String,
    channels: [String],
    chatTrigger: Boolean,
    responseText: String,
    updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Triggers', schema)