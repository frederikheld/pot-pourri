'use strict'

// -- imports

const fs = require('fs')

// -- actions

const actions = {}

actions.devices = {
  // GET
  getAll: (req, res) => {
    res.status(200).send(getDevices())
  },
  getDeviceById: (req, res) => {
    res.status(200).send(getDeviceById(req.params.id))
  },

  // POST
  create: (req, res) => {
    if (createDevice(req.body)) {
      res.status(201).send()
    } else {
      res.status(409).send({ error: 'Device with same "id" exists already!' })
    }
  }
}

// -- database functions
/**
 * For the sake of simplicity, the database is just
 * a couple of files that contain arrays of objects.
 * If performance becomes an issue, this should be
 * easy to replace.
 */

const getDevices = function () {
  return JSON.parse(fs.readFileSync('store/devices.json'))
}

const getDeviceById = function (id) {
  const devices = getDevices()
  // eslint-disable-next-line eqeqeq
  return devices.find((x) => x.id == id)
  // note: it is intentional that this is not === as the id can be int or string
}

const createDevice = function (object) {
  const devices = getDevices()

  // eslint-disable-next-line eqeqeq
  if (devices.find((x) => x.id == object.id)) {
    return false
  }

  fs.writeFileSync('store/devices.json', JSON.stringify([...devices, object]))

  return true
}

// -- exports

module.exports = actions
