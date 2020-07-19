'use strict'

const mongoose = require('mongoose')

const PlantService = require('./services/plant')

const main = async function () {
  mongoose.connect('mongodb://localhost:27017/pot-pourri', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  // create plant:
  const result = await PlantService.create({
    name: 'baz'
  })
  console.log('create result', result)

  // get plants:
  const plants = await PlantService.read()
  console.log('read result', plants)
}

main()
