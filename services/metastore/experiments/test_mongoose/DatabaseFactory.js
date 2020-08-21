'use strict'

const mongoose = require('mongoose')

const Plant = require('./schemas/plant')

const databaseFactory = async function (connectionString) {
  // set mongoose options:
  const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000
  }

  // create connection:
  let connection
  try {
    connection = await mongoose.createConnection(connectionString, mongooseOptions)
  } catch (error) {
    if (error.name === 'MongoParseError') {
      throw new Error('Malformed connection string')
    }

    if (error.message.match(/ECONNREFUSED/)) {
      throw new Error('Can\'t connect to database')
    }
  }

  // add models:
  mongoose.connection.model('Plant', Plant)

  // return connection
  return connection
}

module.exports = databaseFactory
