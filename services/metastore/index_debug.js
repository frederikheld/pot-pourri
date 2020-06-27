'use strict'

/**
 * This script starts the server in a configuration that
 * can be useful if you want to debug an consumer of this API
 * (like the pot-pourri webapp).
 */

const server = require('./server')

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
  responseDelay: 1000
})
