'use strict'

// -- imports

const fs = require('fs')


// -- actions

let actions = {}

actions.hello = (req, res) => {
    res.status(200).send('Hello World!')
}

actions.devices = {
    get: (req,res) => {
        const devices = JSON.parse(fs.readFileSync('store/devices.json'))
        res.status(200).send(devices)
    }
}


// -- exports

module.exports = actions