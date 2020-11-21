'use strict'

/*
const sqlite3 = require('sqlite3')
var mkdirp = require('mkdirp')

const fs = require('fs')
// const es = require('event-stream')

const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

const app = require('../index.js')

describe("samples API", () => {

    beforeEach(async () => {

        await mkdirp('./test/temp')
        var db = new sqlite3.Database(
            './test/temp/db.db',
            [],
            (err) => {
                if (err) {
                    console.log("Could not create db at './test/temp/db.db'!")
                    return 1
                }
            })

        var lines = fs.readFileSync('./test/mock.samples.sql')
            .split(';')
        lines.forEach((line) => {
            console.log(line)
            db.run(line)
        })
    })


})

describe("GET /samples", () => {
    describe("if there are samples matching the pattern", () => {
        it("it responds with status code 200", () => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    if (err) done(err)
                    expect(res).to.have.status(200)
                })

        })
        it("the response has a field 'msg' that contains a string", () => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    if (err) done(err)
                    expect(res.body.msg).to.exist
                })

        })
        it("the response has a field 'data' that contains a JSON object", () => {

            chai.request(app)
                .get('/')
                .end((err, res) => {
                    if (err) done(err)
                    expect(res.body.data).to.be.typeof(JSON)
                })
        })
    })
})
*/