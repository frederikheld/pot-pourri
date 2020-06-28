'use strict'

const fs = require('fs')

/**
 * This script starts the server in a configuration that
 * can be useful if you want to debug an consumer of this API
 * (like the pot-pourri webapp).
 */

const server = require('./server')

// cleanup from last run:
fs.rmdirSync('store', { recursive: true })
// uncomment the above line if you want to keep
// the database from the last debug run.

server.initDB(JSON.stringify([
  {
    id: '0',
    name: 'foo',
    sensors: [
      { id: '0', type: 'humidity' },
      { id: '1', type: 'light' }
    ],
    settings: {
      measuringInterval: 300 // 5 minutes
    }
  },
  {
    id: '1',
    name: 'bar',
    sensors: [
      { id: '0', type: 'humidity' },
      { id: '1', type: 'temperature' }
    ],
    settings: {
      measuringInterval: 3600 // 1 hour
    }
  },
  {
    id: '2',
    name: 'baz'
  }
]))

server.initOptions({
  responseDelay: 500
})
