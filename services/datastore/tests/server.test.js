'use strict'

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should()

let server

describe('usm.io datastore service', () => {

    beforeEach(() => {
        server = require('../server.js')
    })

    afterEach((done) => {
        server.close()
        done()
    })

    it('has working tests', () => {
        'foo'.should.equal('foo')
    })

    describe('GET /hello', () => {
        it('returns "Hello World"', () => {
            chai.request(server)
                .get('/api/hello')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.data.should.equal('Hello World!')
                })
        })
    })

    // describe('GET /things', () => {

    //     it('', (done) => {

    //         done()
    //     })

    // })
})