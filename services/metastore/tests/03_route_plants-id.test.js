'use strict'

const chai = require('chai')
chai.should()

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiLike = require('chai-like')
chai.use(chaiLike)

const server = require('../server')

const MongoClient = require('mongodb').MongoClient
const MongoMemServ = require('./MongoMemoryServerHandler')

const apiBasePath = '/api'

describe('/plants/:id', () => {
  let mongoClient
  // let mongoDbInstance
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

    // mongoDbInstance = await mongoClient.db(MongoMemServ.getDbName())
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
        res.body.should.be.eql(entry)
      }
    })

    it('should return 404 with an error message if the plant with the given :id doesn\'t exist', async () => {
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
