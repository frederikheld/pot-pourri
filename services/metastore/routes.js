'use strict'

// -- imports

const express = require('express')
const router = express.Router()

const actions = require('./actions')


// -- routes

router.route('/').get((req, res) => {
    res.status(200).send('server is running :-)')
})

router.route('/hello').get(actions.hello)

router.route('/devices').get(actions.devices.get)


// -- exports

module.exports = router