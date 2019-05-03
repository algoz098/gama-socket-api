const userController = require('./controller/userController');

const loginSocketMiddleware = require('./middleware/loginSocket.js')

module.exports = (io) => {
    return io.on('connection', function (io) {
        io.on('login', function (data) { userController.loginSocket(data, io)});
        io.on('me', function (data) { if(loginSocketMiddleware(io, data)) userController.meSocket(io); });
    });
};
