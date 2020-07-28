'use strict'

require('iconv-lite/encodings')
// This is a fix to avoid issues with mock-fs
// See: https://github.com/tschaub/mock-fs/issues/47

const mockFs = require('mock-fs')

const fs = require('fs')
const path = require('path')
const process = require('process')

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
chai.should()
const expect = chai.expect

chai.use(chaiHttp)
chai.use(chaiFs)

const mongoose = require('mongoose')
const mongoMemoryServerHandler = require('./MongoMemoryServerHandler')

const server = require('../server.js')

const apiBasePath = '/api'

describe('server.initOptions(options)', function () {
  this.slow(2000)
  // this.timeout(10000)
  it('should slow down responses by the time in ms that is passed in "options.responseDelay"', async () => {
    mockFs({})

    // without artificial delay:
    server.initOptions()

    const startTime1 = process.hrtime.bigint()
    // docs: https://nodejs.org/api/process.html#process_process_hrtime_time

    await chai.request(server)
      .get(apiBasePath)
      .type('json')

    const endTime1 = process.hrtime.bigint()

    Number(endTime1 - startTime1).should.be.lessThan(100 * 1000 * 1000) // < 200 ms

    // with artificial delay:
    server.initOptions({
      responseDelay: 500
    })

    const startTime2 = process.hrtime.bigint()

    await chai.request(server)
      .get(apiBasePath)
      .type('json')

    const endTime2 = process.hrtime.bigint()

    Number(endTime2 - startTime2).should.be.greaterThan(500 * 1000 * 1000) // > 500 ms

    // need to reset server options here, as "server"
    // unfortunately isn't properly self-contained yet:
    server.initOptions({
      responseDelay: 0
    })
    mockFs.restore()
  })
})

describe('server.initDB(uri, contents)', () => {
  beforeEach(async () => {
    await mongoMemoryServerHandler.start()
  })

  afterEach(async () => {
    await mongoMemoryServerHandler.stop()
  })

  it('todo', () => {})
})

// describe('server.initDB(contents)', () => {
//   describe('database directory', () => {
//     it('should create directory "store" if it doesn\'t exist', () => {
//       mockFs({ })

//       expect(() => { fs.mkdirSync('store/somedir') }).to.throw()
//       // chai-fs seems to have no way to test if a directory
//       // does not exist. This is the workaround to test that
//       // 'store' doesn't exist.

//       server.initDB()

//       expect('store').to.be.a.directory()

//       mockFs.restore()
//     })
//   })

//   describe('devices database', () => {
//     it('should create "store/devices.json" if it doesn\'t exist', () => {
//       mockFs({ })

//       expect(() => { fs.readFileSync('store/devices.json') }).to.throw('ENOENT: no such file or directory, open \'store/devices.json\'')

//       server.initDB()

//       expect(() => { fs.readFileSync('store/devices.json') }).to.not.throw()

//       mockFs.restore()
//     })

//     it('should init "store/devices.json" with the data that is passed with "contents.devices"', () => {
//       mockFs({})

//       const dbContents = {
//         devices: [
//           { id: 0, name: 'foo' },
//           { id: 1, name: 'bar' },
//           { id: 2, name: 'baz' }
//         ]
//       }

//       server.initDB(dbContents)

//       expect('store/devices.json').to.be.a.file().with.contents(JSON.stringify(dbContents.devices))
//     })

//     it('should init "store/devices.json" with an empty array if "contents.devices" isn\'t passed', () => {
//       mockFs({})

//       server.initDB()

//       expect('store/devices.json').to.be.a.file().with.contents('[]')

//       mockFs.restore()
//     })
//   })

//   describe('plants database', () => {
//     it('should create "store/plants.json" if it doesn\'t exist', () => {
//       mockFs({ })

//       expect(() => { fs.readFileSync('store/plants.json') }).to.throw('ENOENT: no such file or directory, open \'store/plants.json\'')

//       server.initDB()

//       expect(() => { fs.readFileSync('store/plants.json') }).to.not.throw()

//       mockFs.restore()
//     })

//     it('should init "store/plants.json" with the data that is passed with "contents.plants"', () => {
//       mockFs({})

//       const dbContents = {
//         plants: [
//           { id: 0, name: 'foo' },
//           { id: 1, name: 'bar' },
//           { id: 2, name: 'baz' }
//         ]
//       }

//       server.initDB(dbContents)

//       expect('store/plants.json').to.be.a.file().with.contents(JSON.stringify(dbContents.plants))
//     })

//     it('should init "store/plants.json" with an empty array if "contents.plants" is not set', () => {
//       mockFs({})

//       server.initDB()

//       expect('store/plants.json').to.be.a.file().with.contents('[]')

//       mockFs.restore()
//     })
//   })
// })

describe('server.initBlobStorage(inputDirectory)', () => {
  it('should create an empty folder "store/blob", which will hold binary objects like file uploads', () => {
    mockFs({
      store: {}
    })

    server.initBlobStorage()

    expect('store/blob').to.be.a.directory()

    mockFs.restore()
  })

  it('will create directory "store" if it doesn\'t exist already', () => {
    mockFs({ })

    server.initBlobStorage()

    expect('store/blob').to.be.a.directory()

    mockFs.restore()
  })

  it('should init "store/blob" by copying all files found in "inputDirectory" to "store/blob"', () => {
    mockFs({
      store: {},
      mocks: {
        blob: {
          'plants-0-profilePicture.jpg': Buffer.from([255, 0, 255]),
          'some-file.txt': Buffer.from([0, 255, 0])
        }
      }
    })

    server.initBlobStorage(path.join('mocks', 'blob'))

    expect('store/blob').to.have.files([
      'plants-0-profilePicture.jpg',
      'some-file.txt'
    ])
  })

  it('should init "store/blob" as an empty directory if "inputDirectory" is not set', () => {
    mockFs({
      store: {}
    })

    server.initBlobStorage()

    expect('store/blob').to.be.a.directory().which.is.empty

    mockFs.restore()
  })
})
