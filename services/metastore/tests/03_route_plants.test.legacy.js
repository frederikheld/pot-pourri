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

describe('/plants/:id/linked-devices', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'plants.json': JSON.stringify([
          {
            id: '0',
            name: 'item one',
            linkedDevices: ['0', '1', '2']
          },
          {
            id: '1',
            name: 'item',
            linkedDevices: []
          },
          { id: 'green' },
          { id: 'red' }
        ]),
        'devices.json': JSON.stringify([
          { id: '0', linkedPlant: '0' },
          { id: '1', linkedPlant: '0' },
          { id: '2', linkedPlant: '0' },
          { id: '3' },
          { id: '4' },
          { id: '5' },
          { id: '6' },
          { id: '7' },
          { id: '8' }
        ])
      }
    })

    server.initDB()
  })

  afterEach(() => {
    mockFs.restore()
  })

  describe('GET', () => {
    it('should return an array that contains all id\'s of attached devices with status 200', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/0/linked-devices')

      res.should.have.status(200)
      res.body.should.be.an('array')
      res.body.length.should.eql(3)
      res.body.should.eql(['0', '1', '2'])
    })

    it('should return an empty array with status 200 if no devices are attached', async () => {
      // empty list:
      const res1 = await chai.request(server)
        .get(apiBasePath + '/plants/1/linked-devices')

      res1.should.have.status(200)
      res1.body.should.be.an('array')
      res1.body.length.should.eql(0)
      res1.body.should.eql([])

      // key "devices" undefined:
      const res2 = await chai.request(server)
        .get(apiBasePath + '/plants/green/linked-devices')

      res2.should.have.status(200)
      res2.body.should.be.an('array')
      res2.body.length.should.eql(0)
      res2.body.should.eql([])
    })

    it('should return status 404 with error message "plant does not exist" if plant doesn\'t exist', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/2/linked-devices')

      res.should.have.status(404)
      res.body.error.should.equal('plant does not exist')
    })
  })

  describe('POST array of deviceID\'s', () => {
    it('should return status 200 if the device was successfully linked', async () => {
      // this will create a n:1 two-way link
      // one plant can be linked with 0..n devices
      // one device can be linked with 0..1 plants

      // add to existing list of attached devices:
      const res1 = await chai.request(server)
        .post(apiBasePath + '/plants/0/linked-devices')
        .type('json')
        .send(['3'])

      res1.should.have.status(200)

      // attach to empty list of attached devices:
      const res2 = await chai.request(server)
        .post(apiBasePath + '/plants/1/linked-devices')
        .type('json')
        .send(['4'])

      res2.should.have.status(200)

      // attach if key doesn't exist:
      const res3 = await chai.request(server)
        .post(apiBasePath + '/plants/green/linked-devices')
        .type('json')
        .send(['5'])

      res3.should.have.status(200)

      // attach multiple devices:
      const res4 = await chai.request(server)
        .post(apiBasePath + '/plants/red/linked-devices')
        .type('json')
        .send(['6', '7', '8'])

      res4.should.have.status(200)

      // check changes in plants database:
      const plants = JSON.parse(fs.readFileSync('store/plants.json'))
      plants.should.eql([
        {
          id: '0',
          name: 'item one',
          linkedDevices: ['0', '1', '2', '3']
        },
        {
          id: '1',
          name: 'item',
          linkedDevices: ['4']
        },
        {
          id: 'green',
          linkedDevices: ['5']
        },
        {
          id: 'red',
          linkedDevices: ['6', '7', '8']
        }
      ])

      // check changes in devices database:
      const devices = JSON.parse(fs.readFileSync('store/devices.json'))
      devices.should.eql([
        { id: '0', linkedPlant: '0' },
        { id: '1', linkedPlant: '0' },
        { id: '2', linkedPlant: '0' },
        { id: '3', linkedPlant: '0' },
        { id: '4', linkedPlant: '1' },
        { id: '5', linkedPlant: 'green' },
        { id: '6', linkedPlant: 'red' },
        { id: '7', linkedPlant: 'red' },
        { id: '8', linkedPlant: 'red' }
      ])
    })

    // it('should return status 400 with error "device already linked to another plant", if the device is already linked to another plant', async () => {
    //   // add to existing list of attached devices:
    //   const res = await chai.request(server)
    //     .post(apiBasePath + '/plants/0/linked-devices')
    //     .type('json')
    //     .send(['0'])

    //   res.should.have.status(400)
    // })
  })

  describe('DELETE array of deviceID\'s', () => {
    it('should remove link between plant with the given :ids and the devices with the ids passed in the request body and return status 204', async () => {
      const res = await chai.request(server)
        .delete(apiBasePath + '/plants/0/linked-devices')
        .type('json')
        .send(['0', '1'])

      res.should.have.status(204)

      // check changes in plants database:
      const plants = JSON.parse(fs.readFileSync('store/plants.json'))
      plants.should.eql([
        {
          id: '0',
          name: 'item one',
          linkedDevices: ['2']
        },
        {
          id: '1',
          name: 'item',
          linkedDevices: []
        },
        { id: 'green' },
        { id: 'red' }
      ])

      // check changes in devices database:
      const devices = JSON.parse(fs.readFileSync('store/devices.json'))
      devices.should.eql([
        { id: '0' },
        { id: '1' },
        { id: '2', linkedPlant: '0' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' }
      ])
    })
  })

  after(() => {
    mockFs.restore()
  /**
     * This step is important because otherwise subsequent programs
     * that write to the file system won't work.
     * Istanbul (nyc) is one example that is documented
     * in the mock-fs docs: https://github.com/tschaub/mock-fs
     */
  })
})
