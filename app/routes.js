const envController = require('./controller/envController.js');
const userController = require('./controller/userController.js');
const docController = require('./controller/docController.js');

const loginMiddleware = require('./middleware/login.js')
// const adminMiddleware = require('./middleware/loginMiddleware.js')

module.exports = (router) => {
    router.get('/docs', docController.index)
    
    router.get('/api/v1/environment', envController.get)
    router.get('/api/v1/environment/:env', envController.get)

    router.get('/api/v1/users/me', loginMiddleware, userController.me)
    router.post('/api/v1/users/login', userController.login)
};
