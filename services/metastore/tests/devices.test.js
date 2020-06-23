'use strict'

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiFs = require('chai-fs')
const should = chai.should()

chai.use(chaiHttp)
chai.use(chaiFs)

const mockFs = require('mock-fs');

const server = require('../server')

const api_base_path = '/api'

describe('GET devices', () => {
    beforeEach(() => {
        mockFs({
            'store': {
                'devices.json': JSON.stringify([
                    { id: 0 },
                    { id: 1 },
                    { id: 'green' }
                ])
            }
        });
    })

    it('should return an array that contains all the devices', async () => {
        const res = await chai.request(server)
            .get(api_base_path + '/devices')

        res.should.have.status(200)
        res.body.should.be.an('array')
        res.body.length.should.eql(3)
    })
})