'use strict'

/**
 * This script starts the server for production.
 */

require('dotenv').config()

const server = require('./server')

server.initDB('mongodb://localhost:' + process.env.MONGODB_PORT + '/pot-pourri')
