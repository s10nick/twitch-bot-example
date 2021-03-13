const mongoose = require('mongoose')
const { Schema } = mongoose;
const schema = new Schema({
    channels: {
      type: [String],
      required: false
    },
    botId: {
      type: String,
      default: '5c68bf9eb5f91c25201fe9f1'
    },
    status: Boolean,
    message: String,
    minDelay: Number,
    minChatMessages: Number,
    updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Messages', schema)