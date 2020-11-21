'use strict'

const sqlite3 = require('sqlite3')

const path = require('path')
const fs = require('fs')

const chai = require('chai')
chai.use(require('chai-http'))
// chai.use(require('chai-fs'))
const expect = chai.expect

const app = require('../../index.js')

describe('Datastore setup', () => {

    const dbPath = './db/data.db'

    it('Will create a sqlite database at \'' + dbPath + '\'', () => {
        fs.stat(dbPath, (err, stats) => {
            expect(stats.isFile()).to.be.true
        })
        // Because expect().to.be.a.file from 'chai-fs' might lead to non-failing tests (see: https://github.com/chaijs/chai-fs/issues/9)
    })

    it('The database will have a table \'samples\'', () => {
        var db = new sqlite3.Database(
            dbPath, [],
            (err) => {
                throw err
            }
        )

        // db.run('SELECT * FROM samples WHERE name=`samples`', [], (err, res) => {
        //     if (err) {
        //         throw err
        //     }
        // })

        var query = 'SELECT count(*) FROM sqlite_master WHERE type = \'table\' AND name = \'?\''
        // var query = 'SELECT * FROM ? LIMIT 1'
        db.all(query, ['samples'], (err, rows) => {
            if (err) {
                throw err
            } else {
                expect(rows).to.not.be.empty
            }
            // FIXIT: This test will not fail right now!
        })
        // throw 'err'
    })

    // it('will fail', () => {
    //     throw 'err'
    // })
})