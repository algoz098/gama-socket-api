const userController = require('./controller/userController');
const envController = require('./controller/envController');

const loginSocketMiddleware = require('./middleware/loginSocket.js')

module.exports = (io) => {
    return io.on('connection', function (io) {
        io.on('environments.save', function (data) { envController.save(data, io)});
        
        io.on('login', function (data) { userController.loginSocket(data, io)});
        io.on('me', function (data) { if(loginSocketMiddleware(io, data)) userController.meSocket(io); });
    });
};
