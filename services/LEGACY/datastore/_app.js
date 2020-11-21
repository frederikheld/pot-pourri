'use strict'

// -- exports

module.exports = app


// -- imports

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


// -- routes /things

var ActionsThings = require('./things/actions.things.js')
var actionsThings = new ActionsThings()

app.get('/things', (req, res) => {

    actionsThings.getSamples(req.body)
        .then((result) => {
            return res.status(200).send({
                msg: 'ok'
            })
        })

    // .catch(err => {
    //     return res.status(404)
    // })
})


// -- routes /samples

var ActionsSamples = require('./samples/actions.samples.js')
var actionsSamples = new ActionsSamples('./db/data.db')

app.post('/samples', (req, res) => {

    actionsSamples.addSample(req.body)
        .then((result) => {
            return res.status(201).send({
                msg: "Sample was successfully stored."
            })
        })
        .catch((err) => {
            return res.status(500).send({
                err: err,
                msg: "Sample could not be stored."
            })
        })

})

app.get('/samples', (req, res) => {

    actionsSamples.getSamples(req.query.timestampStart, req.query.timestampEnd)
        .then((result) => {
            return res.status(200).send({
                msg: "Samples successfully queried.",
                data: result
            })
        })
        .catch((err) => {
            return res.status(500).send({
                msg: "Samples could not be queried.",
                err: err
            })
        })
})