'use strict'

// -- IMPORTS

const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
// This is how express does it: https://expressjs.com/en/guide/routing.html
// Can't fix that :-(

// info: multer handles file uploads (multipart/form-data)
// see: https://github.com/expressjs/multer
const multer = require('multer')
const multerUpload = multer({
  storage: multer.memoryStorage(),
  // storage: multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'store/blob/temp')
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now())
  //   }
  // }),
  // limits: {
  //   fileSize: 5 * 1000 * 1000 // 5 MB
  // },
  fileFilter: (req, file, cb) => {
    // const allowedMimeTypes = [
    //   'image/png',
    //   'image/jpg',
    //   'image/jpeg'
    // ]

    // if (file.header in allowedMimeTypes) {
    cb(null, true)
    // } else {
    //   cb(new Error('media type not allowed'), false)
    // }
  }
})

const actions = {
  ...require('./actions_devices'),
  ...require('./actions_plants'),
  ...require('./actions_debug')
}

// -- ROUTES

// -- root

router.route('/').get((req, res) => {
  res.status(200).send({
    message: 'Hello World! :-)'
  })
})

// -- debug:

router.get('/debug/mongodb', actions.debug.mongodb.get)

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
router.patch('/plants/:id', actions.plants.id.patch)
router.delete('/plants/:id', actions.plants.id.delete)

router.get(
  '/plants/:id/profile-picture',
  actions.plants.id.profilePicture.get
)
router.put(
  '/plants/:id/profile-picture',
  multerUpload.single('profilePicture'),
  actions.plants.id.profilePicture.put
)

// router.get('/plants/:id/linked-devices', actions.plants.id.linkedDevices.get)
// router.post('/plants/:id/linked-devices', actions.plants.id.linkedDevices.post)
// router.delete('/plants/:id/linked-devices', actions.plants.id.linkedDevices.delete)

// -- EXPORTS

module.exports = router
