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
  },
  measurands: {
    humidity: {
      active: {
        type: Boolean,
        required: false,
        default: false
      },
      healthyMax: {
        type: Number,
        required: false,
        default: 100
      },
      healthyMin: {
        type: Number,
        required: false,
        default: 0
      }
    },
    temperature: {
      active: {
        type: Boolean,
        required: false,
        default: false
      },
      healthyMax: {
        type: Number,
        required: false,
        default: 100
      },
      healthyMin: {
        type: Number,
        required: false,
        default: 0
      }
    },
    light: {
      active: {
        type: Boolean,
        required: false,
        default: false
      },
      healthyMax: {
        type: Number,
        required: false,
        default: 100
      },
      healthyMin: {
        type: Number,
        required: false,
        default: 0
      }
    }
  }
})

module.exports = mongoose.model('Plant', plantSchema)
