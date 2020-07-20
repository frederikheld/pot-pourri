'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
const chaiLike = require('chai-like')
chai.should()
// const expect = chai.expect

chai.use(chaiHttp)
chai.use(chaiFs)
chai.use(chaiLike)

// const chaiObjects = require('./chai-objects.js')
// chai.use(chaiObjects)

const server = require('../server')
// const { plants } = require('../actions_plants')

const MongoClient = require('mongodb').MongoClient
const MongoMemServ = require('./MongoMemoryServerHandler')

const apiBasePath = '/api'

describe('/plants', () => {
  let mongoClient
  let mongoDbInstance

  beforeEach(async () => {
    // start and initialize in-memory db server:
    await MongoMemServ.start()
    await MongoMemServ.init({
      plants: [
        { name: 'Gerhard' },
        { name: 'Franzi' },
        { name: 'Basilikum' }
      ]
    })

    // start instance of db client:
    mongoClient = new MongoClient(
      MongoMemServ.getUri(),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    await mongoClient.connect()

    mongoDbInstance = await mongoClient.db(MongoMemServ.getDbName())
  })

  afterEach(async () => {
    // stop client:
    await mongoClient.close()

    // stop in-memory server:
    await MongoMemServ.stop()
  })

  describe('GET', () => {
    it('should return an array that contains all plants in the database', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants')

      res.should.have.status(200)
      res.body.should.be.an('array')
      res.body.length.should.equal(3)
      res.body.should.be.like([
        { name: 'Gerhard' },
        { name: 'Franzi' },
        { name: 'Basilikum' }
      ])
    })
  })

  describe('POST', () => {
    it('should write the given object into the database and return 201', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/plants')
        .type('json')
        .send({ name: 'Paula' })

      res.should.have.status(201)

      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      allPlants.should.be.like([
        { name: 'Gerhard' },
        { name: 'Franzi' },
        { name: 'Basilikum' },
        { name: 'Paula' }
      ])
    })

    it('should return 409 with an error message if a plant with the given "name" exists already', async () => {
      const res = await chai.request(server)
        .post(apiBasePath + '/plants')
        .type('json')
        .send({ name: 'Franzi' })

      res.should.have.status(409)
      res.body.error.should.equal('Plant with same "name" exists already.')

      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      allPlants.should.be.like([
        { name: 'Gerhard' },
        { name: 'Franzi' },
        { name: 'Basilikum' }
      ])
    })
  })
})
