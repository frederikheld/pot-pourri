'use strict'

// -- IMPORTS

const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
// This is how express does it: https://expressjs.com/en/guide/routing.html
// Can't fix that :-(

const actions = {
  ...require('./actions_devices'),
  ...require('./actions_plants')
}

// -- ROUTES

// -- root

router.route('/').get((req, res) => {
  res.status(200).send('Hello World! :-)')
})

// -- devices

router.get('/devices', actions.devices.get)
router.post('/devices', actions.devices.post)

router.get('/devices/:id', actions.devices.id.get)
router.delete('/devices/:id', actions.devices.id.delete)

router.get('/devices/:id/sensors', actions.devices.id.sensors.get)

router.post('/devices/:id/settings', actions.devices.id.settings.post)

// -- plants

router.get('/plants', actions.plants.get)
router.post('/plants', actions.plants.post)

router.get('/plants/:id', actions.plants.id.get)
router.put('/plants/:id', actions.plants.id.put)
router.delete('/plants/:id', actions.plants.id.delete)

// -- EXPORTS

module.exports = router
