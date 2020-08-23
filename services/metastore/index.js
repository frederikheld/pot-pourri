'use strict'

/**
 * This script starts the server for production.
 */

const server = require('./server')

try {
  // Docker-internal hostname and port here!
  server.initDB('mongodb://mongodb:27017/pot-pourri')

  server.initBlobStorage('./store/blob')
} catch (error) {
  console.error('ERROR: ' + error)
}
