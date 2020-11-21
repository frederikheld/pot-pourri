'use strict'

// -- imports

const express = require('express')
const app = express()

const routes = require('./routes')
app.use('/api', routes)


// -- server

let server = app.listen(8080, () => {
    const port = server.address().port
    console.log('Server is listening on port %s', port)
})


// -- exports

module.exports = server