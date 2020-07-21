'use strict'

const chai = require('chai')
chai.should()

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiLike = require('chai-like')
chai.use(chaiLike)

const server = require('../server')

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const MongoMemServ = require('./MongoMemoryServerHandler')

const apiBasePath = '/api'

describe('/plants/:id', () => {
  let mongoClient
  let mongoDbInstance
  let mockObjects

  beforeEach(async () => {
    // start and initialize in-memory db server:
    await MongoMemServ.start()
    mockObjects = await MongoMemServ.init({
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
    it('should return the json object of the plant with the given :id', async () => {
      for (const entry of mockObjects.plants) {
        const res = await chai.request(server)
          .get(apiBasePath + '/plants/' + entry._id)

        res.should.have.status(200)
        res.body.should.be.an('object')
        JSON.stringify(res.body).should.be.eql(JSON.stringify(entry))
      }
    })

    it('should return 404 with an error message, if the plant with the given :id doesn\'t exist', async () => {
      // for proper MongoDB id's:
      const nonExistentIdWith24HexChars = '5f14f66a5f7120000000000'
      const res1 = await chai.request(server)
        .get(apiBasePath + '/plants/' + nonExistentIdWith24HexChars)

      res1.should.have.status(404)

      // for all other strings:
      const anyOtherString = 'nonExistentId'
      const res2 = await chai.request(server)
        .get(apiBasePath + '/plants/' + anyOtherString)

      res2.should.have.status(404)

      /**
       * The latter is not a client error as it shouldn't be
       * the clients' obligation to understand the internals
       * of this REST API!
       */
    })
  })

  describe('PUT', () => {
    it('should replace the object with the given :id in the database with the object passed in req.body and return 200', async () => {
      const originalPlant = await mongoDbInstance.collection('plants').findOne({ _id: new ObjectID(mockObjects.plants[0]._id) })

      originalPlant.name.should.equal('Gerhard')

      const res = await chai.request(server)
        .put(apiBasePath + '/plants/' + mockObjects.plants[0]._id)
        .type('json')
        .send({
          name: 'Foo'
        })

      res.should.have.status(200)

      // const updatedPlant = await mongoDbInstance.collection('plants').findOne({ _id: new ObjectID(mockObjects.plants[0]._id) })
      // updatedPlant.name.should.equal('Foo')

      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()
      mockObjects.plants[0].name = 'Foo'

      JSON.stringify(allPlants).should.equal(JSON.stringify(mockObjects.plants))
    })

    it('should return 403 with an error message, if an object with the given :id does not exist in the database. It should not create a new entry in the database as :id\'s are the unique keys from the database and can\'t be defined by the user', async () => {
      const nonExistentIdWith24HexChars = '5f1637a2e99ac7d7b8e9379b'

      const res = await chai.request(server)
        .put(apiBasePath + '/plants/' + nonExistentIdWith24HexChars)
        .type('json')
        .send({
          name: 'Foo'
        })

      res.should.have.status(403)
      res.body.error.should.equal('Plant with given :id does not exist. Creation of new entities via put is not permitted!')

      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      JSON.stringify(allPlants).should.equal(JSON.stringify(mockObjects.plants))
    })
  })

  // describe('POST', () => {
  //   it('should write the given object into the database and return 201', async () => {
  //     const res = await chai.request(server)
  //       .post(apiBasePath + '/plants')
  //       .type('json')
  //       .send({ name: 'Paula' })

  //     res.should.have.status(201)

  //     const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

  //     allPlants.should.be.like([
  //       { name: 'Gerhard' },
  //       { name: 'Franzi' },
  //       { name: 'Basilikum' },
  //       { name: 'Paula' }
  //     ])
  //   })

  //   it('should return 409 with an error message if a plant with the given "name" exists already', async () => {
  //     const res = await chai.request(server)
  //       .post(apiBasePath + '/plants')
  //       .type('json')
  //       .send({ name: 'Franzi' })

  //     res.should.have.status(409)
  //     res.body.error.should.equal('Plant with same "name" exists already.')

  //     const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

  //     allPlants.should.be.like([
  //       { name: 'Gerhard' },
  //       { name: 'Franzi' },
  //       { name: 'Basilikum' }
  //     ])
  //   })
  // })
})
