'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()
const expect = chai.expect

chai.use(chaiHttp)

const mongoose = require('mongoose')

const mongoMemHandler = require('./MongoMemoryServerHandler')

describe('/plants', () => {
  beforeEach(async () => {
    await mongoMemHandler.start()
  })

  afterEach(async () => {
    await mongoMemHandler.stop()
  })

  it('should work', () => {
    expect(1).to.equal(1)
  })

  it('should work as well', async () => {
    const User = mongoose.model('User', new mongoose.Schema({
      name: String
    }))

    const count = await User.countDocuments()

    count.should.equal(0)
  })

  it('should also work', async () => {
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      size: Number
    }))

    const Foo = mongoose.model('Foo', new mongoose.Schema({ foo: String }))

    const countUser = await User.countDocuments()
    const countFoo = await Foo.countDocuments()

    countUser.should.equal(0)
    countFoo.should.equal(0)
  })

  it('should work like the others', async () => {
    const Foo = mongoose.model('Foo', new mongoose.Schema({ foo: String }))
    const countFoo = await Foo.countDocuments()

    countFoo.should.equal(0)
  })
})
