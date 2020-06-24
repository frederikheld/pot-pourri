'use strict'

// -- imports

const express = require('express')
const router = express.Router()

const actions = require('./actions')


// -- routes

router.route('/').get((req, res) => {
    res.status(200).send('Hello World! :-)')
})

router.post('/devices', actions.devices.create)
router.get('/devices', actions.devices.getAll)

router.get('/devices/:id', actions.devices.getDeviceById)


// -- exports

module.exports = router