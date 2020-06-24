'use strict'

// -- imports

const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
// This is how express does it: https://expressjs.com/en/guide/routing.html
// Can't fix that :-(

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
