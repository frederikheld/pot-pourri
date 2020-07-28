'use strict'

// make sure this is exactly the same version
// as in ../docker-compose.yml! Otherwies the
// tests might yield different results than
// your production environment.
//
// NOTE: first test run might take a while as
//       mongodb-memory-server will download
//       the binaries.
process.env.MONGOMS_DOWNLOAD_URL = 'https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz'
process.env.MONGOMS_VERSION = '4.2.8'

const mongoose = require('mongoose')
// mongoose.promise = Promise

const { MongoMemoryServer } = require('mongodb-memory-server')
const { ObjectID } = require('mongodb')

const MongoMemoryServerHandler = { }

/**
 * Starts an in-memory database instance.
 */
MongoMemoryServerHandler.start = async () => {
  this.mongod = new MongoMemoryServer()

  this.connectionString = await this.mongod.getConnectionString()
  this.uri = await this.mongod.getUri()
  this.dbName = await this.mongod.getDbName()
  this.dbPath = await this.mongod.getDbPath()
  this.instanceinfo = await this.mongod.getInstanceInfo()

  const mongooseOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  await mongoose.connect(this.connectionString, mongooseOpts)
}

MongoMemoryServerHandler.getConnectionString = () => {
  return this.connectionString
}

MongoMemoryServerHandler.getUri = () => {
  return this.uri
}

MongoMemoryServerHandler.getDbName = () => {
  return this.dbName
}

MongoMemoryServerHandler.getDbPath = () => {
  return this.dbPath
}

MongoMemoryServerHandler.getInstanceInfo = () => {
  return this.instanceInfo
}

MongoMemoryServerHandler.getDbInstance = () => {
  return this.mongod.runningInstance
}

/**
 * Initailizes the database with the passed nested object of arrays.
 *
 * The object key defines the collection, the array entries are
 * objects that need to fit the specified database scheme.
 *
 * Returns an array of all entries including the meta data
 * created by the database engine. This can be used as
 * mock data for testing.
 */
MongoMemoryServerHandler.init = async (initObject) => {
  // const objectModelMapping = {
  //   plants: 'plant',
  //   devices: 'device'
  // }
  const dbObjects = {}
  const keys = Object.keys(initObject)
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'plants') {
      dbObjects.plants = []
      const PlantModel = require('../models/plant')

      for (let j = 0; j < initObject[keys[i]].length; j++) {
        const plantModel = new PlantModel(initObject[keys[i]][j])
        const result = await plantModel.save()

        const newObject = JSON.parse(JSON.stringify(result))
        newObject._id = new ObjectID(newObject._id) // restore original ObjectID
        dbObjects.plants.push(newObject)
      }

      await PlantModel.createIndexes() // [1]
    } else
    if (keys[i] === 'devices') {
      dbObjects.devices = []
      const DeviceModel = require('../models/device')

      for (let j = 0; j < initObject[keys[i]].length; j++) {
        const deviceModel = new DeviceModel(initObject[keys[i]][j])
        const result = await deviceModel.save()
        dbObjects.devices.push(JSON.parse(JSON.stringify(result)))
      }

      await DeviceModel.createIndexes() // [1]
    }
  }

  // [1]: This is a workaround to make unique indices working
  //      Source: https://github.com/nodkz/mongodb-memory-server/issues/102

  // Using for instead of forEach is another workaround as
  // async/await doesn't work inside forEach loops.

  return dbObjects
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
  // await Promise.all(['plants', 'devices'].map((c) => mongoose.connection.collection(c).deleteMany({})))
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
