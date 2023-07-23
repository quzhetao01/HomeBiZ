// test-setup.js

const { MongoMemoryServer } = require('mongodb-memory-server');

// Create an in-memory MongoDB instance
const mongod = new MongoMemoryServer();

module.exports = async () => {
  const uri = await mongod.getUri();
  process.env.MONGODB_URI = uri;
};
