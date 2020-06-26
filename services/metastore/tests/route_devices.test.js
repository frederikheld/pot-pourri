'use strict'

require('iconv-lite/encodings')
// This is a fix to avoid issues with mock-fs
// See: https://github.com/tschaub/mock-fs/issues/47

const mockFs = require('mock-fs')

const fs = require('fs')

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
chai.should()

chai.use(chaiHttp)
chai.use(chaiFs)

const server = require('../server')

const apiBasePath = '/api'

describe('/devices', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'devices.json': JSON.stringify([
          { id: '0' },
          { id: '1' },
          { id: 'green' }
        ])
      }
    })

    server.initDB()
  })

  afterEach(() => {
    mockFs.restore()
  })

  describe('GET', () => {
    it('should return an array that contains all the devices', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/devices')

      res.should.have.status(200)
      res.body.should.be.an('array')
      res.body.length.should.eql(3)
    })
  })

  describe('POST', () => {
    it('should write the given object into the database and return 201', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/devices')
        .type('json')
        .send({ id: '42' })

      res.should.have.status(201)

      const devices = JSON.parse(fs.readFileSync('store/devices.json'))

      devices.should.eql([
        { id: '0' },
        { id: '1' },
        { id: 'green' },
        { id: '42' }
      ])
    })

    it('should return 409 with an error message if a device with the given "id" exists already', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/devices')
        .type('json')
        .send({ id: '0' })

      res.should.have.status(409)
      res.body.error.should.equal('Device with same "id" exists already!')
    })
  })
})

describe('/devices/:id', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'devices.json': JSON.stringify([
          { id: '0' },
          { id: '1' },
          { id: 'green' }
        ])
      }
    })

    server.initDB()
  })

  afterEach(() => {
    mockFs.restore()
  })

  describe('GET', () => {
    it('should return the json object of the device with the given id', async () => {
      const res1 = await chai.request(server)
        .get(apiBasePath + '/devices/1')

      res1.should.have.status(200)
      res1.body.should.be.an('object')
      res1.body.id.should.eql('1')

      const res2 = await chai.request(server)
        .get(apiBasePath + '/devices/green')

      res2.should.have.status(200)
      res2.body.should.be.an('object')
      res2.body.id.should.eql('green')
    })
  })

  describe('DELETE', () => {
    it('should remove the device with the given "id" from the database and return 204', async () => {
      const res = await chai.request(server)
        .delete(apiBasePath + '/devices/1')

      res.should.have.status(204)

      const devices = JSON.parse(fs.readFileSync('store/devices.json'))

      devices.should.eql([
        { id: '0' },
        { id: 'green' }
      ])
    })
  })
})

after(() => {
  mockFs.restore()
  /**
     * This step is important because otherwise subsequent programs
     * that write to the file system won't work.
     * Istanbul (nyc) is one example that is also documented
     * in the mock-fs docs: https://github.com/tschaub/mock-fs
     */
})
