// console.log = jest.fn()

const server = require("../src/index");
const mongoose = require('../app/model/index.js')

afterEach(() => {
  server.close();
});

afterAll(() => {
  mongoose.connection.close()
  server.close();
});

require('./login.js')
require('./users.js')