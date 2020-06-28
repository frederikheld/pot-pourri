'use strict'

// -- imports

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.use(function (req, res, next) { setTimeout(next, server.options.responseDelay) })
app.use(bodyParser.json())
app.use(cors()) // TODO: How can I test if CORS is working correctly?
app.use('/api', routes)

const fs = require('fs')

// -- server

const server = app.listen(3003, () => {
  console.log('Metastore server is listening on port %s', 3003)
})

// -- database

server.initDB = function (contents = JSON.stringify({})) {
  if (!fs.existsSync('./store')) {
    fs.mkdirSync('./store')
  }

  if (!fs.existsSync('./store/devices.json')) {
    fs.writeFileSync('./store/devices.json', contents)
  }
}

// -- options

server.options = {
  responseDelay: 0
}

server.initOptions = function (options) {
  server.options = Object.assign({}, server.options, options)
}

// -- exports

module.exports = server
