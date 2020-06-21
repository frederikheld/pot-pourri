'use strict'

// -- imports

const express = require('express')
const app = express()

const routes = require('./routes')
app.use('/api', routes)


// -- server

const server = app.listen(3003, () => {
    const port = server.address().port
    console.log('Metastore server is listening on port %s', port)
})


// -- exports

module.exports = server