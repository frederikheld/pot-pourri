'use strict'

// -- imports



// -- actions

let actions = {}

actions.hello = (req, res) => {
    res.status(200).json({ data: 'Hello World!' })
}


// -- exports

module.exports = actions