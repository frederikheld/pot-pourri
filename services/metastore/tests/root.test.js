'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

const server = require('../server')

const api_base_path = '/api'

describe ('root', () => {

    describe('GET /', () => {
        it('should return a string to indicate that the server is running', async () => {
            const res = await chai.request(server)
                .get(api_base_path + '/')

            res.should.have.status(200)
            res.text.should.be.a('string')
            res.text.should.eql('Hello World! :-)')
        })
    })

})
