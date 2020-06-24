'use strict'

// -- imports

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use('/api', routes)

// -- server

const server = app.listen(3003, () => {
    const port = server.address().port
    console.log('Metastore server is listening on port %s', port)
})

// -- exports

module.exports = server
