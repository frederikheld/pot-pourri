const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  profilePicture: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Plant', plantSchema)
