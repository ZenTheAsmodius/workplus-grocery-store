const { MongoMemoryServer } = require("mongodb-memory-server")
let mongoServer = null

const createTestDB = async () => {
  if (mongoServer == null) {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    process.env.DB_URL = mongoUri
  }
  return mongoServer
}


module.exports = {
  createTestDB
}
