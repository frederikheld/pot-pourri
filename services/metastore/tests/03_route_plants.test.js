'use strict'

const chai = require('chai')
chai.should()
const expect = chai.expect

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiLike = require('chai-like')
chai.use(chaiLike)

const server = require('../server')

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
      res.should.have.header('content-type', 'application/json; charset=utf-8')
      res.body.should.be.an('array')
      res.body.length.should.equal(3)

      for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].id).to.exist
      }

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
      res.should.have.header('content-type', 'application/json; charset=utf-8')

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
      res.should.have.header('content-type', 'application/json; charset=utf-8')
      res.body.error.should.be.true
      res.body.message.should.equal('Plant with same "name" exists already')

      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      allPlants.should.be.like([
        { name: 'Gerhard' },
        { name: 'Franzi' },
        { name: 'Basilikum' }
      ])
    })
  })
})
