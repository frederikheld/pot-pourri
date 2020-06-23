'use strict'

// -- imports

const express = require('express')
const router = express.Router()

const actions = require('./actions')


// -- routes

router.route('/').get((req, res) => {
    res.status(200).send('Hello World! :-)')
})

router.route('/devices').get(actions.devices.getAll)

router.route('/devices/:id').get(actions.devices.getDeviceById)


// -- exports

module.exports = router