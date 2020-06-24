'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()

chai.use(chaiHttp)

const server = require('../server')

const apiBasePath = '/api'

describe('root', () => {
    describe('GET /', () => {
        it('should return a string to indicate that the server is running', async () => {
            const res = await chai.request(server)
                .get(apiBasePath + '/')

            res.should.have.status(200)
            res.text.should.be.a('string')
            res.text.should.eql('Hello World! :-)')
        })
    })
})
