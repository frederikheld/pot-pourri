const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  deviceCode: {
    type: String,
    required: false
  },
  profilePicture: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Plant', plantSchema)
