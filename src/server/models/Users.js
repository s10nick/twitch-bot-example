const mongoose = require('mongoose')
const { Schema } = mongoose;
const schema = new Schema({
    twitchId: String,
    profile: Object
})

module.exports = mongoose.model('Users', schema)
