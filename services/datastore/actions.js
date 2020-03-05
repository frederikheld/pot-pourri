'use strict'

// -- imports



// -- actions

let actions = {}


// -- actions /hello

actions.hello = {}
actions.hello.get = (req, res) => {
    res.status(200).json({ data: 'Hello World!' })
}


// -- actions /things

actions.things = {}
actions.things.get = (req, res) => {
    res.status(200).json({data: 'foo'})
}


// -- exports

module.exports = actions