'use strict'

var express = require('express')
var app = express()


// -- config

var port = process.env.PORT || 3000

// -- /config

app.listen(port, () => {
    console.log("API is listening on port %s ", port)
})