'use strict'

// -- imports

const fs = require('fs')

// -- actions

const actions = {}

actions.devices = {
  get: (req, res) => {
    res.status(200).send(db.getAllDevices())
  },
  post: (req, res) => {
    if (db.createDevice(req.body)) {
      res.status(201).send()
    } else {
      res.status(409).send({ error: 'Device with same "id" exists already.' })
    }
  }
}

actions.devices.id = {
  get: (req, res) => {
    const device = db.getDeviceById(req.params.id)
    if (device) {
      res.status(200).send(device)
    } else {
      res.status(404).send({ error: 'Device with given "id" does not exist.' })
    }
  },
  delete: (req, res) => {
    if (db.deleteDeviceById(req.params.id)) {
      res.status(204).send()
    } else {
      // tbd
    }
  }
}

actions.devices.id.sensors = {
  get: (req, res) => {
    res.status(200).send(db.getSensorsByDeviceId(req.params.id))
  }
}

// -- database functions
/**
 * For the sake of simplicity, the database is just
 * a couple of files that contain arrays of objects.
 * If performance becomes an issue, this should be
 * easy to replace.
 */

const db = {}

db.getAllDevices = function () {
  return JSON.parse(fs.readFileSync('store/devices.json'))
}

db.getDeviceById = function (deviceId) {
  const devices = db.getAllDevices()
  return devices.find((x) => x.id === deviceId)
}

db.createDevice = function (object) {
  const devices = db.getAllDevices()

  if (devices.find((x) => x.id === object.id)) {
    return false
  }

  fs.writeFileSync('store/devices.json', JSON.stringify([...devices, object]))

  return true
}

db.deleteDeviceById = function (deviceId) {
  const devices = db.getAllDevices()

  const devicesNew = devices.filter((x) => {
    return x.id !== deviceId
  })

  fs.writeFileSync('store/devices.json', JSON.stringify(devicesNew))
  return true
}

db.getSensorsByDeviceId = function (deviceId) {
  const device = db.getDeviceById(deviceId)
  return device.sensors ? device.sensors : []
}

// -- exports

module.exports = actions
