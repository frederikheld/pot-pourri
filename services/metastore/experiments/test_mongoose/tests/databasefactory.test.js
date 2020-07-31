'use strict'

// -- import test environment

const chai = require('chai')
chai.should()
// const expect = chai.expect

const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const MongoMemServ = require('./MongoMemoryServerHandler')

// -- import function under test

const databaseFactory = require('../DatabaseFactory')
const { expect } = require('chai')

describe.only('DatabaseFactory', () => {
  beforeEach(async () => {
    // start and initialize in-memory db server:
    await MongoMemServ.start()
  })

  afterEach(async () => {
    await MongoMemServ.stop()
  })

  describe('DatabaseFactory(connectionString)', () => {
    it('returns a mongoose connection object', async () => {
      /*
       * correct form would be:
       * mongodb://ip-or-hostname:port/database-name
       */

      const db = await databaseFactory(MongoMemServ.getUri())

      db.should.be.an.instanceOf(Object)
    })

    it('throws an error if the passed \'uri\' isn\'t a valid', async () => {
      await expect(databaseFactory('foo')).to.be.rejectedWith('Malformed connection string')
    })

    it('throws an error if connection to the database can\'t be established within 10 seconds', async function () {
      // make test wait long enough for
      // mongoose to timeout:
      this.timeout(10000)

      // stop database to make connection attempt fail:
      MongoMemServ.stop()

      const startTime = process.hrtime.bigint()

      await expect(databaseFactory(MongoMemServ.getUri())).to.be.rejectedWith('Can\'t connect to database')

      const endTime = process.hrtime.bigint()
      Number(endTime - startTime).should.be
        .greaterThan(4.5 * 1000 * 1000 * 1000)
        .lessThan(5.5 * 1000 * 1000 * 1000)
        // +- 5000 ms
    })

    describe.only('the connection object', () => {
      it('is connected to the database', async () => {
        const db = await databaseFactory(MongoMemServ.getUri())

        db.readyState.should.equal(1)
      })

      it('has all models registered', async () => {
        const db = await databaseFactory(MongoMemServ.getUri())

        db.base.models.should.have.keys([
          'Plant'
        ])
      })
    })
  })

  // describe('async Database.connect()', () => {
  //   it('connects to the database', async () => {
  //     const db = new Database(MongoMemServ.getUri())

  //     await db.connect()

  //     db.connection.should.be.an('object')
  //   })

  //   it('throws an error if the database is not available', async () => {
  //   //   const dbUri = MongoMemServ.getUri()
  //     await MongoMemServ.stop()

  //     const db = new Database('')

  //     expect(() => db.connect()).to.throw()
  //   })
  // })

  //   describe('Database.connect()', async () => {
  //     const db = new Database(MongoMemServ.getUri())

  //     db.connect()

  //     db.connection.should.be.an('object')
  //   })

  //   describe('Database.close()', () => {
  //     it('should close the connection to the database', () => {
  //       const db = new Database(MongoMemServ.getUri())

  //       db.connection.should.be.an('object')

  //       db.close()

//       expect(db.connection).to.be.undefined
//     })
//   })
})
