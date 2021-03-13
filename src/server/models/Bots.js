const mongoose = require('mongoose')
const { Schema } = mongoose;
const schema = new Schema({
    debug: {
      type: Boolean,
      default: true
    },
    twitchOauth2token: {
      select: false,
      type: String,
      required: true 
    },
    channels: {
      type: [String],
      required: true
    },
    username: {
      type: String,
      default: 'sbsbot'
    },
    updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Bots', schema)