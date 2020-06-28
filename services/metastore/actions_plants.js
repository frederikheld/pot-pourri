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

  fs.writeFileSync('store/plants.json', JSON.stringify([...plants, object]))

  return true
}

db.deletePlantById = function (plantId) {
  const plants = db.getAllPlants()

  const plantsNew = plants.filter((x) => {
    return x.id !== plantId
  })

  fs.writeFileSync('store/plants.json', JSON.stringify(plantsNew))
  return true
}

// -- exports

module.exports = actions
