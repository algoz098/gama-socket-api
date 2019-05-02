// const userController = require('./userController.js');

// const loginSocketMiddleware = require('./middleware/loginSocket.js')

module.exports = (io) => {
    return io.on('connection', function (io) {
        // io.on('user', function (data) { if(loginSocketMiddleware(io)) userController.get(data, io); });
    });
};
