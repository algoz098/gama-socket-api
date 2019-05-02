const envController = require('./controller/envController.js');
const userController = require('./controller/userController.js');

const loginMiddleware = require('./middleware/login.js')
// const adminMiddleware = require('./middleware/loginMiddleware.js')

module.exports = (router) => {
    router.get('/api/v1/environment', envController.get)
    router.get('/api/v1/environment/:env', envController.get)

    router.get('/api/v1/users/me', loginMiddleware, userController.me)
    router.post('/api/v1/users/login', userController.login)
};
