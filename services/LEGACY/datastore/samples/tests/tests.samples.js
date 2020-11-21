'use strict'

import test from 'ava'

const request = require('supertest')
const app = require('./../../app.js')

test('/samples returns status code 200', async t => {
    const response = await request(app)
        .get('/samples')

    t.is(response.status, 200)
})

// test('/samples returns a properly formed message', async t => {
//     const response = await request(app)
//         .get('/samples')

//     t.is(response.body.msg, 'ok')
// })