'use strict'

const mongoose = require('mongoose')
mongoose.promise = Promise

const { MongoMemoryServer } = require('mongodb-memory-server')

const MongoMemoryServerHandler = { }

/**
 * Starts an in-memory database instance.
 */
MongoMemoryServerHandler.start = async () => {
  this.mongod = new MongoMemoryServer()

  const uri = await this.mongod.getConnectionString()

  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }

  await mongoose.connect(uri, mongooseOpts)
}

/**
 * Initailizes the database with the passed data.
 */
MongoMemoryServerHandler.init = async (initObject) => {
  // TODO
}

/**
 * Clears the database.
 *
 * Can be called in afterEach() if
 * this.stop() is only called in after().
 * Doesn't need to be used if this.stop()
 * is called in afterEach() as deleting the
 * database will automatically clear all data.
 */
MongoMemoryServerHandler.clear = async () => {
  await mongoose.connection.dropDatabase()
}

/**
 * Stops the in-memory database instance.
 */
MongoMemoryServerHandler.stop = async () => {
  // close connection to in-memory db:
  await mongoose.connection.close()

  // delete schemas:
  // source: https://groups.google.com/forum/#!topic/mongoose-orm/rx2JmGB7Nr0
  // note: Aaron Heckman appears to be a mongoose developer of that time
  Object.keys(mongoose.models).forEach((key) => {
    delete mongoose.models[key]
  })

  Object.keys(mongoose.modelSchemas).forEach((key) => {
    delete mongoose.modelSchemas[key]
  })

  // stop in-memory db:
  await this.mongod.stop()
}

module.exports = MongoMemoryServerHandler
