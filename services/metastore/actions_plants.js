'use strict'

// -- imports

const fs = require('fs')
const path = require('path')

const plantService = require('./services/plant')

// -- actions

const actions = { }

actions.plants = {
  get: async (req, res) => {
    const result = await plantService.readAll()

    res.status(200).json(result)
  },
  post: async (req, res) => {
    const result = await plantService.create(req.body)

    result.id = '' + result._id

    if (!result.error) {
      res.status(201).json(result)
    } else {
      if (result.error.code === 11000) {
        res.status(409).json({ error: true, message: 'Plant with same "name" exists already' })
      } else {
        res.status(500).json({ error: true, message: 'Something went wrong' })
      }
    }
  }
}

actions.plants.id = {
  get: async (req, res) => {
    const result = await plantService.readOne(req.params.id)
    // result.id = result._id // add field "id" as unique key to be used by api consumers
    if (result && !result.error) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ error: true, message: 'Plant with given :id does not exist' })
    }
  },
  put: async (req, res) => {
    const result = await plantService.replace(req.params.id, req.body)

    if (!result) {
      res.status(200).end()
    } else {
      res.status(result.error.code).json({ error: true, message: result.error.message })
    }
  },
  patch: async (req, res) => {
    const result = await plantService.patch(req.params.id, req.body)

    if (!result) {
      res.status(200).end()
    } else {
      res.status(result.error.code).json({ error: true, message: result.error.message })
    }
  },
  delete: async (req, res) => {
    const result = await plantService.delete(req.params.id)

    if (result.success) {
      res.status(204).end()
    } else {
      res.status(404).json(result)
    }
  }
}

actions.plants.id.profilePicture = {
  get: async (req, res) => {
    const plant = await plantService.readOne(req.params.id)

    if (plant.error) {
      res.status(404).send({
        error: true,
        message: 'Plant with given :id does not exist'
      })
    } else {
      if (
        plant.profilePicture
      ) {
        const profilePicturePath = path.join(__dirname, 'store', 'blob', plant.profilePicture)
        if (fs.existsSync(profilePicturePath)) {
          res.header('content-type', 'image/jpeg')
          res.status(200).sendFile(profilePicturePath)
        } else {
          res.status(500).send({
            error: true,
            message: 'Inconsistent data on server. Please store a new profile picture!'
          })
        }
      } else {
        res.status(404).send({
          error: true,
          message: 'Plant has no profile picture'
        })
      }
    }

    // if (!plant) {
    //   res.status(404).send({
    //     error: 'plant does not exist'
    //   })
    // } else {
    //   if (plant.profilePicture && fs.existsSync(path.join(__dirname, 'store', 'blob', plant.profilePicture))) {
    //     res.sendFile(path.join(__dirname, 'store', 'blob', plant.profilePicture))
    //   } else {
    //     res.status(404).send({
    //       error: 'plant has no profile picture'
    //     })
    //   }
    // }
  },
  put: (req, res) => {
    const filename = 'plants-' + req.params.id + '-profilePicture.' + req.file.mimetype.split('/')[1]
    // security: is this a possible security issue? Can this be exploited by passing mime types that somehow allow to execute code? Better solution would be to use a mapping between mime type and file type extension and use a generic/none extension for all that are not part of the list. Using fileFilter in Multer should do the job as well.

    // store file in blob storage following naming scheme:
    try {
      fs.writeFileSync(path.join('store', 'blob', filename), req.file.buffer)
    } catch (err) {
      res.status(500).send({ error: true, message: 'Could not save profile picture' })
      return -1
    }

    // link filename in plant object:
    plantService.patch(req.params.id, { profilePicture: filename })

    // return status:
    res.status(200).end()
  }
}

// actions.plants.id.linkedDevices = {
//   get: (req, res) => {
//     const plant = db.getPlantById(req.params.id)

//     if (plant) {
//       if (plant.linkedDevices) {
//         res.status(200).send(plant.linkedDevices)
//       } else {
//         res.status(200).send([])
//       }
//     } else {
//       res.status(404).send({ error: 'plant does not exist' })
//     }
//   },
//   post: (req, res) => {
//     // save link in plant object:
//     const plant = db.getPlantById(req.params.id)

//     if (!plant.linkedDevices) {
//       plant.linkedDevices = []
//     }

//     req.body.forEach((deviceId) => {
//       plant.linkedDevices.push(deviceId)
//     })

//     db.updatePlantById(req.params.id, plant)

//     // save link in device objects:
//     req.body.forEach((deviceId) => {
//       const device = db.getDeviceById(deviceId)
//       device.linkedPlant = req.params.id

//       db.updateDeviceById(deviceId, device)
//     })

//     // send status:
//     res.status(200).send()
//   },
//   delete: (req, res) => {
//     db.unlinkDevicesFromPlant(req.params.id, req.body)

//     req.body.forEach((deviceId) => {
//       db.unlinkPlantFromDevice(deviceId)
//     })

//     res.status(204).end()
//   }
// }

// -- database functions
/**
 * For the sake of simplicity, the database is just
 * a couple of files that contain arrays of objects.
 * If performance becomes an issue, this should be
 * easy to replace.
 */

const db = {}

db.getAllPlants = function () {
  return JSON.parse(fs.readFileSync('store/plants.json'))
}

db.getPlantById = function (plantId) {
  const plants = db.getAllPlants()
  return plants.find((x) => x.id === plantId)
}

db.createPlant = function (object) {
  const plants = db.getAllPlants()

  if (plants.find((x) => x.id === object.id)) {
    return false
  }

  db.writeToDatabase('plants', [...plants, object])

  return true
}

db.updatePlantById = function (plantId, object) {
  const plants = db.getAllPlants()

  // look for existing object with given plantId:
  const arrayKey = plants.map(function (x) { return x.id }).indexOf(plantId)

  if (arrayKey > -1) {
    plants[arrayKey] = object
  } else {
    plants.push(object)
  }

  db.writeToDatabase('plants', plants)
}

db.deletePlantById = function (plantId) {
  const plants = db.getAllPlants()

  const plantsNew = plants.filter((x) => {
    return x.id !== plantId
  })

  db.writeToDatabase('plants', plantsNew)

  return true
}

db.unlinkDevicesFromPlant = function (plantId, deviceIdsArray) {
  const plant = db.getPlantById(plantId)

  const linkedDevicesNew = plant.linkedDevices.filter((element) => {
    return !deviceIdsArray.includes(element)
  })

  plant.linkedDevices = linkedDevicesNew

  db.updatePlantById(plantId, plant)

  return true
}

db.unlinkPlantFromDevice = function (deviceId) {
  const device = db.getDeviceById(deviceId)

  delete device.linkedPlant

  db.updateDeviceById(deviceId, device)
}

db.writeToDatabase = function (collection, object) {
  fs.writeFileSync('store/' + collection + '.json', JSON.stringify(object))
}

// duplicates form actions_devices.js
// TODO: make a shared library out of db!

db.getAllDevices = function () {
  return JSON.parse(fs.readFileSync('store/devices.json'))
}

db.getDeviceById = function (deviceId) {
  const devices = db.getAllDevices()
  return devices.find((x) => x.id === deviceId)
}

db.updateDeviceById = function (deviceId, object) {
  const devices = db.getAllDevices()

  // look for existing object with given deviceId:
  const arrayKey = devices.map(function (x) { return x.id }).indexOf(deviceId)

  if (arrayKey > -1) {
    devices[arrayKey] = object
  } else {
    devices.push(object)
  }

  db.writeToDatabase('devices', devices)
}

// -- exports

module.exports = actions
