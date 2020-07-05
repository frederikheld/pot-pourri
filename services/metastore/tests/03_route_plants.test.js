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
const { plants } = require('../actions_plants')

const apiBasePath = '/api'

describe('/plants', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'plants.json': JSON.stringify([
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
    it('should return an array that contains all the plants', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants')

      res.should.have.status(200)
      res.body.should.be.an('array')
      res.body.length.should.eql(3)
      res.body.should.eql([
        { id: '0' },
        { id: '1' },
        { id: 'green' }
      ])
    })
  })

  describe('POST', () => {
    it('should write the given object into the database and return 201', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/plants')
        .type('json')
        .send({ id: '42' })

      res.should.have.status(201)

      const plants = JSON.parse(fs.readFileSync('store/plants.json'))

      plants.should.eql([
        { id: '0' },
        { id: '1' },
        { id: 'green' },
        { id: '42' }
      ])
    })

    it('should return 409 with an error message if a plant with the given "id" exists already', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/plants')
        .type('json')
        .send({ id: '0' })

      res.should.have.status(409)
      res.body.error.should.equal('Plant with same "id" exists already.')
    })
  })
})

describe('/plants/:id', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'plants.json': JSON.stringify([
          { id: '0', name: 'item one' },
          { id: '1', name: 'item' },
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
    it('should return the json object of the plant with the given :id', async () => {
      const res1 = await chai.request(server)
        .get(apiBasePath + '/plants/1')

      res1.should.have.status(200)
      res1.body.should.be.an('object')
      res1.body.id.should.eql('1')

      const res2 = await chai.request(server)
        .get(apiBasePath + '/plants/green')

      res2.should.have.status(200)
      res2.body.should.be.an('object')
      res2.body.id.should.eql('green')
    })

    it('should return 404 with an error message if the plant with the given :id doesn\'t exist', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/bielefeld')

      res.should.have.status(404)
      res.body.error.should.eql('Device with given "id" does not exist.')
    })
  })

  describe('PUT', () => {
    it('should replace object in the database with the object passed in the body an return 200, if an object with the given :id exists', async () => {
      const res = await chai.request(server)
        .put(apiBasePath + '/plants/1')
        .type('json')
        .send({ id: '42', name: 'something else' })

      res.should.have.status(200)

      const plants = JSON.parse(fs.readFileSync('store/plants.json'))

      plants.should.eql([
        { id: '0', name: 'item one' },
        { id: '42', name: 'something else' },
        { id: 'green' }
      ])
    })

    it('should append the object to the database if no object with the given :id exists', async () => {
      const res = await chai.request(server)
        .put(apiBasePath + '/plants/15')
        .type('json')
        .send({ id: '42', name: 'something else' })

      res.should.have.status(200)

      const plants = JSON.parse(fs.readFileSync('store/plants.json'))

      plants.should.eql([
        { id: '0', name: 'item one' },
        { id: '1', name: 'item' },
        { id: 'green' },
        { id: '42', name: 'something else' }
      ])
    })
  })

  describe('DELETE', () => {
    it('should remove the plant with the given "id" from the database and return 204', async () => {
      const res = await chai.request(server)
        .delete(apiBasePath + '/plants/1')

      res.should.have.status(204)

      const plants = JSON.parse(fs.readFileSync('store/plants.json'))

      plants.should.eql([
        { id: '0', name: 'item one' },
        { id: 'green' }
      ])
    })
  })
})

describe('/plants/:id/picture', () => {
  beforeEach(() => {
    mockFs({
      store: {
        'plants.json': JSON.stringify([
          {
            id: '0',
            name: 'item one',
            profilePicture: 'plant-0-profilePicture.png'
          },
          {
            id: '1',
            name: 'item',
            profilePicture: 'plant-1-profilePicture.jpg'
          },
          { id: 'green' }
        ]),
        blob: {
          'plant-0-profilePicture.png': Buffer.from([0, 255, 0]),
          'plant-1-profilePicture.jpg': Buffer.from([255, 255, 0])
        }
      }
    })

    server.initDB()
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should return the profile picture of the plant with the given :id', async () => {
    const res1 = await chai.request(server)
      .get(apiBasePath + '/plants/0/profile-picture')

    res1.should.have.status(200)
    res1.should.have.header('content-type', 'image/png')

    const res2 = await chai.request(server)
      .get(apiBasePath + '/plants/1/profile-picture')

    res2.should.have.status(200)
    res2.should.have.header('content-type', 'image/jpeg')
  })

  it('should return status 404 wit error message "plant has no profile picture" if the plant has no profile picture', async () => {
    const res = await chai.request(server)
      .get(apiBasePath + '/plants/green/profile-picture')

    res.should.have.status(404)
    res.body.error.should.equal('plant has no profile picture')
  })

  it('should return 404 with error message "plant does not exist" if the plant doesn\'t exist', async () => {
    const res = await chai.request(server)
      .get(apiBasePath + '/plants/bielefeld/profile-picture')

    res.should.have.status(404)
    res.body.error.should.equal('plant does not exist')
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
