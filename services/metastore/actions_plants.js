'use strict'

// -- imports

const fs = require('fs')
const path = require('path')

// -- actions

const actions = { }

actions.plants = {
  get: (req, res) => {
    res.status(200).send(db.getAllPlants())
  },
  post: (req, res) => {
    if (db.createPlant(req.body)) {
      res.status(201).send()
    } else {
      res.status(409).send({ error: 'Plant with same "id" exists already.' })
    }
  }
}

actions.plants.id = {
  get: (req, res) => {
    const plant = db.getPlantById(req.params.id)
    if (plant) {
      res.status(200).send(plant)
    } else {
      res.status(404).send({ error: 'Device with given "id" does not exist.' })
    }
  },
  put: (req, res) => {
    db.updatePlantById(req.params.id, req.body)
    res.status(200).send()
  },
  delete: (req, res) => {
    if (db.deletePlantById(req.params.id)) {
      res.status(204).end()
    } else {
      // tbd
    }
  }
}

actions.plants.id.profilePicture = {
  get: (req, res) => {
    const plant = db.getPlantById(req.params.id)

    if (!plant) {
      res.status(404).send({
        error: 'plant does not exist'
      })
    } else {
      if (plant.profilePicture && fs.existsSync(path.join(__dirname, 'store', 'blob', plant.profilePicture))) {
        res.sendFile(path.join(__dirname, 'store', 'blob', plant.profilePicture))
      } else {
        res.status(404).send({
          error: 'plant has no profile picture'
        })
      }
    }
  },
  put: (req, res) => {
    // console.log('req.file', req.file) // HIER!

    const filename = 'plants-' + req.params.id + '-profilePicture.' + req.file.mimetype.split('/')[1]
    // security: is this a possible security issue? Can this be exploited by passing mime types that somehow allow to execute code? Better solution would be to use a mapping between mime type and file type extension and use a generic/none extension for all that are not part of the list. Using fileFilter in Multer should do the job as well.

    // store file in blob storage following naming scheme:
    try {
      fs.writeFileSync(path.join('store', 'blob', filename), req.file.buffer)
    } catch (err) {
      res.status(500).send({ error: 'Could not save profile picture.' })
      return -1
    }

    // link filename in plant object:
    const plant = db.getPlantById(req.params.id)
    plant.profilePicture = filename
    db.updatePlantById(req.params.id, plant)

    // return status:
    res.status(200).end()
  }
}

actions.plants.id.attachedDevices = {
  get: (req, res) => {
    const plant = db.getPlantById(req.params.id)

    if (plant) {
      if (plant.attachedDevices) {
        res.status(200).send(plant.attachedDevices)
      } else {
        res.status(200).send([])
      }
    } else {
      res.status(404).send({ error: 'plant does not exist' })
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

  db.writeToDatabase([...plants, object])

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

  db.writeToDatabase(plants)
}

db.deletePlantById = function (plantId) {
  const plants = db.getAllPlants()

  const plantsNew = plants.filter((x) => {
    return x.id !== plantId
  })

  db.writeToDatabase(plantsNew)

  return true
}

db.writeToDatabase = function (object) {
  fs.writeFileSync('store/plants.json', JSON.stringify(object))
}

// -- exports

module.exports = actions
