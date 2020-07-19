'use strict'

// -- imports

const mongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID

// -- actions

const actions = {
  debug: { }
}

actions.debug.mongodb = {
  get: (req, res) => {
    const mongo = {
      host: 'localhost',
      port: '27017'
    }

    mongo.url = 'mongodb://' + mongo.host + ':' + mongo.port

    mongoClient.connect(mongo.url, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        res.status(500).send({
          error: error
        })
      } else {
        res.status(200).send('connection to MongoDB instance at ' + mongo.host + ':' + mongo.port + ' established')
      }

      // const database = client.db('example')
      // const collection = database.collection('devices')
    })
  }
}

// -- exports

module.exports = actions
