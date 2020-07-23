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
  try {
    const plants = await PlantModel.find().exec()

    const result = []
    plants.forEach((plant) => {
      const plantJson = plant.toJSON()
      plantJson.id = plantJson._id
      result.push(plantJson)
    })
    return result
  } catch (error) {
    return { error: error }
  }
}

plantService.readOne = async (id) => {
  try {
    const resultJson = (await PlantModel.findById(id).exec()).toJSON()
    resultJson.id = resultJson._id
    return resultJson
  } catch (error) {
    return { error: error }
  }
}

plantService.update = async (id, newPlant) => {
  try {
    const plantDocument = await PlantModel.findById(id).exec()

    if (!plantDocument) {
      return {
        error: {
          message: 'Plant with given :id does not exist. Creation of new entities via put is not permitted!',
          code: 403
        }
      }
    }

    Object.keys(newPlant).forEach((key) => {
      plantDocument[key] = newPlant[key]
    })
    plantDocument.save()
  } catch (error) {
    return { error: error }
  }
}

plantService.delete = async (id) => {
  try {
    const result = await PlantModel.deleteOne({ _id: id })

    if (result.ok === 1) {
      if (result.deletedCount === 1) {
        return { success: true }
      } else if (result.deletedCount === 0) {
        return { error: true, message: 'Plant with given :id does not exist' }
      }
    }
  } catch (error) {
    return { error: true, message: error }
  }
}

module.exports = plantService
