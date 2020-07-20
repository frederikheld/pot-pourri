const PlantModel = require('../models/plant')

const plantService = { }

plantService.create = async (plant) => {
  const plantModel = new PlantModel(plant)
  try {
    const result = await plantModel.save()
    return result
  } catch (error) {
    return { error: error }
  }
}

plantService.readAll = async () => {
  const plants = await PlantModel.find().exec()
  return plants
}

plantService.readOne = async (id) => {
  try {
    const plant = await PlantModel.findById(id).exec()
    return plant
  } catch (error) {
    return { error: error }
  }
}

plantService.update = async () => {

}

plantService.delete = async () => {

}

module.exports = plantService
