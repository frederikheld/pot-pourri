'use strict'

const chai = require('chai')
chai.should()

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiLike = require('chai-like')
chai.use(chaiLike)

// const chaiFs = require('chai-fs')
// chai.use(chaiFs)

// const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

const server = require('../server')

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const MongoMemServ = require('./MongoMemoryServerHandler')

const mockFs = require('mock-fs')

const apiBasePath = '/api'

describe('/plants/:id/profile-picture', () => {
  const nonExistentIdWith24HexChars = '5f1637a2e99ac7d700000000'
  const malformedId = 'nonExistentId'

  let mongoClient
  let mongoDbInstance
  let mockObjects

  let storage
  let fileUpload

  beforeEach(async () => {
    // start and initialize in-memory db server:
    await MongoMemServ.start()
    mockObjects = await MongoMemServ.init({
      plants: [
        { name: 'Gerhard', profilePicture: 'gerhard.jpg' }, // valid profile picture
        { name: 'Franzi' }, // no profile picture
        { name: 'Basilikum', profilePicture: 'doesntexist.jpg' } // inconsistent data: file to link doesn't exist
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

    // start instance of file storage client:
    storage = new GridFsStorage({ url: MongoMemServ.getConnectionString() })
    // fileUpload = multer({ storage })

    // init mock-fs:
    mockFs({
      store: {
        blob: {
          'gerhard.jpg': Buffer.from([0, 255, 0])
        }
      }

    })

    // Note: needs to happen after init of mongodb-memory-server
    // See: https://github.com/nodkz/mongodb-memory-server/issues/251
  })

  afterEach(async () => {
    // restore mock-fs:
    mockFs.restore()

    // stop client:
    await mongoClient.close()

    // stop in-memory server:
    await MongoMemServ.stop()
  })

  describe.only('GET', () => {
    it('should return the profile picture of the plant with the given :id', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/' + mockObjects.plants[0]._id + '/profile-picture')

      res.should.have.status(200)
      res.should.have.header('content-type', 'image/jpeg')
      Buffer.compare(res.body, Buffer.from([0, 255, 0])).should.equal(0)
    })

    it('should return status 404 and an error message, if a plant with the given :id doesn\'t exist', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/' + nonExistentIdWith24HexChars + '/profile-picture')

      res.should.have.status(404)
      res.body.error.should.be.true
      res.body.message.should.equal('Plant with given :id does not exist')
    })

    it('should return status 404 with an error message, if the plant with the given :id has no profile picture', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/' + mockObjects.plants[1]._id + '/profile-picture')

      res.should.have.status(404)
      res.body.error.should.be.true
      res.body.message.should.equal('Plant has no profile picture')
    })

    it('should return status 500 with an error message, if the data on the server is inconsistent', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/' + mockObjects.plants[2]._id + '/profile-picture')

      res.should.have.status(500)
      res.body.error.should.be.true
      res.body.message.should.equal('Inconsistent data on server. Please store a new profile picture!')
      // plant profile has an entry 'profilePicture' but the linked file doesn't exist or can't be found
    })
  })
})
