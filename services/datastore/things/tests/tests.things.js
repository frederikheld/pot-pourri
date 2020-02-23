'use strict'

// This file contains integration tests (end-to-end tests)
// on the /things api of datastore

import test from 'ava'

const request = require('supertest')
const app = require('./../../app.js')

test.before(t => {

    // populate DB with dummy things

})

test('/things returns status code 200', async t => {
    const response = await request(app)
        .get('/things')

    t.is(response.status, 200)
})

test('GET /things returns a properly formed message', async t => {
    const response = await request(app)
        .get('/things')

    t.is(response.body.msg, 'ok')
})

// test('GET /things without parameters returns all things in the database', async t => {
//     const response = await request(app)
//         .get('/things')

//     // response.body.data.length > 0
//     // min(response.body.data) > timestampStart
//     // max(response.body.data) < timestampEnd

//     // Is it better to compare a given set?
// })

// test('GET /things with parameters "start" and "limit" returns a subset of things', async t => {
//     const response = await request(app)
//         .get('/things')
//         .query({
//             start: '10',
//             limit: '5'
//         })
// })