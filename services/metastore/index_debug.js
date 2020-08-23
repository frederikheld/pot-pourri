'use strict'

const fs = require('fs')
require('dotenv').config()

/**
 * This script starts the server in a configuration that
 * can be useful if you want to debug an consumer of this API
 * (like the pot-pourri webapp).
 *
 * It is desigend to be started with `node index_debug.js`.
 */

const server = require('./server')

// cleanup from last run:
fs.rmdirSync('store', { recursive: true })
// uncomment the above line if you want to keep
// the database from the last debug run.

const contents = {
  // devices: [
  //   {
  //     name: 'foo',
  //     sensors: [
  //       { id: '0', type: 'humidity' },
  //       { id: '1', type: 'light' }
  //     ],
  //     settings: {
  //       measuringInterval: 300 // 5 minutes
  //     }
  //   },
  //   {
  //     name: 'bar',
  //     sensors: [
  //       { id: '0', type: 'humidity' },
  //       { id: '1', type: 'temperature' }
  //     ],
  //     settings: {
  //       measuringInterval: 3600 // 1 hour
  //     }
  //   },
  //   {
  //     name: 'baz'
  //   },
  //   {
  //     name: 'free'
  //   }
  // ],
  plants: [
    {
      name: 'Erika',
      profilePicture: 'plants-0-profilePicture.jpg',
      deviceCode: '0'
    },
    {
      name: 'Franzi',
      profilePicture: 'plants-1-profilePicture.jpg',
      deviceCode: '1'
    },
    {
      name: 'Basilikum',
      deviceCode: 'green'
    }
  ]
}

server.initDB('mongodb://localhost:' + process.env.MONGODB_PORT + '/pot-pourri-debug', contents, true)

server.initBlobStorage('./debug/blob')

server.initOptions({
  responseDelay: 500
})
