'use strict'

const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should()

const server = require('../server')

describe('usm.io datastore service', () => {
    it('has working tests', () => {
        'foo'.should.equal('foo')
    })

    describe('GET /things', () => {

        beforeEach(() => {
            const server = require('../server')
        })

        afterEach((done) => {
            server.close()
            done()
        })

        it('', (done) => {

            done()
        })

    })
})