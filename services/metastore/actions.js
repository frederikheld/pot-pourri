'use strict'

// -- imports

const fs = require('fs')


// -- actions

let actions = {}

actions.devices = {
    getAll: (req, res) => {
        res.status(200).send(getDevices())
    },
    getDeviceById: (req, res) => {
        res.status(200).send(getDeviceById(req.params.id))
    }
}

// -- database functions
/**
 * For the sake of simplicity, the database is just
 * a couple of files that contain arrays of objects.
 * If performance becomes an issue, this should be
 * easy to replace.
 */

const getDevices = function() {
    return JSON.parse(fs.readFileSync('store/devices.json'))
}

const getDeviceById = function(id) {
    const devices = getDevices()
    return devices.find(x => x.id == id)
    /**
     * note: it is intentional that this is not === as the id can be int or string
     */
}

// -- exports

module.exports = actions