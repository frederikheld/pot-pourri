'use strict'

// -- imports

const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// const mongoClient = require('mongodb').MongoClient

const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

app.use(function (req, res, next) { setTimeout(next, server.options.responseDelay) }) // timeout to simulate slow connections
app.use(bodyParser.json())
app.use(cors()) // TODO: How can I test if CORS is working correctly?

app.use('/api', routes)

const fs = require('fs')

// -- server

const server = app.listen(3003, () => {
  console.log('Metastore server is listening on port %s', 3003)
})

// -- database

server.initDB = function (uri, contents = {}) {
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

server.initBlobStorage = function (inputDirectory = null) {
  if (!fs.existsSync(path.join(__dirname, 'store'))) {
    fs.mkdirSync(path.join(__dirname, 'store'))
  }

  if (!fs.existsSync(path.join(__dirname, 'store', 'blob'))) {
    fs.mkdirSync(path.join(__dirname, 'store', 'blob'))
  }

  if (inputDirectory) {
    fs.readdirSync(inputDirectory).forEach((file) => {
      fs.copyFileSync(
        path.join(inputDirectory, file),
        path.join(__dirname, 'store', 'blob', file)
      )
    })
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
