'use strict'

// -- imports

const express = require('express')
const router = express.Router()

const actions = require('./actions')


// -- routes /hello

router.route('/hello').get(actions.hello.get)


// -- routes /things

router.route('/things').get(actions.things.get)


// -- exports

module.exports = router