'use strict'

const MetastoreConnector = function (metastoreServerAddress) {
  this.metastoreServerAddress = metastoreServerAddress
}

MetastoreConnector.prototype.fetchPlants = async function () {
  const url = this.metastoreServerAddress + '/api/plants'

  const options = {
    method: 'GET',
    accept: 'application/json'
  }

  const res = await fetch(url, options)
  const plants = await res.json()

  return plants
}

MetastoreConnector.prototype.fetchPlant = async function (plantId) {
  const url = this.metastoreServerAddress + '/api/plants/' + plantId

  const options = {
    method: 'GET',
    accept: 'application/json'
  }

  const res = await fetch(url, options)
  const plant = await res.json()

  return plant
}

MetastoreConnector.prototype.fetchPlantProfilePicture = async function (plantId) {
  const url = this.metastoreServerAddress + '/api/plants/' + plantId + '/profile-picture'

  const options = {
    method: 'GET',
    headers: {
      Accept: 'image/png, image/jpg, image/jpeg'
    }
  }

  const res = await fetch(url, options)
  const plantPictureRaw = await res.blob()
  const plantPictureObjectUrl = URL.createObjectURL(plantPictureRaw)

  return plantPictureObjectUrl
}

MetastoreConnector.prototype.patchPlant = async function (plantId, plantPatch) {
  const url = this.metastoreServerAddress + '/api/plants/' + plantId

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plantPatch)
  }

  return fetch(url, options)
}

MetastoreConnector.prototype.updateProfilePicture = async function (plantId, profilePicture) {
  const url = this.metastoreServerAddress + '/api/plants/' + plantId + '/profile-picture'

  const formData = new FormData()

  formData.append('profilePicture', new Blob([profilePicture], { type: 'image/jpg' }), 'somefile.jpg')

  const options = {
    method: 'PUT',
    body: formData
  }

  return fetch(url, options)
}

MetastoreConnector.prototype.deletePlant = async function (plantId) {
  const url = this.metastoreServerAddress + '/api/plants/' + plantId

  const options = {
    method: 'DELETE',
    accept: 'application/json'
  }

  return fetch(url, options)
}

module.exports = MetastoreConnector
