'use strict'

var app = require('./app.js')

const port = 3005

app.listen(port, () => {
    console.log('listening on localhost:' + port)
})