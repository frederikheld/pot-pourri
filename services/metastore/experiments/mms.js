'use strict'

process.env.MONGOMS_DOWNLOAD_URL = 'https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz'
process.env.MONGOMS_VERSION = '4.2.8'

const { MongoMemoryServer } = require('mongodb-memory-server')

async function main () {
  const MMS = new MongoMemoryServer()
  console.log(await MMS.getConnectionString())

  /**
   * This MMS instance keeps running until you Strg+C
   * the script. You can copy the connection string
   * and use it with a MongoDB client like Compass.
   */
}
main()
