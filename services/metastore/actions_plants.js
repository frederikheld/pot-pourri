'use strict'

// -- imports

const fs = require('fs')

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
      res.status(204).send()
    } else {
      // tbd
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
