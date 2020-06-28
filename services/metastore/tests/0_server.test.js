'use strict'

require('iconv-lite/encodings')
// This is a fix to avoid issues with mock-fs
// See: https://github.com/tschaub/mock-fs/issues/47

const mockFs = require('mock-fs')

const fs = require('fs')
const process = require('process')

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
chai.should()
const expect = chai.expect

chai.use(chaiHttp)
chai.use(chaiFs)

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

describe('server.initDB(contents)', () => {
  it('should create store/devices.json if it doesn\'t exist', () => {
    mockFs({ })

    expect(() => { fs.mkdirSync('store/somedir') }).to.throw()
    // chai-fs seems to have no way to test if a directory
    // does not exist. This is the workaround to test that
    // 'store' doesn't exist.

    server.initDB()

    expect('store').to.be.a.directory().with.files(['devices.json'])

    mockFs.restore()
  })

  it('will init store/devices.json with an empty object if "contents" isn\'t passed', () => {
    mockFs({})

    server.initDB()

    expect('store/devices.json').to.be.a.file().with.contents(JSON.stringify({}))

    mockFs.restore()
  })

  it('will init store/devices.json with the data that is passed with "contents"', () => {
    mockFs({})

    const dbContents = JSON.stringify([
      { id: 0, name: 'foo' },
      { id: 1, name: 'bar' },
      { id: 2, name: 'baz' }
    ])

    server.initDB(dbContents)

    expect('store/devices.json').to.be.a.file().with.contents(dbContents)
  })
})

describe('/', () => {
  beforeEach(() => {
    mockFs({})

    server.initDB()
    // mock-fs needs to be created before the server is instantiated
    // as the server will create the database files.
  })

  describe('GET', () => {
    it('should return a string to indicate that the server is running', async () => {
      const res = await chai.request(server)
        .get(apiBasePath + '/')

      res.should.have.status(200)
      res.text.should.be.a('string')
      res.text.should.eql('Hello World! :-)')
    })
  })

  afterEach(() => {
    mockFs.restore()
  })
})
