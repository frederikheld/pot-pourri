'use strict'

const chai = require('chai')
chai.should()
const expect = chai.expect

const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const chaiLike = require('chai-like')
chai.use(chaiLike)

const chaiFs = require('chai-fs')
chai.use(chaiFs)

// const multer = require('multer')
// const GridFsStorage = require('multer-gridfs-storage')

const server = require('../server')

const MongoClient = require('mongodb').MongoClient
const MongoMemServ = require('./MongoMemoryServerHandler')

const fs = require('fs')

const mockFs = require('mock-fs')

const apiBasePath = '/api'

describe('/plants/:id/profile-picture', () => {
  const nonExistentIdWith24HexChars = '5f1637a2e99ac7d700000000'
  // const malformedId = 'nonExistentId'

  let mongoClient
  let mongoDbInstance
  let mockObjects

  // let storage
  // let fileUpload

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
    // storage = new GridFsStorage({ url: MongoMemServ.getConnectionString() })
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
    await mockFs.restore()

    // stop client:
    await mongoClient.close()

    // stop in-memory server:
    await MongoMemServ.stop()
  })

  describe('GET', () => {
    it('should return the profile picture of the plant with the given :id', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/plants/' + mockObjects.plants[0]._id + '/profile-picture')

      res.should.have.status(200)
      res.should.have.header('content-type', 'image/jpeg')
      Buffer.compare(res.body, Buffer.from([0, 255, 0])).should.equal(0)
    })

    it('should return status 404 and an error message, if the plant with the given :id doesn\'t exist', async () => {
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

  describe('PUT', () => {
    it('should store the attached profile picture in the blob storage, link the filename as "profilePicture" in the plant profile and return 200', async () => {
      const res = await chai.request(server)
        .put(apiBasePath + '/plants/' + mockObjects.plants[1]._id + '/profile-picture')
        .set('Content-Type', 'multipart/form-data')
        .attach('profilePicture', Buffer.from([255, 0, 255]), 'someFileName.png')

      res.should.have.status(200)

      // check if file was written to blob storage
      // following naming scheme:
      const filename = 'plants-' + mockObjects.plants[1]._id + '-profilePicture.png'
      expect('store/blob/' + filename).to.be.a.file()

      // check if the contents matcH:
      const fileContents = fs.readFileSync('store/blob/' + filename)
      Buffer.compare(fileContents, (Buffer.from([255, 0, 255]))).should.equal(0)
      // note: this is done with fs and Buffer.compare, as chai-fs
      // can only compare file contents that are String :-(

      // check if filename was linked in plant object:
      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      mockObjects.plants[1].profilePicture = filename

      JSON.stringify(allPlants).should.equal(JSON.stringify(mockObjects.plants))
    })

    it('should not link the filename as "profilePicture" in the plant object and return status 500 with an error message, if storing the profile picture failed', async () => {
      // remove directory "store/blob" to make write operation fail:
      fs.unlinkSync('store/blob/gerhard.jpg')
      fs.rmdirSync('store/blob')

      // repeat request from above:
      const res = await chai.request(server)
        .put(apiBasePath + '/plants/' + mockObjects.plants[1]._id + '/profile-picture')
        .set('Content-Type', 'multipart/form-data')
        .attach('profilePicture', Buffer.from([255, 0, 255]), 'someFileName.png')

      res.should.have.status(500)

      res.body.error.should.be.true
      res.body.message.should.equal('Could not save profile picture')

      // check if filename was NOT linked in plant object:
      const allPlants = await mongoDbInstance.collection('plants').find({}).toArray()

      JSON.stringify(allPlants).should.equal(JSON.stringify(mockObjects.plants))
    })
  })
})
