'use strict'

/**
 * This script starts the server for production.
 *
 * It is designed to run inside the Docker container
 * specified in `Dockerfile`.
 */

const server = require('./server')

try {
  // Docker-internal hostname and port here!
  server.initDB('mongodb://mongodb:27017/pot-pourri')

  // Docker-internal relative path here!
  server.initBlobStorage('./store/blob')
} catch (error) {
  console.error('ERROR: ' + error)
}
