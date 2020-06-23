'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
const should = chai.should()

chai.use(chaiHttp)
chai.use(chaiFs)

const mockFs = require('mock-fs');

const server = require('../server')

const api_base_path = '/api'

describe ('devices', () => {

    beforeEach(() => {
        mockFs({
            'store': {
                'devices.json': JSON.stringify([
                    { id: 0 },
                    { id: 1 },
                    { id: 'green' }
                ])
            }
        })
    })

    describe('GET /devices', () => {
        it('should return an array that contains all the devices', async () => {
            const res = await chai.request(server)
                .get(api_base_path + '/devices')

            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.eql(3)
        })
    })

    describe('GET /devices/:id', () => {
        it('should return the json object of the device with the given id', async () => {

            const res1 = await chai.request(server)
                .get(api_base_path + '/devices/1')

            res1.should.have.status(200)
            res1.body.should.be.an('object')
            res1.body.id.should.eql(1)

            const res2 = await chai.request(server)
                .get(api_base_path + '/devices/green')

            res2.should.have.status(200)
            res2.body.should.be.an('object')
            res2.body.id.should.eql('green')

        })

    })

})

after(() => {
    mockFs.restore()
    /**
     * This step is important because otherwise subsequent programs
     * that write to the file system won't work.
     * Istanbul (nyc) is one example that is also documented
     * in the mock-fs docs: https://github.com/tschaub/mock-fs
     */
})