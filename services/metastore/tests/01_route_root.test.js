'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()

chai.use(chaiHttp)

const server = require('../server')

const apiBasePath = '/api'

describe('/', () => {
  describe('GET', () => {
    it('should return "Hello World! :-)" to indicate that the server is running', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/')

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.should.eql({
        message: 'Hello World! :-)'
      })
    })
  })
})
