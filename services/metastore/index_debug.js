'use strict'

/**
 * This script starts the server in a configuration that
 * can be useful if you want to debug an consumer of this API
 * (like the pot-pourri webapp).
 */

const server = require('./server')

const dbContents = JSON.stringify([
  { id: 0, name: 'foo' },
  { id: 1, name: 'bar' },
  { id: 2, name: 'baz' }
])

server.initDB(dbContents)
